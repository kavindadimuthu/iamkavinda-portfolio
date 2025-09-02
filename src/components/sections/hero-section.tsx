import { Button } from "@/components/ui/button"
import { Download, Mail, Github, Linkedin, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { animationVariants, transitions } from "@/hooks/use-motion-animations"
import { CircuitBoardBackground } from "@/components/3d/circuit-board-background"

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadResume = () => {
    const resumeUrl = "https://kuztodntjoskejgxlaib.supabase.co/storage/v1/object/public/Main/my-cvs/Kavinda_Dewmith_CV.pdf"
    window.open(resumeUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.section 
      id="hero" 
      className="relative min-h-screen flex items-center p-auto md:pt-20 justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(47, 63, 158, 0.85), rgba(0, 191, 166, 0.85))' }}
      initial="hidden"
      animate="visible"
      variants={animationVariants.pageSection}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* 3D Circuit Board Background */}
      <CircuitBoardBackground />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-20 h-20 border border-white/20 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-16 h-16 border border-tech-teal/30 rounded-full animate-float delay-1000" />
        <div className="absolute bottom-32 left-40 w-12 h-12 border border-white/10 rounded-full animate-float delay-2000" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-tech-teal/20 rounded-full animate-float delay-500" />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center text-white">
          {/* Main heading */}
          <motion.div
            variants={animationVariants.slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1 
              className="mb-6 font-extrabold leading-tight text-white"
              variants={animationVariants.staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span 
                className="block mb-2"
                variants={animationVariants.staggerItem}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Kavinda Dewmith
              </motion.span>
              <motion.span 
                className="text-tech-teal-light text-xl md:text-3xl lg:text-4xl font-medium"
                variants={animationVariants.staggerItem}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Software Engineer
              </motion.span>
            </motion.h1>
          </motion.div>
            
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed"
            variants={animationVariants.slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Building scalable, accessible, and future-ready platforms
          </motion.p>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={animationVariants.staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.6 }}
          >
            <motion.div
              variants={animationVariants.staggerItem}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={downloadResume}
                size="lg"
                className="bg-white text-tech-blue hover:bg-white/90 hover-lift transition-smooth font-semibold px-8 py-4 text-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
            <motion.div
              variants={animationVariants.staggerItem}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={() => scrollToSection("#contact")}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-tech-blue hover-lift transition-smooth font-semibold px-8 py-4 text-lg bg-transparent"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex justify-center space-x-6 mb-16"
            variants={animationVariants.staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2.0 }}
          >
            <motion.a
              href="https://github.com/kavindadimuthu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/30 rounded-full hover:bg-white/10 hover-scale transition-smooth text-white"
              variants={animationVariants.staggerItem}
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kavinda-dewmith-1747b8268"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/30 rounded-full hover:bg-white/10 hover-scale transition-smooth text-white"
              variants={animationVariants.staggerItem}
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a
              href="mailto:kavinda@example.com"
              className="p-3 border border-white/30 rounded-full hover:bg-white/10 hover-scale transition-smooth text-white"
              variants={animationVariants.staggerItem}
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={animationVariants.slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="animate-bounce">
              <button
                onClick={() => scrollToSection("#about")}
                className="inline-flex flex-col items-center text-white/70 hover:text-white transition-smooth"
              >
                <span className="text-sm mb-2">Scroll Down</span>
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}