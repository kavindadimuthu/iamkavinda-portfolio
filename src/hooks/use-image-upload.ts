import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

export interface UploadImageResult {
  url: string
  path: string
}

export function useImageUpload() {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadImageResult> => {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('BLOG_IMAGES_BUCKET')
        .upload(filePath, file)

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('BLOG_IMAGES_BUCKET')
        .getPublicUrl(data.path)

      return {
        url: publicUrl,
        path: data.path
      }
    },
    onError: (error) => {
      toast.error(`Failed to upload image: ${error.message}`)
    },
  })
}