import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award, Target, Medal, Crown } from "lucide-react"
import { motion } from "framer-motion"
import { useMotionAnimation, animationVariants, transitions } from "@/hooks/use-motion-animations"

const achievements = [
	{
		title: "INNOVA National Ideathon 2025",
		subtitle: "2nd Runner-up",
		description:
			"Recognition for Readlle - an inclusive, dyslexia-friendly learning platform that prioritizes accessibility in education.",
		icon: Trophy,
		category: "Competition",
		year: "2025",
		impact: "National Recognition",
		color: "text-yellow-500",
		bgColor: "bg-yellow-500/10",
		borderColor: "border-yellow-500/20",
	},
	{
		title: "Director's List",
		subtitle: "Academic Excellence",
		description: "Recognized for outstanding academic performance at the University of Colombo School of Computing.",
		icon: Star,
		category: "Academic",
		year: "2023-2024",
		impact: "Group project excellence",
		color: "text-blue-500",
		bgColor: "bg-blue-500/10",
		borderColor: "border-blue-500/20",
	},
	{
		title: "Wrestling Championship",
		subtitle: "Runner-up",
		description: "University-level wrestling competition demonstrating dedication, discipline, and competitive spirit.",
		icon: Medal,
		category: "Sports",
		year: "2023",
		impact: "University Level",
		color: "text-orange-500",
		bgColor: "bg-orange-500/10",
		borderColor: "border-orange-500/20",
	},
	// {
	// 	title: "Open Source Contributor",
	// 	subtitle: "Community Impact",
	// 	description:
	// 		"Active contributions to open-source projects, helping improve accessibility and user experience in web applications.",
	// 	icon: Award,
	// 	category: "Community",
	// 	year: "Ongoing",
	// 	impact: "Global Reach",
	// 	color: "text-green-500",
	// 	bgColor: "bg-green-500/10",
	// 	borderColor: "border-green-500/20",
	// },
	{
		title: "Project Leadership",
		subtitle: "Team Management",
		description: "Successfully led multiple development teams in delivering complex software projects on time and within budget.",
		icon: Crown,
		category: "Leadership",
		year: "2024",
		impact: "5+ Projects",
		color: "text-purple-500",
		bgColor: "bg-purple-500/10",
		borderColor: "border-purple-500/20",
	},
	{
		title: "Innovation Focus",
		subtitle: "Accessibility Advocate",
		description:
			"Specialized in creating inclusive, accessible web applications that serve users with diverse needs and abilities.",
		icon: Target,
		category: "Innovation",
		year: "2024-2025",
		impact: "Social Impact",
		color: "text-tech-teal",
		bgColor: "bg-tech-teal/10",
		borderColor: "border-tech-teal/20",
	},
]

