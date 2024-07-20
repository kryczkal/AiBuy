@echo off
SETLOCAL

REM Check if spotify-tests-builder builder exists
docker buildx ls | findstr /c:"spotify-tests-builder"
IF %ERRORLEVEL% neq 0 (
  docker buildx create --name spotify-tests-builder --use
)

REM Ensure the builder is ready
docker buildx inspect spotify-tests-builder --bootstrap

REM Build the Docker image with Buildx
echo Building Docker image...
docker buildx build -t spotify-tests:latest . --load

REM Run the Docker container to execute tests and display output
echo Running tests...
docker run spotify-tests

ENDLOCAL

