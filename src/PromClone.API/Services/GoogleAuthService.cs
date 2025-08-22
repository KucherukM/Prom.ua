using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using PromClone.Core.Entities;
using PromClone.Infrastructure.Data;
using PromClone.API.DTOs;

namespace PromClone.API.Services;

public interface IGoogleAuthService
{
    Task<AuthResponse?> AuthenticateWithGoogleAsync(string idToken);
}

public class GoogleAuthService : IGoogleAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtService _jwtService;
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public GoogleAuthService(ApplicationDbContext context, IJwtService jwtService, IConfiguration configuration, HttpClient httpClient)
    {
        _context = context;
        _jwtService = jwtService;
        _configuration = configuration;
        _httpClient = httpClient;
    }

    public async Task<AuthResponse?> AuthenticateWithGoogleAsync(string idToken)
    {
        try
        {
            // Verify the ID token with Google
            var googleUserInfo = await VerifyGoogleTokenAsync(idToken);
            if (googleUserInfo == null)
            {
                return null;
            }

            // Check if user exists
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.GoogleId == googleUserInfo.Sub || u.Email == googleUserInfo.Email);

            if (user == null)
            {
                // Create new user
                user = new User
                {
                    GoogleId = googleUserInfo.Sub,
                    Email = googleUserInfo.Email,
                    FirstName = googleUserInfo.GivenName,
                    LastName = googleUserInfo.FamilyName,
                    Username = GenerateUsernameFromGoogle(googleUserInfo),
                    PictureUrl = googleUserInfo.Picture,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true,
                    // Generate a random password for Google users
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString())
                };

                _context.Users.Add(user);
            }
            else
            {
                // Update existing user's Google info
                user.GoogleId = googleUserInfo.Sub;
                user.FirstName = googleUserInfo.GivenName;
                user.LastName = googleUserInfo.FamilyName;
                user.PictureUrl = googleUserInfo.Picture;
                
                // Update username if it was auto-generated
                if (user.Username.StartsWith("user") || user.Username.Contains("random"))
                {
                    user.Username = GenerateUsernameFromGoogle(googleUserInfo);
                }
            }

            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user);
            var userDto = MapToUserDto(user);

            return new AuthResponse
            {
                Token = token,
                User = userDto,
                ExpiresAt = DateTime.UtcNow.AddDays(7)
            };
        }
        catch
        {
            return null;
        }
    }

    private async Task<GoogleUserInfo?> VerifyGoogleTokenAsync(string idToken)
    {
        try
        {
            var response = await _httpClient.GetAsync($"https://oauth2.googleapis.com/tokeninfo?id_token={idToken}");
            
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var userInfo = JsonSerializer.Deserialize<GoogleUserInfo>(content);
                return userInfo;
            }
        }
        catch
        {
            // Log error if needed
        }

        return null;
    }

    private string GenerateUsernameFromGoogle(GoogleUserInfo googleUserInfo)
    {
        // Try to create username from first name
        if (!string.IsNullOrEmpty(googleUserInfo.GivenName))
        {
            var baseUsername = googleUserInfo.GivenName.ToLowerInvariant()
                .Replace(" ", "")
                .Replace("-", "")
                .Replace("_", "");
            
            // Check if username already exists
            var existingUser = _context.Users.FirstOrDefault(u => u.Username == baseUsername);
            if (existingUser == null)
            {
                return baseUsername;
            }
            
            // Add random suffix if username exists
            var randomSuffix = new Random().Next(100, 999);
            return $"{baseUsername}{randomSuffix}";
        }
        
        // Fallback to email prefix
        var emailPrefix = googleUserInfo.Email.Split('@')[0];
        var existingUserByEmail = _context.Users.FirstOrDefault(u => u.Username == emailPrefix);
        if (existingUserByEmail == null)
        {
            return emailPrefix;
        }
        
        var randomSuffixForEmail = new Random().Next(100, 999);
        return $"{emailPrefix}{randomSuffixForEmail}";
    }

    private static UserDto MapToUserDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName ?? "",
            LastName = user.LastName ?? "",
            Email = user.Email,
            Username = user.Username,
            PhoneNumber = user.PhoneNumber,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt,
            PictureUrl = user.PictureUrl
        };
    }
}

public class GoogleUserInfo
{
    [JsonPropertyName("sub")]
    public string Sub { get; set; } = string.Empty;
    
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;
    
    [JsonPropertyName("given_name")]
    public string GivenName { get; set; } = string.Empty;
    
    [JsonPropertyName("family_name")]
    public string FamilyName { get; set; } = string.Empty;
    
    [JsonPropertyName("picture")]
    public string Picture { get; set; } = string.Empty;
}
