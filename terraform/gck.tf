# Google Kubernetes Kngine cluster to host the application
resource "google_container_cluster" "primary" {
  name = "ai-buy-cluster"

  location = local.location
  addons_config {
    horizontal_pod_autoscaling {
      disabled = false
    }
  }
  vertical_pod_autoscaling {
    enabled = true
  }

  node_pool {
    name               = "default-pool"
    initial_node_count = 1
    autoscaling {
      min_node_count = 0
      max_node_count = 20
    }
    node_config {
      # This configures the cheapest possible settings for the node pool

      # Preemptible VMs are cheaper but can be terminated at any time
      preemptible = true
      # The cheapest machine type that reasonably supports GKE switch this to a more powerful machine type if needed
      machine_type = "e2-small"

      oauth_scopes = [
        "https://www.googleapis.com/auth/cloud-platform"
      ]
    }
    management {
      auto_repair  = true
      auto_upgrade = true
    }
  }
  # This option is used when you need to redeploy the cluster from scratch via
  # terraform delete -target=google_container_cluster.primary

  deletion_protection = false
}

data "google_client_config" "default" {}

output "gke_endpoint" {
  value       = google_container_cluster.primary.endpoint
  description = "The IP address of the Kubernetes cluster"
}