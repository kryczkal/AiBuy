#!/bin/bash

source $(dirname $0)/utils.sh

# check if it's being sourced
if [[ "$(basename -- "$0")" == "$(basename -- "$BASH_SOURCE")" ]]; then
    create_separator
    echo "This is a helper library for working with gcloud"
    echo "Use by sourcing this file in your shell script"
    echo -e "${GREEN}Available commands:${RESET}"
    echo "auth-kubernetes <cluster-name> <zone> <project-id>"
    echo "auth-docker <project-id>"
    echo "list-valid-regions <project-id>"
    echo "list-valid-zones <project-id>"
    echo "list-valid-artifact-repositories <project-id>"
    echo "list-projects"
    echo "list-common-gcloud-functions"
    create_separator
    exit 1
fi

#------------------------------------------------------------------------------#
#                               Reminder Helpers                               #
#------------------------------------------------------------------------------#
list-common-gcloud-functions() {
    local first_argument=$1
    if [ $# -ne 0 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0"
        echo "List common gcloud commands grouped by functionality"
        return 1
    fi
    {
        create_separator
        echo -e "${GREEN}Common gcloud Commands:${RESET}" | less -R
        echo -e "${GREEN}DESCRIPTION${RESET}\n\tThis list contains common gcloud commands grouped by functionality."
        echo -e "\n${YELLOW}COMMAND CATEGORIES:${RESET}"

        echo -e "\n${UNDERLINE}Configuration Commands:${RESET}"
        echo -e "${BOLD}gcloud config list${RESET}\t\t\t- List all properties in the current configuration"
        echo -e "${BOLD}gcloud config set project <project-id>${RESET}\t\t- Set the active project"
        echo -e "${BOLD}gcloud config set compute/zone <zone>${RESET}\t\t- Set the default compute zone"

        echo -e "\n${UNDERLINE}Compute Engine Commands:${RESET}"
        echo -e "${BOLD}gcloud compute instances create <name>${RESET}\t\t- Create a new compute instance"
        echo -e "${BOLD}gcloud compute instances list${RESET}\t\t\t- List all compute instances"
        echo -e "${BOLD}gcloud compute instances delete <name>${RESET}\t\t- Delete a compute instance"

        echo -e "\n${UNDERLINE}Kubernetes Engine Commands:${RESET}"
        echo -e "${BOLD}gcloud container clusters create <cluster-name>${RESET}\t- Create a Kubernetes cluster"
        echo -e "${BOLD}gcloud container clusters list${RESET}\t\t\t- List all Kubernetes clusters"
        echo -e "${BOLD}gcloud container clusters delete <cluster-name>${RESET}\t- Delete a Kubernetes cluster"

        echo -e "\n${UNDERLINE}App Engine Commands:${RESET}"
        echo -e "${BOLD}gcloud app deploy${RESET}\t\t\t- Deploy an application to App Engine"
        echo -e "${BOLD}gcloud app describe${RESET}\t\t\t- Display information about the current application"
        echo -e "${BOLD}gcloud app browse${RESET}\t\t\t- Open the current application in a web browser"

        echo -e "\n${UNDERLINE}Storage Commands:${RESET}"
        echo -e "${BOLD}gcloud storage buckets create <bucket-name>${RESET}\t- Create a new storage bucket"
        echo -e "${BOLD}gcloud storage buckets list${RESET}\t\t\t- List all storage buckets"
        echo -e "${BOLD}gcloud storage objects copy <src> <dst>${RESET}\t\t- Copy storage objects"

        echo -e "\n${UNDERLINE}BigQuery Commands:${RESET}"
        echo -e "${BOLD}gcloud bigquery jobs query \"<query>\"${RESET}\t\t- Run a BigQuery SQL query"
        echo -e "${BOLD}gcloud bigquery datasets list${RESET}\t\t\t- List all BigQuery datasets"
        echo -e "${BOLD}gcloud bigquery datasets delete <dataset-id>${RESET}\t- Delete a BigQuery dataset"

        echo -e "\n${UNDERLINE}IAM Commands:${RESET}"
        echo -e "${BOLD}gcloud iam service-accounts create <account-id>${RESET}\t- Create a service account"
        echo -e "${BOLD}gcloud iam service-accounts list${RESET}\t\t\t- List all service accounts"
        echo -e "${BOLD}gcloud iam roles list${RESET}\t\t\t- List all IAM roles"

        echo -e "\n${UNDERLINE}Miscellaneous Commands:${RESET}"
        echo -e "${BOLD}gcloud help <command>${RESET}\t\t\t- Get help for a specific command"
        echo -e "${BOLD}gcloud version${RESET}\t\t\t- Show the gcloud CLI version information"
        echo -e "${BOLD}gcloud components list${RESET}\t\t\t- List installed gcloud components"
        echo -e "${BOLD}gcloud components update${RESET}\t\t\t- Update all installed components to the latest version"
        create_separator
    } | less -R
}

#------------------------------------------------------------------------------#
#                           Authentication Functions                           #
#------------------------------------------------------------------------------#
auth-kubernetes() {
    local first_argument=$1
    if [ $# -ne 3 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0 <cluster-name> <zone> <project-id>"
        echo "Authenticate to a Kubernetes cluster via gcloud"
        return 1
    fi

    sudo gcloud container clusters get-credentials $1 --zone $2 --project $3
}

auth-docker() {
    local first_argument=$1
    if [ $# -ne 1 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0 <project-id>"
        echo "Authenticate docker to gcloud, especially for artifact registry"
        return 1
    fi


    gcloud config set project $1
    sudo gcloud auth configure-docker

    create_separator
    echo -e "Docker has been authenticated to the artifact registry for project $1"
    echo -e "It's good to test if you docker can login to the registry by running:"
    echo -e "${GREEN}docker login -u oauth2accesstoken -p \"\$(gcloud auth print-access-token) <region>\"${RESET}"
    echo -e ""
    echo -e "Where <region> is the region of the artifact registry, e.g. asia-southeast1"
    create_separator
}

#------------------------------------------------------------------------------#
#                             List Type Functions                              #
#------------------------------------------------------------------------------#
list-valid-regions() {
    local first_argument=$1
    if [ $# -ne 1 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0 <project-id>"
        echo "List all valid regions for a project"
        return 1
    fi

    PROJECT_ID=$1

    create_separator
    echo -e "Getting ${GREEN}regions${RESET} for project: $PROJECT_ID"
    gcloud compute regions list --project $PROJECT_ID
    create_separator
}

list-valid-zones() {
    local first_argument=$1
    if [ $# -ne 1 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0 <project-id>"
        echo "List all valid zones for a project"
        return 1
    fi

    PROJECT_ID=$1

    create_separator
    echo -e "Getting ${GREEN}zones${RESET} for project: $PROJECT_ID"
    gcloud compute zones list --project $PROJECT_ID
    create_separator
}

list-projects() {
    local first_argument=$1
    if [ $# -ne 0 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0"
        echo "List all projects"
        return 1
    fi
    create_separator
    gcloud projects list
    create_separator
}

list-valid-artifact-repositories() {
    local first_argument=$1
    if [ $# -ne 1 ] || [ "$first_argument" = "-h" ] || [ "$first_argument" = "--help" ]; then
        echo "Usage: $0 <project-id>"
        echo "List all valid artifact repositories for a project"
        return 1
    fi

    PROJECT_ID=$1

    # Get the name and location of repositories that are of format docker
    echo "Getting repositories for project $PROJECT_ID"

    REPOS_JSON=$(gcloud artifacts repositories list --project=$PROJECT_ID --format="json" --filter="format=docker")
    REPOS_LONG_NAMES=$(echo $REPOS_JSON | jq -r '.[].name')

    create_separator
    for REPO_NAME_LONG in $REPOS_LONG_NAMES
    do
        # Get the name of the repository from its name (last field)
        REPO_NAME=$(echo $REPO_NAME_LONG | cut -d/ -f6)
        # Get the location of the repository from its name (4th field)
        LOCATION=$(echo $REPO_NAME_LONG | cut -d/ -f4)

        echo -e "Repository: $REPO_NAME"
        echo -e "Long name: $REPO_NAME_LONG"
        echo -e "Location: $LOCATION"
        echo -e "Register to use with docker push: ${GREEN}$LOCATION-docker.pkg.dev/$PROJECT_ID/${REPO_NAME}${RESET}"
        create_separator
    done
}
