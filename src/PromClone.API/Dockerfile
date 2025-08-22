FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PromClone.API/PromClone.API.csproj", "PromClone.API/"]
COPY ["PromClone.Core/PromClone.Core.csproj", "PromClone.Core/"]
COPY ["PromClone.Infrastructure/PromClone.Infrastructure.csproj", "PromClone.Infrastructure/"]
RUN dotnet restore "PromClone.API/PromClone.API.csproj"
COPY . .
WORKDIR "/src/PromClone.API"
RUN dotnet build "PromClone.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PromClone.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PromClone.API.dll"] 