resource "google_artifact_registry_repository" "docker-repository" {
  repository_id = "docker-repository"
  location      = local.location
  project       = local.project_id
  format        = "DOCKER"
}