export function AchievementsSection() {
	const { ref: sectionRef, isInView: sectionVisible } = useMotionAnimation()
	const { ref: achievementsGridRef, isInView: achievementsVisible } = useMotionAnimation()
	const { ref: statsRef, isInView: statsVisible } = useMotionAnimation()

	return (
		<motion.section
			id="achievements"
			className="section-padding bg-gradient-card"
			ref={sectionRef}
			variants={animationVariants.pageSection}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			transition={{
				duration: 0.7,
				delay: 0.7,
				ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
			}}
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
						Recognition
					</Badge>
					<h2 className="mb-6 bg-gradient-hero bg-clip-text text-transparent">
						Achievements & Leadership
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						A collection of achievements that reflect my commitment to excellence,
						innovation, and positive impact in technology and beyond.
					</p>
				</motion.div>

				{/* Featured Achievement */}
				<div
					className={`mb-12 reveal-up ${sectionVisible ? "animate-in" : ""}`}
					style={{ animationDelay: "0.3s" }}
				>
					<Card className="bg-gradient-hero text-white shadow-glow border-2 border-tech-teal/20 hover-lift transition-smooth">
						<CardContent className="p-8">
							<div className="flex flex-col md:flex-row items-center gap-6">
								<div className="flex-shrink-0">
									<div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
										<Trophy className="h-10 w-10 text-white" />
									</div>
								</div>
								<div className="text-center md:text-left flex-1">
									<div className="flex items-center justify-center md:justify-start gap-2 mb-2">
										<Badge
											variant="secondary"
											className="bg-white/20 text-white border-white/30"
										>
											Latest Achievement
										</Badge>
										<Badge
											variant="outline"
											className="border-white/30 text-white"
										>
											2025
										</Badge>
									</div>
									<h3 className="text-2xl md:text-3xl font-bold mb-2">
										INNOVA National Ideathon 2025
									</h3>
									<p className="text-xl text-white/90 mb-3">
										2nd Runner-up
									</p>
									<p className="text-white/80 leading-relaxed">
										National recognition for developing Readlle, an innovative
										accessibility-first
										learning platform that makes education more inclusive for
										students with dyslexia.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Achievements Grid */}
				<motion.div
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
					ref={achievementsGridRef}
					variants={animationVariants.staggerContainer}
					initial="hidden"
					animate={achievementsVisible ? "visible" : "hidden"}
				>
					{achievements.slice(1).map((achievement, index) => (
						<motion.div
							key={achievement.title}
							variants={animationVariants.staggerItem}
							transition={transitions.smooth}
							className="h-full"
						>
							<Card
								className={`hover-lift transition-smooth shadow-card border-2 ${achievement.bgColor} ${achievement.borderColor} h-full flex flex-col`}
							>
								<CardContent className="p-6 flex flex-col h-full">
									<div className="flex items-start gap-4 mb-4 flex-shrink-0">
										<div
											className={`p-3 rounded-xl ${achievement.bgColor} ${achievement.borderColor} border`}
										>
											<achievement.icon
												className={`h-6 w-6 ${achievement.color}`}
											/>
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-1">
												<Badge variant="outline" className="text-xs">
													{achievement.category}
												</Badge>
												<Badge variant="secondary" className="text-xs">
													{achievement.year}
												</Badge>
											</div>
											<h3 className="font-bold text-lg mb-1">
												{achievement.title}
											</h3>
											<p
												className={`font-semibold text-sm ${achievement.color} mb-2`}
											>
												{achievement.subtitle}
											</p>
										</div>
									</div>

									<p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
										{achievement.description}
									</p>

									<div className="flex items-center justify-between flex-shrink-0">
										<Badge
											variant="outline"
											className={`text-xs ${achievement.color} ${achievement.borderColor}`}
										>
											{achievement.impact}
										</Badge>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>

				{/* Statistics */}
				<motion.div
					className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
					ref={statsRef}
					variants={animationVariants.staggerContainer}
					initial="hidden"
					animate={statsVisible ? "visible" : "hidden"}
				>
					{[
						{ label: "Projects Completed", value: "15+", icon: Target },
						{ label: "Awards & Recognition", value: "6", icon: Trophy },
						{ label: "Years of Experience", value: "3+", icon: Star },
						{ label: "Technologies Mastered", value: "20+", icon: Award },
					].map((stat, index) => (
						<motion.div
							key={stat.label}
							variants={animationVariants.staggerItem}
							transition={transitions.smooth}
							className="h-full"
						>
							<Card className="text-center hover-scale transition-smooth shadow-card border-2 bg-gradient-card h-full">
								<CardContent className="p-6 h-full flex flex-col justify-center">
									<div className="w-12 h-12 mx-auto mb-3 bg-gradient-hero rounded-full flex items-center justify-center">
										<stat.icon className="h-6 w-6 text-white" />
									</div>
									<div className="text-2xl font-bold text-foreground mb-1">
										{stat.value}
									</div>
									<div className="text-sm text-muted-foreground">
										{stat.label}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	)
}