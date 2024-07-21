provider "kubernetes" {
  host                   = "https://${google_container_cluster.primary.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}

resource "kubernetes_deployment" "backend" {
  metadata {
    name = "backend-deployment"
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "backend"
      }
    }
    template {
      metadata {
        labels = {
          app = "backend"
        }
      }
      spec {
        container {
          image = "europe-west1-docker.pkg.dev/aibuy-430011/docker-repository/backend-server:latest"
          name  = "backend"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name = "backend-service"
  }

  spec {
    selector = {
      app = "backend"
    }

    port {
      port        = 80
      target_port = 80
    }

    type = "LoadBalancer"
  }
}

output "backend_endpoint" {
  value       = kubernetes_service.backend.status[0].load_balancer[0].ingress[0].ip
  description = "The IP address of the backend service load balancer"
}
