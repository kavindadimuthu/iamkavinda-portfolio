import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateBlog, useUpdateBlog, useBlog } from '@/hooks/use-blogs'
import { useImageUpload } from '@/hooks/use-image-upload'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import MDEditor from '@uiw/react-md-editor'
import { Save, Upload, Eye, X, FileText, Download } from 'lucide-react'
import { toast } from 'sonner'

export default function BlogEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id && id !== 'new')
  
  const { data: existingBlog, isLoading } = useBlog(isEditing ? '' : '')
  const { mutate: createBlog, isPending: isCreating } = useCreateBlog()
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog()
  const { mutate: uploadImage, isPending: isUploading } = useImageUpload()

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    status: 'draft' as 'draft' | 'published',
    tags: [] as string[]
  })
  const [tagInput, setTagInput] = useState('')
  const [activeTab, setActiveTab] = useState('edit')
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load existing blog data when editing
  useEffect(() => {
    if (isEditing && id && id !== 'new') {
      // In real implementation, you'd fetch the blog by ID
      // For now, we'll use a placeholder since we need to implement getBlogById
    }
  }, [id, isEditing])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleImageUpload = async (file: File) => {
    try {
      const result = await new Promise<{ url: string }>((resolve, reject) => {
        uploadImage(file, {
          onSuccess: resolve,
          onError: reject
        })
      })
      
      // Insert markdown image syntax
      const imageMarkdown = `![Image](${result.url})`
      handleInputChange('content', formData.content + '\n\n' + imageMarkdown)
      toast.success('Image uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload image')
    }
  }

  const handleCoverImageUpload = async (file: File) => {
    try {
      const result = await new Promise<{ url: string }>((resolve, reject) => {
        uploadImage(file, {
          onSuccess: resolve,
          onError: reject
        })
      })
      
      handleInputChange('cover_image_url', result.url)
      toast.success('Cover image uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload cover image')
    }
  }

  const handleSave = async (status: 'draft' | 'published') => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required')
      return
    }

    const blogData = {
      ...formData,
      status
    }

    if (isEditing && id && id !== 'new') {
      updateBlog({ 
        id,
        ...blogData 
      }, {
        onSuccess: () => {
          navigate('/admin')
        }
      })
    } else {
      createBlog(blogData, {
        onSuccess: () => {
          navigate('/admin')
        }
      })
    }
  }

  const extractTitleFromMarkdown = (content: string): string => {
    const titleMatch = content.match(/^#\s+(.+)$/m)
    return titleMatch ? titleMatch[1].trim() : ''
  }

  const extractExcerptFromMarkdown = (content: string): string => {
    // Remove title line and empty lines, then get first paragraph
    const lines = content.split('\n')
    const contentLines = lines.filter(line => 
      !line.match(/^#\s+/) && line.trim() !== ''
    )
    
    const firstParagraph = contentLines.find(line => 
      line.trim() !== '' && !line.match(/^[#*-]/)
    )
    
    return firstParagraph ? firstParagraph.trim().substring(0, 200) + '...' : ''
  }

  const handleReadmeImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.md')) {
      toast.error('Please select a markdown (.md) file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content) {
        const title = extractTitleFromMarkdown(content)
        const excerpt = extractExcerptFromMarkdown(content)
        
        setFormData(prev => ({
          ...prev,
          title: title || prev.title,
          excerpt: excerpt || prev.excerpt,
          content
        }))
        
        toast.success('README file imported successfully!')
      }
    }
    reader.readAsText(file)
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Edit Post' : 'New Post'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your blog post' : 'Create a new blog post'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave('draft')}
              disabled={isCreating || isUpdating}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Blog Post Preview</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {formData.cover_image_url && (
                    <img 
                      src={formData.cover_image_url} 
                      alt="Cover" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h1 className="text-4xl font-bold mb-4">{formData.title || 'Untitled Post'}</h1>
                    {formData.excerpt && (
                      <p className="text-xl text-muted-foreground mb-6">{formData.excerpt}</p>
                    )}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    )}
                    <article className="prose dark:prose-invert max-w-none">
                      <MDEditor.Markdown source={formData.content} />
                    </article>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => handleSave('published')}
              disabled={isCreating || isUpdating}
            >
              <Download className="mr-2 h-4 w-4" />
              {isCreating || isUpdating ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of your post..."
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Content</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReadmeImport}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Import README
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit" className="mt-4">
                    <MDEditor
                      value={formData.content}
                      onChange={(val) => handleInputChange('content', val || '')}
                      height={400}
                      preview="edit"
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="mt-4">
                    <div className="border rounded-md p-4 min-h-[400px]">
                      <MDEditor.Markdown 
                        source={formData.content} 
                        className="prose dark:prose-invert max-w-none"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'draft' | 'published') => 
                      handleInputChange('status', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.cover_image_url && (
                  <div className="relative">
                    <img
                      src={formData.cover_image_url}
                      alt="Cover"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange('cover_image_url', '')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleCoverImageUpload(file)
                    }}
                    disabled={isUploading}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                  >
                    Add
                  </Button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                  }}
                  disabled={isUploading}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Upload images to insert into your content
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}