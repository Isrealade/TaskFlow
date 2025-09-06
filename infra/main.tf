module "s3_bucket" {
  source = "Isrealade/s3-bucket/aws"

  s3 = {
    bucket              = "taskflow-bucket-app"
    force_destroy       = true
    object_lock_enabled = false
    acl                 = "public-read"
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