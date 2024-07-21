resource "google_dns_managed_zone" "default" {
  name        = "ai-buy-llama3-com"
  dns_name    = "ai-buy-llama3.com."  
  description = "Managed zone for AiBuy application"
  dnssec_config {
    state = "off"
  }
}
resource "google_dns_record_set" "frontend" {
  name = "frontend.${google_dns_managed_zone.default.dns_name}"
  type = "A"
  ttl  = 300

  managed_zone = google_dns_managed_zone.default.name
  rrdatas      = [kubernetes_service.frontend.status[0].load_balancer[0].ingress[0].ip]
}

resource "google_dns_record_set" "backend" {
  name = "backend.${google_dns_managed_zone.default.dns_name}"
  type = "A"
  ttl  = 300

  managed_zone = google_dns_managed_zone.default.name
  rrdatas      = [kubernetes_service.backend.status[0].load_balancer[0].ingress[0].ip]
}

output "frontend_url" {
  value       = "http://${google_dns_record_set.frontend.name}"
  description = "URL to access the frontend service"
}

output "backend_url" {
  value       = "http://${google_dns_record_set.backend.name}"
  description = "URL to access the backend service"
}
