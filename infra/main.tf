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
    acl                 = "private"
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
  domain_name       = "redeploy.online"
  validation_method = "EMAIL"

  tags = {
    app         = "TaskFlow"
    Environment = "prod"
    Project     = "taskflow-project"
  }
}

resource "aws_acm_certificate_validation" "taskflow-validation" {
  certificate_arn = aws_acm_certificate.taskflow-certificate.arn
}

module "cloudfront" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "5.0.0"

  aliases = ["redeploy.online"]

  comment     = "Cloudfront for my s3 bucket"
  enabled     = true
  price_class = "PriceClass_All"

  create_origin_access_identity = true
  origin_access_identities = {
    s3_one = "OAI for my S3 bucke"
  }

  origin = {
    s3_one = {
      domain_name = module.taskflow_bucket.bucket_regional_domain_name
      s3_origin_config = {
        origin_access_identity = "s3_one"
      }
    }
  }

  default_root_object = "index.html"

  default_cache_behavior = {
    target_origin_id       = "s3_one"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    query_string           = true
  }

  ordered_cache_behavior = [
    {
      path_pattern           = "/static/*"
      target_origin_id       = "s3_one"
      viewer_protocol_policy = "redirect-to-https"

      allowed_methods = ["GET", "HEAD", "OPTIONS"]
      cached_methods  = ["GET", "HEAD"]
      compress        = true
      query_string    = true
    }
  ]

  viewer_certificate = {
    acm_certificate_arn = aws_acm_certificate.taskflow-certificate.arn
    ssl_support_method  = "sni-only"
  }

  tags = {
    name        = "taskflow-certificate"
    app         = "TaskFlow"
    Environment = "prod"
    Project     = "taskflow-project"
  }
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
