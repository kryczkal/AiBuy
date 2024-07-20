terraform {
  backend "gcs" {
    bucket = local.tfstate-bucket-url
    prefix = "terraform/state"
  }
}

data "terraform_remote_state" "gcs" {
  backend = "gcs"
  config = {
    bucket = local.tfstate-bucket-url
    prefix = "terraform/state"
  }
}

locals {
  use_gcs_backend = length(data.terraform_remote_state.gcs.outputs) > 0
}

terraform {
  backend "local" {}

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = local.project-id
  region  = local.location
}
