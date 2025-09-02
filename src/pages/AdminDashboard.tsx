import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBlogs, useDeleteBlog } from '@/hooks/use-blogs'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Search, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin/admin-layout'

export default function AdminDashboard() {
  const { data: blogs, isLoading } = useBlogs()
  const { mutate: deleteBlog } = useDeleteBlog()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBlogs = blogs?.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    deleteBlog(id)
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your blog posts
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogs?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {blogs?.filter(blog => blog.status === 'published').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {blogs?.filter(blog => blog.status === 'draft').length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog List */}
        <div className="space-y-4">
          {filteredBlogs?.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                          {blog.status}
                        </Badge>
                      </div>
                      {blog.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {blog.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {blog.published_at 
                            ? format(new Date(blog.published_at), 'MMM d, yyyy')
                            : format(new Date(blog.created_at), 'MMM d, yyyy')
                          }
                        </div>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex gap-1">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag.id} variant="outline" className="text-xs">
                                {tag.name}
                              </Badge>
                            ))}
                            {blog.tags.length > 3 && (
                              <span className="text-muted-foreground">+{blog.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {blog.status === 'published' && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${blog.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/blog/${blog.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(blog.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {filteredBlogs?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? 'No posts found matching your search.' : 'No blog posts yet.'}
              </p>
              {!searchTerm && (
                <Button asChild className="mt-4">
                  <Link to="/admin/blog/new">Create Your First Post</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}