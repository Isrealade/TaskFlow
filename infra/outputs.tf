output "taskflow_bucket_url" {
  value       = module.taskflow_bucket.website_endpoint
  description = "The static website URL"
}

output "validation_options" {
  value = aws_acm_certificate.taskflow-certificate.domain_validation_options
}