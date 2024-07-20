#!/bin/bash
source $(dirname $0)/utils.sh


if [[ "$(basename -- "$0")" == "$(basename -- "$BASH_SOURCE")" ]]; then
    create_separator
    echo "This is a helper library for working with docker"
    echo -e "${GREEN}Available commands:${RESET}"
    echo "docker-build-image <dockerfile-path> <image-name> - Builds a Docker image using the provided Dockerfile path and image name."
    echo "docker-stop-all-containers - Stops all running containers."
    echo "docker-cleanup - Cleans up Docker resources by stopping all running containers and removing all unused resources."
    echo "list-common-docker-functions - Lists common Docker commands grouped by type."
    create_separator
    exit 0
fi

#------------------------------------------------------------------------------#
#                               Reminder Helpers                               #
#------------------------------------------------------------------------------#
list-common-docker-functions() {
    local first_argument=$1
    if [ $# -ne 0 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0"
        echo "This command lists common Docker commands grouped by type."
        return 1
    fi

    {
        create_separator
        echo -e "${GREEN}Common Docker Commands:${RESET}" | less -R
        echo -e "${GREEN}DESCRIPTION${RESET}\n\tThis list contains common Docker commands grouped by type."
        echo -e "\n${YELLOW}COMMAND TYPES:${RESET}"

        echo -e "\n${UNDERLINE}Listing Commands:${RESET}"
        echo -e "${BOLD}docker image ls${RESET}\t\t- List all images"
        echo -e "${BOLD}docker container ls${RESET}\t\t- List all containers"
        echo -e "${BOLD}docker volume ls${RESET}\t\t- List all volumes"
        echo -e "${BOLD}docker network ls${RESET}\t\t- List all networks"
        echo -e "${BOLD}docker buildx ls${RESET}\t\t- List all buildx instances"

        echo -e "\n${UNDERLINE}Removing Commands:${RESET}"
        echo -e "${BOLD}docker image rm <image-id>${RESET}\t- Remove an image"
        echo -e "${BOLD}docker container rm <container-id>${RESET}\t- Remove a container"
        echo -e "${BOLD}docker volume rm <volume-id>${RESET}\t- Remove a volume"
        echo -e "${BOLD}docker network rm <network-id>${RESET}\t- Remove a network"
        echo -e "${BOLD}docker buildx rm <builder-name>${RESET}\t- Remove a buildx instance"

        echo -e "\n${UNDERLINE}Pruning Commands:${RESET}"
        echo -e "${BOLD}docker image prune${RESET}\t\t- Remove all unused images"
        echo -e "${BOLD}docker container prune${RESET}\t\t- Remove all unused containers"
        echo -e "${BOLD}docker volume prune${RESET}\t\t- Remove all unused volumes"
        echo -e "${BOLD}docker network prune${RESET}\t\t- Remove all unused networks"

        echo -e "\n${UNDERLINE}Stopping Commands:${RESET}"
        echo -e "${BOLD}docker stop <container-id>${RESET}\t- Stop a running container"
        echo -e "${BOLD}docker stop $(docker ps -q)${RESET}\t- Stop all running containers"

        echo -e "\n${UNDERLINE}Starting Commands:${RESET}"
        echo -e "${BOLD}docker start <container-id>${RESET}\t- Start a stopped container"

        echo -e "\n${UNDERLINE}Inspecting Commands:${RESET}"
        echo -e "${BOLD}docker inspect <container-id>${RESET}\t- Inspect a container"
        echo -e "${BOLD}docker inspect <image-id>${RESET}\t- Inspect an image"
        echo -e "${BOLD}docker inspect <volume-id>${RESET}\t- Inspect a volume"
        echo -e "${BOLD}docker inspect <network-id>${RESET}\t- Inspect a network"
        echo -e "${BOLD}docker inspect <builder-name>${RESET}\t- Inspect a buildx instance"

        echo -e "\n${UNDERLINE}Running Commands:${RESET}"
        echo -e "${BOLD}docker run <image-name>${RESET}\t\t- Run a Docker image"
        echo -e "${BOLD}docker run -d <image-name>${RESET}\t\t- Run a Docker image in detached mode"
        echo -e "${BOLD}docker run -p <host-port>:<container-port> <image-name>${RESET}\t- Run a Docker image and map ports"

        echo -e "\n${UNDERLINE}Building Commands:${RESET}"
        echo -e "${BOLD}docker build -t <image-name> <dockerfile-path>${RESET}\t- Build a Docker image"
        echo -e "${BOLD}docker buildx create --name <builder-name>${RESET}\t- Create a buildx instance"
        echo -e "${BOLD}docker buildx inspect <builder-name> --bootstrap${RESET}\t- Ensure the builder is ready"
        echo -e "${BOLD}docker buildx build -t <image-name> <dockerfile-path> --load${RESET}\t- Build a Docker image with Buildx"

        echo -e "\n${UNDERLINE}Miscellaneous Commands:${RESET}"
        echo -e "${BOLD}docker system prune${RESET}\t\t- Remove all unused resources"
        echo -e "${BOLD}docker system prune -a${RESET}\t\t- Remove all unused resources including images"
        echo -e "${BOLD}docker system df${RESET}\t\t- Display Docker disk usage"
        echo -e "${BOLD}docker system info${RESET}\t\t- Display Docker system-wide information"
        echo -e "${BOLD}docker version${RESET}\t\t- Show the Docker version information"
        create_separator
    } | less -R
}

#------------------------------------------------------------------------------#
#                                Build Helpers                                 #
#------------------------------------------------------------------------------#
docker-build-image() {
    local first_argument=$1
    if [ $# -ne 2 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0 <dockerfile-path> <image-name>"
        echo "This command builds a Docker image using the provided Dockerfile path, and names it with the provided image name."
        return 1
    fi

    # Validate the Dockerfile path exists and is a Dockerfile
    if [ ! -f $1 ]; then
        echo "The Dockerfile path provided does not exist."
        return 1
    fi

    if [ $(basename $1) != "Dockerfile" ]; then
        echo "The Dockerfile path provided is not a Dockerfile."
        return 1
    fi

    # Validate the Image name is alphanumeric
    if [[ ! $2 =~ ^[a-zA-Z0-9-]+$ ]]; then
        echo "The Image name provided is not allowed. Allowed characters are a-z, A-Z, 0-9, -."
        return 1
    fi

    DOCKERFILE_PATH=$1
    DOCKERFILE_DIR=$(dirname $DOCKERFILE_PATH)
    BASE_NAME=$2
    BUILDER_NAME=$BASE_NAME-builder

    create_separator
    echo -e "Building and testing Docker image $GREEN $BASE_NAME $RESET..."
    echo -e "Dockerfile path: $GREEN $DOCKERFILE_PATH $RESET"
    echo -e "Dockerfile directory: $GREEN $DOCKERFILE_DIR $RESET"
    echo -e "Base name: $GREEN $BASE_NAME $RESET"
    echo -e "Builder name: $GREEN $BUILDER_NAME $RESET"
    create_separator

    # Create a builder instance if it doesn't already exist
    if ! sudo docker buildx ls | grep -q $BUILDER_NAME; then
    sudo docker buildx create --name $BUILDER_NAME --use
    create_separator
    fi

    # Ensure the builder is ready
    sudo docker buildx inspect $BUILDER_NAME --bootstrap

    create_separator
    # Build the Docker image with Buildx
    echo "Building Docker image..."
    sudo docker buildx build -t $BASE_NAME:latest $DOCKERFILE_DIR --load
    create_separator
    echo -e "The Docker image $BASE_NAME has been ${GREEN}built successfully. $RESET"
    echo -e "${YELLOW}To run the Docker image, execute the following command: $RESET"
    echo -e ""
    echo -e "docker run $BASE_NAME:latest"
    echo -e "-d to run detach and run in background"
    echo -e "-p <host_port>:<container_port> to map ports"
    echo -e "additonal flags as needed"
    echo -e ""
    echo -e "${YELLOW}You can also push the image to a registry using the following command: $RESET"
    echo -e ""
    echo -e "docker push $BASE_NAME <registry>"
    echo -e ""
    echo -e "The registry can be Docker Hub, AWS ECR, Google Container Registry, etc."
    create_separator
}

#------------------------------------------------------------------------------#
#                               Cleanup Helpers                                #
#------------------------------------------------------------------------------#
docker-stop-all-containers() {
    local first_argument=$1
    if [ $# -ne 0 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0"
        echo "This command stops all running Docker containers."
        return 1
    fi

    echo "Stopping all running containers..."
    # Check if there are any running containers
    local running_containers=$(sudo docker ps -q)
    if [ -z "$running_containers" ]; then
        echo "No running containers to stop."
        return 0
    fi

    echo "Stopping all running containers..."
    sudo docker stop $(docker ps -q)
}

docker-cleanup() {
    local first_argument=$1
    if [ $# -ne 0 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0"
        echo "
        Cleans up Docker resources by stopping all running containers and removing all unused resources.

        After building a docker image, the image will be stored on the host machine
        and will be used to run containers.

        After running a container, unless the container is explicitly removed, it will remain on the host machine. It can be stopped and started as needed. This means that sending a stop signal to the container will not remove it from the host machine, hence the need to conduct a cleanup operation to remove the container.

        The same applies to images, unless the image is explicitly removed, it will remain on the host machine.

        Here are the commands to remove all containers and images from the host machine:

        To cleanup all unused containers:
        sudo docker container prune

        To cleanup all unused images:
        sudo docker image prune

        There are other resources that can be cleaned up as well, such as volumes and networks.

        This script provides a simple way to cleanup all unused resources at once.
        "
        return 1
    fi

    echo "Cleaning up Docker resources..."
    sudo docker system prune -a -f
    echo "For a more thorough cleanup, check if there are any unwanted running containers and volumes."
}
