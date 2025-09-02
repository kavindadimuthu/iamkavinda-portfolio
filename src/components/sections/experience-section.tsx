import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { useMotionAnimation, animationVariants, transitions } from "@/hooks/use-motion-animations"

const experiences = [
  {
    type: "work",
    title: "Associate Software Engineer",
    company: "INTTEQ",
    location: "Colombo, Sri Lanka",
    period: "November 2024 - Present",
    description: "Contributing to enterprise software development projects, focusing on scalable web applications and system integration.",
    technologies: ["Spring Boot", "React", "PostgreSQL", "AWS", "Docker"],
    achievements: [
      "Developed microservices architecture for client projects",
      "Improved application performance by 40% through optimization",
      "Mentored junior developers on best practices"
    ]
  }
]

const education = [
  {
    type: "education",
    title: "BSc in Information Systems (Honours)",
    company: "University of Colombo School of Computing",
    location: "Colombo, Sri Lanka",
    period: "2021 - Present",
    description: "Comprehensive program covering software engineering, database systems, web technologies, and system analysis & design.",
    achievements: [
      "Director's List recognition for academic excellence",
      "Active member of computing society",
      "Specialized in software architecture and system design"
    ],
    gpa: "Current GPA: 3.48/4.0"
  }
]

interface TimelineItemProps {
  item: typeof experiences[0] | typeof education[0]
  index: number
}

function TimelineItem({ item, index, isVisible }: TimelineItemProps & { isVisible: boolean }) {
  const isWork = item.type === "work"
  const Icon = isWork ? Building : GraduationCap

  return (
    <motion.div 
      className="flex gap-6"
      variants={{
        hidden: {
          opacity: 0,
          x: -50,
          scale: 0.95
        },
        visible: {
          opacity: 1,
          x: 0,
          scale: 1
        }
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      {/* Timeline line and icon */}
      <div className="flex flex-col items-center">
        <div className={`p-3 rounded-full shadow-glow ${
          isWork ? "bg-gradient-hero" : "bg-tech-teal"
        }`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="w-0.5 h-full bg-gradient-to-b from-tech-blue to-tech-teal mt-4" />
      </div>

      {/* Content */}
      <Card className="flex-1 hover-lift transition-smooth shadow-card border-2 bg-gradient-card mb-8">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
              <Badge variant={isWork ? "default" : "secondary"} className="text-xs">
                {isWork ? "Professional" : "Academic"}
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span className="font-medium">{item.company}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{item.period}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground leading-relaxed mb-4">
            {item.description}
          </p>

          {/* GPA for education */}
          {"gpa" in item && (
            <div className="mb-4">
              <Badge variant="outline" className="bg-tech-teal/10 text-tech-teal border-tech-teal/20">
                {item.gpa}
              </Badge>
            </div>
          )}

          {/* Technologies for work experience */}
          {"technologies" in item && item.technologies && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          <div>
            <h4 className="font-semibold text-sm mb-2">
              {isWork ? "Key Achievements:" : "Highlights:"}
            </h4>
            <ul className="space-y-1">
              {item.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start text-sm text-muted-foreground">
                  <span className="inline-block w-1.5 h-1.5 bg-tech-teal rounded-full mt-2 mr-3 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ExperienceSection() {
  const { ref: sectionRef, isInView: sectionVisible } = useMotionAnimation()
  const { ref: timelineRef, isInView: timelineVisible } = useMotionAnimation()

  return (
    <motion.section 
      id="experience" 
      className="section-padding bg-gradient-card"
      ref={sectionRef}
      variants={animationVariants.pageSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
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
            Career Journey
          </Badge>
          <h2 className="mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My professional journey and academic background in building innovative 
            software solutions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto" ref={timelineRef}>
          {/* Work Experience */}
          <div className="mb-12">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 reveal-up ${timelineVisible ? 'animate-in' : ''}`}>
              <Building className="h-6 w-6 text-tech-blue" />
              Professional Experience
            </h3>
            {experiences.map((experience, index) => (
              <TimelineItem 
                key={`work-${index}`} 
                item={experience} 
                index={index}
                isVisible={timelineVisible}
              />
            ))}
          </div>

          {/* Education */}
          <div>
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 reveal-up ${timelineVisible ? 'animate-in' : ''}`}
                style={{ animationDelay: '0.3s' }}>
              <GraduationCap className="h-6 w-6 text-tech-teal" />
              Education
            </h3>
            {education.map((edu, index) => (
              <TimelineItem 
                key={`edu-${index}`} 
                item={edu} 
                index={index + experiences.length}
                isVisible={timelineVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}