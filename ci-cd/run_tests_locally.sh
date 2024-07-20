#!/bin/bash

# Stop on the first sign of failure
set -e

# Create a builder instance if it doesn't already exist
if ! docker buildx ls | grep -q spotify-tests-builder; then
  docker buildx create --name spotify-tests-builder --use
fi

# Ensure the builder is ready
docker buildx inspect spotify-tests-builder --bootstrap

# Build the Docker image with Buildx
echo "Building Docker image..."
docker buildx build -t spotify-tests:latest . --load

# Run the Docker container to execute tests and display output
echo "Running tests..."
docker run spotify-tests

