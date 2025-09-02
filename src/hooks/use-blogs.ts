import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import slugify from 'slugify'
import { toast } from 'sonner'

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  author_id: string
  status: 'draft' | 'published'
  published_at?: string
  created_at: string
  updated_at: string
  cover_image_url?: string
  author?: {
    id: string
    name: string
    email: string
    bio?: string
  }
  tags?: Array<{
    id: string
    name: string
    slug: string
  }>
}

export interface CreateBlogData {
  title: string
  content: string
  excerpt?: string
  status?: 'draft' | 'published'
  cover_image_url?: string
  tags?: string[]
}

export interface UpdateBlogData extends Partial<CreateBlogData> {
  id: string
  slug?: string
  published_at?: string
}

// Get all blogs (admin can see drafts, public only sees published)
export function useBlogs(includeContent = false) {
  return useQuery({
    queryKey: ['blogs', includeContent],
    queryFn: async () => {
      const selectFields = [
        'id',
        'title', 
        'slug',
        'excerpt',
        includeContent ? 'content' : null,
        'author_id',
        'status',
        'published_at',
        'created_at',
        'updated_at',
        'cover_image_url'
      ].filter(Boolean).join(', ')

      let query = supabase
        .from('blogs')
        .select(selectFields)
        .order('created_at', { ascending: false })

      const { data, error } = await query

      if (error) throw error

      // Get author and tags data separately for better type safety
      const blogsWithDetails = await Promise.all(
        (data || []).map(async (blog: any) => {
          // Get author
          const { data: author } = await supabase
            .from('authors')
            .select('id, name, email, bio')
            .eq('id', blog.author_id)
            .maybeSingle()

          // Get tags
          const { data: blogTags } = await supabase
            .from('blog_tags')
            .select('tag_id, tags!inner(id, name, slug)')
            .eq('blog_id', blog.id)

          const tags = blogTags?.map((bt: any) => bt.tags).filter(Boolean) || []

          return {
            ...blog,
            author,
            tags
          } as Blog
        })
      )

      return blogsWithDetails as Blog[]
    },
  })
}

// Get published blogs for public view
export function usePublishedBlogs(search?: string, tag?: string) {
  return useQuery({
    queryKey: ['published-blogs', search, tag],
    queryFn: async () => {
      let query = supabase
        .from('blogs')
        .select('id, title, slug, excerpt, author_id, published_at, created_at, cover_image_url')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
      }

      const { data, error } = await query

      if (error) throw error

      // Get related data separately
      const blogsWithDetails = await Promise.all(
        (data || []).map(async (blog: any) => {
          // Get author
          const { data: author } = await supabase
            .from('authors')
            .select('id, name, email, bio')
            .eq('id', blog.author_id)
            .maybeSingle()

          // Get tags
          const { data: blogTags } = await supabase
            .from('blog_tags')
            .select('tag_id, tags!inner(id, name, slug)')
            .eq('blog_id', blog.id)

          const tags = blogTags?.map((bt: any) => bt.tags).filter(Boolean) || []

          return {
            ...blog,
            content: '',
            status: 'published' as const,
            updated_at: blog.created_at,
            author,
            tags
          } as Blog
        })
      )

      let blogs = blogsWithDetails

      // Filter by tag if specified
      if (tag && blogs) {
        blogs = blogs.filter(blog => 
          blog.tags?.some(blogTag => blogTag.slug === tag)
        )
      }

      return blogs
    },
  })
}

// Get single blog by slug
export function useBlog(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, slug, excerpt, content, author_id, status, published_at, created_at, updated_at, cover_image_url')
        .eq('slug', slug)
        .maybeSingle()

      if (error) throw error
      if (!data) return null

      // Get author
      const { data: author } = await supabase
        .from('authors')
        .select('id, name, email, bio')
        .eq('id', data.author_id)
        .maybeSingle()

      // Get tags
      const { data: blogTags } = await supabase
        .from('blog_tags')
        .select('tag_id, tags!inner(id, name, slug)')
        .eq('blog_id', data.id)

      const tags = blogTags?.map((bt: any) => bt.tags).filter(Boolean) || []

      return {
        ...data,
        author,
        tags
      } as Blog
    },
  })
}

