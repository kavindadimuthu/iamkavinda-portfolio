import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import { useMotionAnimation, animationVariants, transitions } from "@/hooks/use-motion-animations"

const projects = [
	{
		title: "Busmate Platform",
		description:
			"Smart Bus Transportation Management System with real-time tracking, route optimization, and passenger management features.",
		technologies: [
			"Spring Boot",
			"Express.js",
			"Supabase",
			"PostgreSQL",
			"MongoDB",
			"React",
		],
		category: "Full-Stack",
		status: "In Development",
		features: [
			"Real-time bus tracking",
			"Route optimization algorithms",
			"Passenger booking system",
			"Driver management portal",
		],
		githubUrl: "https://github.com/Busmate-Lk",
		liveUrl: "https://busmate-web-frontend.vercel.app/", // In development(preview)
	},
	{
		title: "Readlle – Inclusive Learning Platform",
		description:
			"Dyslexia-friendly, accessibility-first e-learning platform built with React/Next.js, focusing on inclusive education.",
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"Tailwind CSS",
			"Accessibility APIs",
		],
		category: "Frontend",
		status: "Winner",
		achievement: "INNOVA National Ideathon 2025 - 2nd Runner-up",
		features: [
			"Dyslexia-friendly interface design",
			"Screen reader compatibility",
			"Customizable reading modes",
			"Progress tracking system",
		],
		githubUrl: "https://github.com/kavindadimuthu/readle",
		liveUrl: "https://readle-sigma.vercel.app",
	},
	{
		title: "BrandBoost Web Platform",
		description:
			"Enterprise B2B marketplace connecting brands with marketing agencies, featuring real-time communication and project management.",
		technologies: ["PHP", "MySQL", "WebSockets", "JavaScript", "Bootstrap"],
		category: "Full-Stack",
		status: "Completed",
		features: [
			"Real-time messaging system",
			"Project management tools",
			"Payment integration",
			"Analytics dashboard",
		],
		githubUrl: "https://github.com/kavindadimuthu/brandboost",
		liveUrl: null, // Not deployed
	},
	{
		title: "Omilga Tyre Shop Website",
		description:
			"Full-featured e-commerce platform for automotive tire sales with inventory management and secure payment processing.",
		technologies: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
		category: "MERN Stack",
		status: "Completed",
		features: [
			"Product catalog with search",
			"Inventory management",
			"Secure JWT authentication",
			"Order tracking system",
		],
		githubUrl: "https://github.com/kavindadimuthu/Omilga-Tyreshop-Frontend",
		liveUrl: "https://omilga-tyreshop.vercel.app",
	},
]

export function ProjectsSection() {
	const { ref: sectionRef, isInView: sectionVisible } = useMotionAnimation()
	const { ref: gridRef, isInView: gridVisible } = useMotionAnimation()

	const handleViewCode = (githubUrl: string) => {
		window.open(githubUrl, '_blank', 'noopener,noreferrer')
	}

	const handleLiveDemo = (liveUrl: string) => {
		window.open(liveUrl, '_blank', 'noopener,noreferrer')
	}

	const handleViewAllProjects = () => {
		window.open('https://github.com/kavindadimuthu', '_blank', 'noopener,noreferrer')
	}

	return (
		<motion.section
			id="projects"
			className="section-padding"
			ref={sectionRef}
			variants={animationVariants.pageSection}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
						Featured Work
					</Badge>
					<h2 className="mb-6 bg-gradient-hero bg-clip-text text-transparent">
						Projects & Innovations
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						A showcase of my technical expertise and problem-solving approach
						across various domains and technologies.
					</p>
				</motion.div>

		<motion.div
			className="grid md:grid-cols-2 gap-8 items-stretch"
			ref={gridRef}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: 0.25,
						delayChildren: 0.3
					}
				}
			}}
			initial="hidden"
			animate={gridVisible ? "visible" : "hidden"}
		>
					{projects.map((project, index) => (
			<motion.div
				key={project.title}
				variants={{
					hidden: {
						opacity: 0,
						y: 50,
						scale: 0.9
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
				className="h-full"
			>
							<Card className="hover-lift transition-smooth shadow-card border-2 bg-gradient-card overflow-hidden h-full flex flex-col">
								<CardHeader className="pb-4">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<CardTitle className="text-xl">
													{project.title}
												</CardTitle>
												{project.achievement && (
													<Trophy className="h-4 w-4 text-tech-teal" />
												)}
											</div>
											<div className="flex items-center gap-2 mb-3">
												<Badge variant="secondary" className="text-xs">
													{project.category}
												</Badge>
												<Badge
													variant={
														project.status === "Winner"
															? "default"
															: "outline"
													}
													className="text-xs"
												>
													{project.status}
												</Badge>
											</div>
										</div>
									</div>

									{project.achievement && (
										<div className="bg-gradient-hero text-white p-3 rounded-lg mb-4">
											<div className="flex items-center gap-2">
												<Trophy className="h-4 w-4" />
												<span className="text-sm font-medium">
													{project.achievement}
												</span>
											</div>
										</div>
									)}
								</CardHeader>

								<CardContent className="pt-0 flex-1 flex flex-col">
									<p className="text-muted-foreground mb-4 leading-relaxed">
										{project.description}
									</p>

									{/* Key Features */}
									<div className="mb-4 flex-1">
										<h4 className="font-semibold text-sm mb-2">
											Key Features:
										</h4>
										<ul className="text-sm text-muted-foreground space-y-1">
											{project.features.map((feature, idx) => (
												<li key={idx} className="flex items-start">
													<span className="inline-block w-1.5 h-1.5 bg-tech-teal rounded-full mt-2 mr-2 flex-shrink-0" />
													{feature}
												</li>
											))}
										</ul>
									</div>

									{/* Technologies */}
									<div className="mb-6">
										<h4 className="font-semibold text-sm mb-3">
											Technologies Used:
										</h4>
										<div className="flex flex-wrap gap-2">
											{project.technologies.map((tech) => (
												<Badge
													key={tech}
													variant="outline"
													className="text-xs hover:bg-accent/50 transition-smooth"
												>
													{tech}
												</Badge>
											))}
										</div>
									</div>

									{/* Action Buttons - Always at bottom */}
									<div className="flex gap-3 mt-auto">
										<Button
											variant="outline"
											size="sm"
											className="flex-1 hover-glow transition-smooth"
											onClick={() => handleViewCode(project.githubUrl)}
										>
											<Github className="h-4 w-4 mr-2" />
											View Code
										</Button>
										<Button
											size="sm"
											className="flex-1 bg-gradient-hero hover:opacity-90 transition-smooth"
											onClick={() => project.liveUrl && handleLiveDemo(project.liveUrl)}
											disabled={!project.liveUrl}
										>
											<ExternalLink className="h-4 w-4 mr-2" />
											{project.liveUrl ? 'Live Demo' : 'Coming Soon'}
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>

				{/* View More Projects Button */}
				<motion.div
					className="text-center mt-12"
					variants={animationVariants.slideUp}
					initial="hidden"
					animate={sectionVisible ? "visible" : "hidden"}
					transition={{ ...transitions.smooth, delay: 0.6 }}
				>
					<Button
						variant="outline"
						size="lg"
						className="hover-glow transition-smooth px-8 py-4"
						onClick={handleViewAllProjects}
					>
						<Github className="h-5 w-5 mr-2" />
						View All Projects on GitHub
					</Button>
				</motion.div>
			</div>
		</motion.section>
	)
}