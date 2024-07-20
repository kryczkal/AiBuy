# Google Cloud provider configuration
provider "google" {
  credentials = file(local.credentials_file_path)
  project     = local.project_id
  region      = local.location
}
