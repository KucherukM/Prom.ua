using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PromClone.API.Services;
using PromClone.API.DTOs;
using PromClone.Infrastructure.Data;

namespace PromClone.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IGoogleAuthService _googleAuthService;
    private readonly ApplicationDbContext _context;

    public AuthController(IAuthService authService, IGoogleAuthService googleAuthService, ApplicationDbContext context)
    {
        _authService = authService;
        _googleAuthService = googleAuthService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var response = await _authService.LoginAsync(request);
        
        if (response == null)
        {
            return Unauthorized(new { message = "Невірний email або пароль" });
        }

        return Ok(response);
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var response = await _authService.RegisterAsync(request);
        
        if (response == null)
        {
            return BadRequest(new { message = "Користувач з таким email або username вже існує" });
        }

        return CreatedAtAction(nameof(Login), response);
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
        {
            return NotFound();
        }

        var userDto = new UserDto
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

        return Ok(userDto);
    }

    [HttpPost("google")]
    public async Task<ActionResult<AuthResponse>> GoogleAuth([FromBody] GoogleAuthRequest request)
    {
        if (string.IsNullOrEmpty(request.IdToken))
        {
            return BadRequest(new { message = "ID токен обов'язковий" });
        }

        var response = await _googleAuthService.AuthenticateWithGoogleAsync(request.IdToken);
        
        if (response == null)
        {
            return Unauthorized(new { message = "Невірний Google токен" });
        }

        return Ok(response);
    }

    [HttpPut("profile")]
    public async Task<ActionResult<UserDto>> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        // Update user data
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.PhoneNumber = request.PhoneNumber;
        user.PictureUrl = request.PictureUrl;

        await _context.SaveChangesAsync();

        var userDto = new UserDto
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

        return Ok(userDto);
    }
}
