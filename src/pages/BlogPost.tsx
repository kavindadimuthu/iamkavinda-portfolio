import { useParams, Link } from 'react-router-dom'
import { useBlog } from '@/hooks/use-blogs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, Clock, User, Share, BookOpen, Tag, Copy, Check } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useState } from 'react'
import { toast } from 'sonner'
import 'highlight.js/styles/atom-one-dark.css'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { data: blog, isLoading, error } = useBlog(slug!)
  const [copiedText, setCopiedText] = useState('')

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(''), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const readingTime = Math.ceil((blog?.content?.split(' ').length || 0) / 200)

  // Custom components for markdown rendering
  const components = {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 mt-12 first:mt-0 border-b border-border pb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 mt-8">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-6">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-base md:text-lg font-semibold text-foreground mb-2 mt-4">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-sm md:text-base font-semibold text-foreground mb-2 mt-4">
        {children}
      </h6>
    ),
    p: ({ children }: any) => (
      <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
        {children}
      </p>
    ),
    a: ({ href, children }: any) => (
      <a 
        href={href} 
        className="text-primary hover:text-primary/80 transition-colors underline decoration-primary/30 hover:decoration-primary/60 underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="text-foreground font-bold">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="text-foreground/90 italic">
        {children}
      </em>
    ),
    code: ({ inline, children, className }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      
      if (inline) {
        return (
          <code className="text-primary bg-muted px-2 py-1 rounded text-sm font-mono border">
            {children}
          </code>
        )
      }

      const codeString = String(children).replace(/\n$/, '')
      
      return (
        <div className="relative group my-6">
          <div className="flex items-center justify-between bg-muted/50 border border-border rounded-t-lg px-4 py-2">
            <span className="text-sm font-medium text-muted-foreground">
              {language || 'code'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => copyToClipboard(codeString)}
            >
              {copiedText === codeString ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <pre className="bg-card border border-t-0 border-border rounded-b-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-foreground">
              {children}
            </code>
          </pre>
        </div>
      )
    },
    pre: ({ children }: any) => children, // Let the code component handle the pre styling
    ul: ({ children }: any) => (
      <ul className="text-muted-foreground list-disc list-inside mb-6 space-y-2 pl-4">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="text-muted-foreground list-decimal list-inside mb-6 space-y-2 pl-4">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-muted-foreground leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg mb-6 relative">
        <div className="absolute top-2 left-2 text-primary/20 text-4xl font-serif leading-none">"</div>
        <div className="text-muted-foreground italic pl-6">
          {children}
        </div>
      </blockquote>
    ),
    hr: () => (
      <hr className="border-border my-8" />
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-6 rounded-lg border border-border">
        <table className="min-w-full">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="border-b border-border bg-muted/50 px-6 py-3 text-foreground font-semibold text-left">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border-b border-border px-6 py-4 text-muted-foreground">
        {children}
      </td>
    ),
    img: ({ src, alt, ...props }: any) => (
      <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
        <img 
          src={src}
          alt={alt}
          {...props}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    ),
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto pt-24">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded w-16"></div>
                  <div className="h-6 bg-muted rounded w-20"></div>
                </div>
              </div>
              <div className="h-72 bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
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
          <div className="max-w-4xl mx-auto text-center py-16 pt-24">
            <div className="space-y-6">
              <div className="text-6xl">📝</div>
              <h1 className="text-4xl font-bold">Post Not Found</h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild size="lg">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 py-16 max-w-4xl">
        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="text-primary hover:text-primary/80 hover:bg-primary/10">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            {blog.author && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  {blog.author.name.charAt(0)}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{blog.author.name}</span>
                </div>
              </div>
            )}
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(blog.published_at || blog.created_at), 'MMMM d, yyyy')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{blog.content.split(' ').length} words</span>
            </div>

            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Excerpt */}
          {blog.excerpt && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed mt-6 font-medium"
            >
              {blog.excerpt}
            </motion.p>
          )}
        </motion.header>

        {/* Cover Image */}
        {blog.cover_image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <ReactMarkdown
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.content || ''}
          </ReactMarkdown>
        </motion.article>

        {/* Author Bio */}
        {blog.author && blog.author.bio && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8"
          >
            <Separator className="mb-8" />
            <Card className="border-2 border-border hover:shadow-lg transition-shadow bg-muted/30">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-foreground">
                      About {blog.author.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {blog.author.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.footer>
        )}

        {/* Article Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="text-primary hover:text-primary/80 hover:bg-primary/10">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all posts
              </Link>
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Published on {format(new Date(blog.published_at || blog.created_at), 'MMMM d, yyyy')}
            </div>
          </div>
        </motion.footer>
      </div>

      <Footer />
    </div>
  )
}