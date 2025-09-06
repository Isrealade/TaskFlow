module "terraform-remote-state" {
  source  = "Isrealade/s3-bucket/aws"
  version = "1.1.2"

  s3 = {
    bucket              = "taskflow-remote-state"
    force_destroy       = true
    object_lock_enabled = false
    acl                 = "private"
  }

  versioning = {
    enabled = true
  }

  website = {
    enabled = false
  }

  tags = {
    app         = "Terraform-remote-state"
    Environment = "prod"
    Project     = "taskflow-project"
  }
}

module "taskflow_bucket" {
  source  = "Isrealade/s3-bucket/aws"
  version = "1.1.2"

  s3 = {
    bucket              = "taskflow-bucket-app"
    force_destroy       = true
    object_lock_enabled = false
    acl                 = "public-read"
  }

  versioning = {
    enabled = true
  }

  website = {
    enabled        = true
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    app         = "TaskFlow"
    Environment = "prod"
    Project     = "taskflow-project"
  }
}

resource "aws_acm_certificate" "taskflow-certificate" {
  domain_name       = "tflow.redeploy.online"
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "taskflow-validation" {
  certificate_arn = aws_acm_certificate.taskflow-certificate.arn
}