variable "s3_remote" {
  type = object({
    bucket              = string
    force_destroy       = bool
    object_lock_enabled = bool
    acl                 = string

    versioning = object({
      enabled = bool
    })

    website = object({
      enabled = bool
    })

    tags = map(string)
  })

  description = "Configuration for s3 remote state"
}

variable "taskflow_bucket" {
  type = object({
    bucket              = string
    force_destroy       = bool
    object_lock_enabled = bool
    acl                 = string

    versioning = object({
      enabled = bool
    })

    website = object({
      enabled        = bool
      index_document = string
      error_document = string
    })

    tags = map(string)
  })

  description = "Configuration for s3 website bucket"
}

variable "acm" {
  type = object({
    domain_name       = string
    validation_method = string

    tags = map(string)
  })

  description = "Configuration for acm certificate"
}

variable "cloudfront" {
  type = object({
    aliases                       = list(string)
    comment                       = string
    enabled                       = bool
    price_class                   = string
    create_origin_access_identity = bool
    origin_access_identities      = map(string)


    default_root_object = string

    default_cache_behavior = object({
      target_origin_id       = string
      viewer_protocol_policy = string
      allowed_methods        = list(string)
      cached_methods         = list(string)
      compress               = bool
      query_string           = bool
    })

    ordered_cache_behavior = list(object({
      path_pattern           = string
      target_origin_id       = string
      viewer_protocol_policy = string

      allowed_methods = list(string)
      cache_methods   = list(string)
      compress        = bool
      query_string    = bool
    }))


    tags = map(string)
  })


  description = "Configuration for cloudfront module"
}