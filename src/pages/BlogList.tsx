import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePublishedBlogs, useTags } from '@/hooks/use-blogs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function BlogList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  
  const { data: blogs, isLoading } = usePublishedBlogs(searchTerm, selectedTag)
  const { data: tags } = useTags()

  const filteredTags = tags?.slice(0, 10) // Show first 10 tags

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development, technology, and more.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-6"
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tags */}
          {filteredTags && filteredTags.length > 0 && (
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={selectedTag === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag('')}
                >
                  All
                </Button>
                {filteredTags.map((tag) => (
                  <Button
                    key={tag.id}
                    variant={selectedTag === tag.slug ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag(tag.slug === selectedTag ? '' : tag.slug)}
                  >
                    {tag.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Blog Posts */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-48 bg-muted rounded-md mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : blogs && blogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <CardHeader className="p-0">
                    {blog.cover_image_url && (
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={blog.cover_image_url}
                          alt={blog.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 pb-4">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        <Link to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h2>
                      {blog.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {blog.excerpt}
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.id} variant="secondary" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(blog.published_at || blog.created_at), 'MMM d, yyyy')}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        <Link to={`/blog/${blog.slug}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              {searchTerm || selectedTag
                ? 'No posts found matching your criteria.'
                : 'No blog posts published yet.'}
            </p>
          </motion.div>
        )}

        {/* Load More (Future Enhancement) */}
        {blogs && blogs.length > 0 && blogs.length % 9 === 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}