locals {
  config = jsondecode(file("${path.module}/variables.json"))

  project_id             = local.config.project_id
  tfstate_bucket_url     = local.config.tfstate_bucket_url
  # The coallesce function sets the first non-null value in the list
  credentials_file_path  = coalesce(local.config.credentials_file_path, "credentials.json")
  location               = coalesce(local.config.location, "europe-west1")
}
