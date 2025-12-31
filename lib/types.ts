export type WebsiteType = 'company' | 'ngo'
export type VisibilityStatus = 'published' | 'draft' | 'archived'

export interface Website {
  id: string
  type: WebsiteType
  name: string
  logo_url?: string
  primary_color?: string
  secondary_color?: string
  contact_email?: string
  contact_phone?: string
  address?: string
  social_links?: Record<string, string>
}

export interface Page {
  id: string
  slug: string
  title: string
  status: VisibilityStatus
  is_homepage: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Section {
  id: string
  page_id: string
  title?: string
  type: string
  order_index: number
  is_visible: boolean
  background_color?: string
  background_image_url?: string
  padding_top: number
  padding_bottom: number
  settings?: Record<string, any>
}

export interface ContentBlock {
  id: string
  section_id: string
  type: string
  order_index: number
  content: Record<string, any>
  is_visible: boolean
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  content: string
  featured_image_id?: string
  status: VisibilityStatus
  published_at?: string
  author_id?: string
  tags?: string[]
  category?: string
  view_count: number
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  role?: string
  bio?: string
  email?: string
  phone?: string
  photo_id?: string
  social_links?: Record<string, string>
  order_index: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  content: string
  photo_id?: string
  rating?: number
  is_featured: boolean
  is_visible: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  slug: string
  title: string
  description?: string
  content?: string
  featured_image_id?: string
  category?: string
  status: VisibilityStatus
  is_featured: boolean
  order_index: number
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  slug: string
  title: string
  description?: string
  content?: string
  featured_image_id?: string
  client_name?: string
  category?: string
  status: VisibilityStatus
  is_featured: boolean
  order_index: number
  metadata?: Record<string, any>
  results_metrics?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Partner {
  id: string
  name: string
  description?: string
  logo_id?: string
  website_url?: string
  category?: string
  is_visible: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Media {
  id: string
  file_name: string
  file_path: string
  file_url: string
  file_size: number
  mime_type?: string
  type: 'image' | 'video' | 'document' | 'other'
  width?: number
  height?: number
  alt_text?: string
  caption?: string
}

