import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Lightbulb, Users, Target } from "lucide-react"
import { motion } from "framer-motion"
import profilePhoto from "@/assets/profile-photo.jpeg"
import { useMotionAnimation, animationVariants, transitions } from "@/hooks/use-motion-animations"

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Expertise in modern web technologies and scalable system architecture"
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "Passionate about creating accessible, inclusive solutions"
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Experience in leading development teams and mentoring junior developers"
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Aspiring System Architect with focus on enterprise-scale solutions"
  }
]

export function AboutSection() {
  const { ref: sectionRef, isInView: sectionVisible } = useMotionAnimation()
  const { ref: imageRef, isInView: imageVisible } = useMotionAnimation()
  const { ref: contentRef, isInView: contentVisible } = useMotionAnimation()

  return (
    <motion.section 
      id="about" 
      className="section-padding bg-gradient-card"
      ref={sectionRef}
      variants={animationVariants.pageSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            About Me
          </Badge>
          <h2 className="mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Passionate About Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A dedicated Software Engineer from Sri Lanka, committed to building innovative 
            solutions that make a meaningful impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div 
            className="reveal-left"
            ref={imageRef}
            variants={animationVariants.zoomIn}
            initial="hidden"
            animate={imageVisible ? "visible" : "hidden"}
            transition={transitions.smooth}
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-card hover-glow transition-smooth">
                <img
                  src={profilePhoto}
                  alt="Kavinda Dewmith"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow">
                <Code className="h-10 w-10 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="reveal-right"
            ref={contentRef}
            variants={animationVariants.slideRight}
            initial="hidden"
            animate={contentVisible ? "visible" : "hidden"}
            transition={transitions.smooth}
          >
            <div className="space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                I'm a Software Engineer at <strong>INTTEQ</strong>, where I contribute to building 
                innovative solutions that drive business growth. My journey in technology is fueled 
                by a passion for creating accessible, user-centric applications.
              </p>
              
              <p className="text-lg text-foreground leading-relaxed">
                Currently pursuing my <strong>BSc in Information Systems (Hons)</strong> at the 
                University of Colombo School of Computing, I'm working towards my goal of becoming 
                a <strong>System Architect</strong>, specializing in scalable enterprise solutions.
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or competing in wrestling championships.
              </p>

              {/* Highlights Grid */}
              <motion.div 
                className="grid sm:grid-cols-2 gap-4 mt-8"
                variants={animationVariants.staggerContainer}
                initial="hidden"
                animate={contentVisible ? "visible" : "hidden"}
              >
                {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  variants={animationVariants.staggerItem}
                  transition={transitions.fast}
                >
                  <Card className="hover-lift transition-smooth border-2 bg-gradient-card">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gradient-hero rounded-lg">
                          <highlight.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">
                            {highlight.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}