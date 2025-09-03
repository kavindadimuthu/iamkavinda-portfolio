import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Send, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Twitter,
  MessageSquare 
} from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useMotionAnimation, animationVariants, transitions } from "@/hooks/use-motion-animations"
import { sendContactEmail, ContactFormData } from "@/services/email"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "kavindadewmith@gmail.com",
    link: "mailto:kavindadewmith@gmail.com",
    description: "Best way to reach me for professional inquiries"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Colombo, Sri Lanka",
    description: "Available for remote work globally"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+94 78 181 9561",
    link: "tel:+94781819561",
    description: "Available during business hours (GMT+5:30)"
  }
]

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    url: "https://github.com/kavindadimuthu",
    username: "@kavindadewmith",
    color: "hover:text-gray-600"
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kavinda-dewmith-1747b8268",
    username: "kavindadewmith",
    color: "hover:text-blue-600"
  },
  {
    icon: Twitter,
    name: "Twitter",
    url: "https://twitter.com/kavindadewmith",
    username: "@kavindadewmith",
    color: "hover:text-blue-400"
  }
]

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const { ref: sectionRef, isInView: sectionVisible } = useMotionAnimation()
  const { ref: contactInfoRef, isInView: contactInfoVisible } = useMotionAnimation()
  const { ref: formRef, isInView: formVisible } = useMotionAnimation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendContactEmail(formData)
      
      if (result.success) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast({
          title: "Failed to send message",
          description: "Please try again or contact me directly at kavindadewmith@gmail.com",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again or contact me directly.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section 
      id="contact" 
      className="section-padding bg-gradient-card"
      ref={sectionRef}
      variants={animationVariants.pageSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
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
            Interested in collaborating or have a project in mind? I'd love to hear from you. 
            Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto lg:items-stretch">
          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-1"
            ref={contactInfoRef}
            variants={animationVariants.slideLeft}
            initial="hidden"
            animate={contactInfoVisible ? "visible" : "hidden"}
            transition={transitions.smooth}
          >
            <Card className="bg-gradient-hero text-white shadow-glow border-2 border-tech-teal/20 hover-lift transition-smooth h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col">
                <p className="text-white/90 mb-6 leading-relaxed">
                  Ready to discuss your next project or explore collaboration opportunities? 
                  Reach out through any of these channels.
                </p>
                
                <div className="space-y-6 flex-1">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-3">
                      <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                        <info.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-white/90 hover:text-white transition-smooth"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white/90">{info.value}</p>
                        )}
                        <p className="text-xs text-white/70 mt-1">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Response Time Info */}
                <div className="mt-6 p-3 bg-white/10 rounded-lg">
                  <p className="text-xs text-white/80 text-center">
                    <strong>Response Time:</strong> I typically respond within 24-48 hours. 
                    For urgent matters, feel free to call or message on LinkedIn.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            ref={formRef}
            variants={animationVariants.slideRight}
            initial="hidden"
            animate={formVisible ? "visible" : "hidden"}
            transition={transitions.smooth}
          >
            <Card className="shadow-card border-2 bg-gradient-card h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Send className="h-5 w-5" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="border-2 focus:border-tech-blue transition-smooth"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="border-2 focus:border-tech-blue transition-smooth"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="border-2 focus:border-tech-blue transition-smooth"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or inquiry..."
                      className="border-2 focus:border-tech-blue transition-smooth resize-none flex-1 min-h-[120px]"
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-hero hover:opacity-90 hover-lift transition-smooth font-semibold py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}