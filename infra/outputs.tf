output "taskflow_bucket_url" {
  value       = module.taskflow_bucket.website_endpoint
  description = "The static website URL"
}

output "cloudfront_domain" {
  value = module.cloudfront.cloudfront_distribution_domain_name
  description = "The cloudfront domain"
}