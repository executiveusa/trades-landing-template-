import tenant from '@/content/tenant.json'

export type Tenant = typeof tenant

export function getTenant(): Tenant {
  return tenant
}

export function getTenantTheme() {
  return getTenant().theme
}

export function getTenantServices() {
  return getTenant().services
}

export function getTenantProjects() {
  return getTenant().projects
}

export function getTenantTestimonials() {
  return getTenant().testimonials
}
