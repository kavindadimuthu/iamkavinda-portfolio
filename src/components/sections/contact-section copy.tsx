import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { useMotionAnimation, animationVariants, transitions } from "@/hooks/use-motion-animations"
import { sendContactEmail, ContactFormData } from "@/services/email"
import { toast } from "sonner"

export function ContactSection() {
  const { ref: sectionRef, isInView: sectionVisible } = useMotionAnimation()
  const { ref: formRef, isInView: formVisible } = useMotionAnimation()
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await sendContactEmail(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        toast.error('Failed to send message. Please try again or contact me directly.')
      }
    } catch (error) {
      setSubmitStatus('error')
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "kavindadewmith@gmail.com",
      href: "mailto:kavindadewmith@gmail.com",
      color: "text-blue-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+94 70 123 4567", // Replace with your phone
      href: "tel:+94701234567",
      color: "text-green-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Colombo, Sri Lanka",
      href: "#",
      color: "text-red-500"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/kavindadewmith",
      color: "text-gray-600 dark:text-gray-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/kavindadewmith",
      color: "text-blue-600"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/kavindadewmith",
      color: "text-sky-500"
    }
  ]

  return (
    <motion.section 
      id="contact" 
      className="section-padding"
      ref={sectionRef}
      variants={animationVariants.pageSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto container-padding">
        <motion.div 
          className="text-center mb-16"
          variants={animationVariants.slideUp}
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          transition={transitions.smooth}
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            Get In Touch
          </Badge>
          <h2 className="mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities? 
            I'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            variants={animationVariants.slideUp}
            initial="hidden"
            animate={formVisible ? "visible" : "hidden"}
            transition={{ ...transitions.smooth, delay: 0.2 }}
          >
            <Card className="shadow-card border-2 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Send Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      disabled={isSubmitting}
                      rows={6}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {submitStatus === 'success' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : submitStatus === 'error' ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        {submitStatus === 'success' ? 'Message Sent!' : 
                         submitStatus === 'error' ? 'Try Again' : 'Send Message'}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={animationVariants.slideUp}
            initial="hidden"
            animate={sectionVisible ? "visible" : "hidden"}
            transition={{ ...transitions.smooth, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <Card className="shadow-card border-2 bg-gradient-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-hero`}>
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      <a 
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="shadow-card border-2 bg-gradient-card">
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-gradient-hero text-white hover:scale-110 transition-transform duration-300"
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Response Promise */}
            <Card className="shadow-card border-2 bg-gradient-hero text-white">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                <p className="text-white/90">
                  I typically respond to messages within 24 hours. 
                  For urgent matters, feel free to call directly.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}