// Get single blog by ID
export function useBlogById(id: string) {
  return useQuery({
    queryKey: ['blog-by-id', id],
    queryFn: async () => {
      if (!id || id === 'new') return null
      
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, slug, excerpt, content, author_id, status, published_at, created_at, updated_at, cover_image_url')
        .eq('id', id)
        .maybeSingle()

      if (error) throw error
      if (!data) return null

      // Get author
      const { data: author } = await supabase
        .from('authors')
        .select('id, name, email, bio')
        .eq('id', data.author_id)
        .maybeSingle()

      // Get tags
      const { data: blogTags } = await supabase
        .from('blog_tags')
        .select('tag_id, tags!inner(id, name, slug)')
        .eq('blog_id', data.id)

      const tags = blogTags?.map((bt: any) => bt.tags).filter(Boolean) || []

      return {
        ...data,
        author,
        tags
      } as Blog
    },
    enabled: !!id && id !== 'new'
  })
}

// Get all tags
export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name')

      if (error) throw error
      return data
    },
  })
}

// Create blog mutation
export function useCreateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateBlogData) => {
      // Get author ID
      const { data: author } = await supabase
        .from('authors')
        .select('id')
        .eq('email', 'kavindadewmith@gmail.com')
        .single()

      if (!author) throw new Error('Author not found')

      // Generate slug
      const slug = slugify(data.title, { lower: true, strict: true })

      // Create blog data WITHOUT tags field
      const { tags, ...blogDataWithoutTags } = data
      const blogData = {
        ...blogDataWithoutTags,
        slug,
        author_id: author.id,
        published_at: data.status === 'published' ? new Date().toISOString() : null
      }

      const { data: blog, error } = await supabase
        .from('blogs')
        .insert(blogData)
        .select()
        .single()

      if (error) throw error

      // Handle tags if provided
      if (tags && tags.length > 0) {
        await handleBlogTags(blog.id, tags)
      }

      return blog
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      toast.success('Blog created successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to create blog: ${error.message}`)
    },
  })
}

// Update blog mutation
export function useUpdateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateBlogData) => {
      const { id, tags, ...updateData } = data

      // Create update object with proper typing
      const blogUpdate: any = { ...updateData }

      // Generate new slug if title changed
      if (updateData.title) {
        blogUpdate.slug = slugify(updateData.title, { lower: true, strict: true })
      }

      // Set published_at if changing to published status
      if (updateData.status === 'published') {
        blogUpdate.published_at = new Date().toISOString()
      }

      const { data: blog, error } = await supabase
        .from('blogs')
        .update(blogUpdate)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Handle tags if provided
      if (tags !== undefined) {
        await handleBlogTags(id, tags)
      }

      return blog
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      toast.success('Blog updated successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to update blog: ${error.message}`)
    },
  })
}

// Delete blog mutation
export function useDeleteBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      toast.success('Blog deleted successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to delete blog: ${error.message}`)
    },
  })
}

// Helper function to handle blog tags
async function handleBlogTags(blogId: string, tagNames: string[]) {
  // Remove existing tags
  await supabase
    .from('blog_tags')
    .delete()
    .eq('blog_id', blogId)

  if (tagNames.length === 0) return

  // Create or get tags
  const tagIds: string[] = []
  for (const tagName of tagNames) {
    const tagSlug = slugify(tagName, { lower: true, strict: true })
    
    // Try to get existing tag
    let { data: tag } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', tagSlug)
      .maybeSingle()

    // Create tag if it doesn't exist
    if (!tag) {
      const { data: newTag, error } = await supabase
        .from('tags')
        .insert({ name: tagName, slug: tagSlug })
        .select('id')
        .single()

      if (error) throw error
      tag = newTag
    }

    tagIds.push(tag.id)
  }

  // Create blog_tags relationships
  const blogTags = tagIds.map(tagId => ({
    blog_id: blogId,
    tag_id: tagId
  }))

  const { error } = await supabase
    .from('blog_tags')
    .insert(blogTags)

  if (error) throw error
}