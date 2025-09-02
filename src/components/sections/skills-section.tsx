import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { 
  Code, 
  Server, 
  Database, 
  Cloud, 
  Wrench, 
  Palette,
  Brain,
  Users
} from "lucide-react"
import { useMotionAnimation, animationVariants, transitions } from "@/hooks/use-motion-animations"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "text-tech-blue",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 88 },
      { name: "React Native", level: 75 },
      { name: "HTML5/CSS3", level: 95 },
      { name: "Tailwind CSS", level: 92 },
    ]
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "text-tech-teal",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "Spring Boot", level: 80 },
      { name: "PHP", level: 75 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 70 },
    ]
  },
  {
    title: "Databases & Storage",
    icon: Database,
    color: "text-tech-blue",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 82 },
      { name: "Supabase", level: 90 },
      { name: "Firebase", level: 80 },
      { name: "Redis", level: 65 },
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "text-tech-teal",
    skills: [
      { name: "AWS", level: 75 },
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 70 },
      { name: "Git", level: 95 },
      { name: "Linux", level: 78 },
      { name: "Nginx", level: 70 },
    ]
  },
  {
    title: "Development Tools",
    icon: Wrench,
    color: "text-tech-blue",
    skills: [
      { name: "VS Code", level: 95 },
      { name: "IntelliJ IDEA", level: 85 },
      { name: "Postman", level: 90 },
      { name: "Figma", level: 80 },
      { name: "Jest", level: 75 },
      { name: "Webpack", level: 70 },
    ]
  },
  {
    title: "Design & UX",
    icon: Palette,
    color: "text-tech-teal",
    skills: [
      { name: "UI/UX Design", level: 82 },
      { name: "Responsive Design", level: 95 },
      { name: "Accessibility", level: 88 },
      { name: "Prototyping", level: 80 },
      { name: "Design Systems", level: 85 },
      { name: "User Research", level: 70 },
    ]
  }
]

const softSkills = [
  {
    title: "Problem Solving",
    icon: Brain,
    description: "Strong analytical thinking and systematic approach to complex challenges"
  },
  {
    title: "Team Leadership",
    icon: Users,
    description: "Experience leading development teams and mentoring junior developers"
  },
  {
    title: "Communication",
    icon: Users,
    description: "Effective communication with stakeholders and cross-functional teams"
  },
  {
    title: "Adaptability",
    icon: Brain,
    description: "Quick learner who adapts to new technologies and changing requirements"
  }
]

export function SkillsSection() {
  const { ref: sectionRef, isInView: sectionVisible } = useMotionAnimation()
  const { ref: skillsGridRef, isInView: skillsVisible } = useMotionAnimation()
  const { ref: softSkillsRef, isInView: softSkillsVisible } = useMotionAnimation()

  return (
    <motion.section 
      id="skills" 
      className="section-padding"
      ref={sectionRef}
      variants={animationVariants.pageSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            Technical Expertise
          </Badge>
          <h2 className="mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills and proficiency levels 
            across various technologies and frameworks.
          </p>
        </motion.div>

        {/* Technical Skills Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          ref={skillsGridRef}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate={skillsVisible ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                  scale: 0.95
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1
                }
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.15
              }}
            >
              <Card className="hover-lift transition-smooth shadow-card border-2 bg-gradient-card">
                {/* ... keep existing code (card content) */}
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-hero rounded-lg">
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <div>
          <motion.h3 
            className="text-2xl font-bold text-center mb-8 bg-gradient-hero bg-clip-text text-transparent"
            variants={animationVariants.slideUp}
            initial="hidden"
            animate={sectionVisible ? "visible" : "hidden"}
            transition={{ ...transitions.smooth, delay: 0.5 }}
          >
            Core Competencies
          </motion.h3>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            ref={softSkillsRef}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3
                }
              }
            }}
            initial="hidden"
            animate={softSkillsVisible ? "visible" : "hidden"}
          >
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                    scale: 0.9
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.1
                }}
              >
                <Card className="text-center hover-lift transition-smooth shadow-card border-2 bg-gradient-card">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-hero rounded-full flex items-center justify-center shadow-glow">
                        <skill.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-3">{skill.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications Call-to-Action */}
        <motion.div 
          className="text-center mt-16"
          variants={animationVariants.slideUp}
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          transition={{ ...transitions.smooth, delay: 0.8 }}
        >
          <Card className="inline-block bg-gradient-hero text-white shadow-glow hover-scale transition-smooth">
            <CardContent className="p-6">
              <h4 className="font-bold text-lg mb-2">Continuous Learning</h4>
              <p className="text-white/90 mb-4">
                Actively pursuing certifications in AWS and advanced system architecture
              </p>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Growing Every Day
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  )
}