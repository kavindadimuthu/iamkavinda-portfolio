import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { AchievementsSection } from "@/components/sections/achievements-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </motion.div>
  )
}

export default Index
