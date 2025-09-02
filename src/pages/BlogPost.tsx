import { useParams, Link } from 'react-router-dom'
import { useBlog } from '@/hooks/use-blogs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, User, Share } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { data: blog, isLoading, error } = useBlog(slug!)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-64 bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // SEO meta tags (in a real app, you'd use React Helmet or similar)
  const seoTitle = `${blog.title} | Kavinda Dewmith`
  const seoDescription = blog.excerpt || `Read ${blog.title} by Kavinda Dewmith`

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <header className="mb-8">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{blog.author.name}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(blog.published_at || blog.created_at), 'MMMM d, yyyy')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{Math.ceil(blog.content.split(' ').length / 200)} min read</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Cover Image */}
              {blog.cover_image_url && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <img
                    src={blog.cover_image_url}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </motion.div>
              )}

              {/* Excerpt */}
              {blog.excerpt && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <p className="text-lg text-muted-foreground italic">
                        {blog.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </header>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  img: ({ node, ...props }) => (
                    <img 
                      {...props} 
                      className="rounded-lg shadow-md my-8 w-full"
                      loading="lazy"
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote 
                      {...props} 
                      className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground"
                    />
                  ),
                  code: ({ node, ...props }) => {
                    const { children, className } = props as any
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <code {...props} />
                    ) : (
                      <code {...props} className="bg-muted px-1 py-0.5 rounded text-sm" />
                    )
                  }
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </motion.div>

            {/* Author Bio */}
            {blog.author && blog.author.bio && (
              <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-xl">
                        {blog.author.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          About {blog.author.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {blog.author.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.footer>
            )}

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex justify-center"
            >
              <Button asChild size="lg">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Posts
                </Link>
              </Button>
            </motion.div>
          </motion.article>
        </div>
      </motion.main>

      <Footer />
    </div>
  )
}