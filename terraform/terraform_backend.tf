# Configure terraform to store state in a Google Cloud Storage bucket
terraform {
  backend "gcs" {
    bucket = "644f917e48563fac_bucket_tfstate"
    prefix = "terraform/state"
  }
}

# Google Cloud Storage bucket to store Terraform state
resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_storage_bucket" "default" {
  name          = "${random_id.bucket_prefix.hex}_bucket_tfstate"
  force_destroy = false
  location      = local.location

  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
  # encryption {
  #   default_kms_key_name = google_kms_crypto_key.terraform_state_bucket.id
  # }
  # depends_on = [
  #   google_project_iam_member.default
  # ]
}

output "google_cloud_state_bucket" {
  value = google_storage_bucket.default.name
}
