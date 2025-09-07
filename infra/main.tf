module "terraform-remote-state" {
  source  = "Isrealade/s3-bucket/aws"
  version = "1.1.2"

  s3 = {
    bucket              = var.s3_remote.bucket
    force_destroy       = var.s3_remote.force_destroy
    object_lock_enabled = var.s3_remote.object_lock_enabled
    acl                 = var.s3_remote.acl
  }

  versioning = var.s3_remote.versioning
  website    = var.s3_remote.website

  tags = var.s3_remote.tags
}

module "taskflow_bucket" {
  source  = "Isrealade/s3-bucket/aws"
  version = "1.1.2"

  s3 = {
    bucket              = var.taskflow_bucket.bucket
    force_destroy       = var.taskflow_bucket.force_destroy
    object_lock_enabled = var.taskflow_bucket.object_lock_enabled
    acl                 = var.taskflow_bucket.acl
  }

  versioning = var.taskflow_bucket.versioning
  website    = var.taskflow_bucket.website

  tags = var.taskflow_bucket.tags
}

resource "aws_acm_certificate" "taskflow-certificate" {
  domain_name       = var.acm.domain_name
  validation_method = var.acm.validation_method

  tags = var.acm.tags
}

resource "aws_acm_certificate_validation" "taskflow-validation" {
  certificate_arn = aws_acm_certificate.taskflow-certificate.arn
}

module "cloudfront" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "5.0.0"

  aliases = var.cloudfront.aliases

  comment     = var.cloudfront.comment
  enabled     = var.cloudfront.enabled
  price_class = var.cloudfront.price_class

  create_origin_access_identity = var.cloudfront.create_origin_access_identity
  origin_access_identities      = var.cloudfront.origin_access_identities

  origin = {
    s3_one = {
      domain_name = module.taskflow_bucket.bucket_regional_domain_name
      s3_origin_config = {
        origin_access_identity = "s3_one"
      }
    }
  }

  default_root_object = var.cloudfront.default_root_object

  default_cache_behavior = var.cloudfront.default_cache_behavior

  ordered_cache_behavior = var.cloudfront.ordered_cache_behavior

  viewer_certificate = {
    acm_certificate_arn = aws_acm_certificate.taskflow-certificate.arn
    ssl_support_method  = "sni-only"
  }

  tags = var.cloudfront.tags
}


resource "aws_s3_bucket_policy" "cloudfront_policy" {
  bucket     = module.taskflow_bucket.bucket_id
  depends_on = [module.cloudfront]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = module.cloudfront.cloudfront_origin_access_identity_iam_arns[0]
        }
        Action   = "s3:GetObject"
        Resource = "${module.taskflow_bucket.bucket_arn}/*"
      }
    ]
  })
}
