import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"
import { useMotionAnimation, animationVariants, transitions } from "@/hooks/use-motion-animations"

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    url: "https://github.com/kavindadimuthu",
    color: "hover:text-gray-600"
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kavinda-dewmith-1747b8268",
    color: "hover:text-blue-600"
  },
//   {
//     icon: Twitter,
//     name: "Twitter",
//     url: "https://twitter.com/kavindadewmith",
//     color: "hover:text-blue-400"
//   },
  {
    icon: Mail,
    name: "Email",
    url: "mailto:kavindadewmith@gmail.com",
    color: "hover:text-tech-teal"
  }
]

export function Footer() {
  const { ref, isInView } = useMotionAnimation()

  return (
    <motion.footer 
      ref={ref}
      className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12"
      variants={animationVariants.footerSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto container-padding">
        <motion.div 
          className="text-center"
          variants={animationVariants.staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mb-8"
            variants={animationVariants.staggerItem}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-white/10 rounded-full hover:bg-white/20 transition-smooth hover-scale ${social.color}`}
                aria-label={social.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <div className="space-y-2">
            <p className="text-white/90 flex items-center justify-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-400" fill="currentColor" /> by Kavinda Dewmith
            </p>
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Kavinda Dewmith. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#about" className="text-white/70 hover:text-white transition-smooth">
                About
              </a>
              <a href="#projects" className="text-white/70 hover:text-white transition-smooth">
                Projects
              </a>
              <a href="#experience" className="text-white/70 hover:text-white transition-smooth">
                Experience
              </a>
              <a href="#skills" className="text-white/70 hover:text-white transition-smooth">
                Skills
              </a>
              <a href="#contact" className="text-white/70 hover:text-white transition-smooth">
                Contact
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}