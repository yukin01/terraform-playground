terraform {
  required_version = "~> 0.14.0"

  required_providers {
    google = {
      version = "3.51.0"
      source  = "hashicorp/google"
    }
  }
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}
