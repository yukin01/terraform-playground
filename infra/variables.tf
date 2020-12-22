variable "gcp_region" {
  type = string
}

variable "gcp_project" {
  type = string
}

variable "gcr_hostname" {
  type = string
  validation {
    condition     = contains(["gcr.io", "us.gcr.io", "eu.gcr.io", "asia.gcr.io"], var.gcr_hostname)
    error_message = "The hostname should be `gcr.io`, `us.gcr.io`, `eu.gcr.io`, or `asia.gcr.io`."
  }
}
