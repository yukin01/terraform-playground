data "google_project" "this" {}

locals {
  repository_name = "${var.gcr_hostname}/${data.google_project.this.project_id}/backend"
  image_tag       = "latest"
}

resource "google_cloud_run_service" "backend" {
  name     = "backend-service"
  location = var.gcp_region

  template {
    spec {
      containers {
        image = null_resource.build.triggers.image_tag
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1000m"
          }
        }
      }
    }
  }

  autogenerate_revision_name = true
}

data "google_iam_policy" "no_auth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "no_auth" {
  location = google_cloud_run_service.backend.location
  project  = google_cloud_run_service.backend.project
  service  = google_cloud_run_service.backend.name

  policy_data = data.google_iam_policy.no_auth.policy_data
}

resource "null_resource" "build" {
  triggers = {
    image_tag = "${local.repository_name}:${local.image_tag}"
  }

  provisioner "local-exec" {
    command     = "docker build --tag ${local.repository_name}:${local.image_tag} --target runner ."
    working_dir = "../backend"
  }

  provisioner "local-exec" {
    command     = "docker push ${local.repository_name}:${local.image_tag}"
    working_dir = "../backend"
  }
}
