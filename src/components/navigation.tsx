import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

const navigationItems = [
	{ name: "About", href: "#about", type: "scroll" },
	{ name: "Projects", href: "#projects", type: "scroll" },
	{ name: "Experience", href: "#experience", type: "scroll" },
	{ name: "Skills", href: "#skills", type: "scroll" },
	{ name: "Contact", href: "#contact", type: "scroll" },
	{ name: "Blog", href: "/blog", type: "link" },
]

export function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const [mounted, setMounted] = useState(false)
	const location = useLocation()

	// Check if we're on the home page to enable smooth scrolling
	const isHomePage = location.pathname === "/"

	useEffect(() => {
		setMounted(true)

		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const scrollToSection = (href: string) => {
		if (!isHomePage) {
			// If not on home page, navigate to home first then scroll
			window.location.href = `/${href}`
			return
		}

		const element = document.querySelector(href)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
		setIsOpen(false)
	}

	const handleNavClick = (item: typeof navigationItems[0]) => {
		if (item.type === "scroll") {
			scrollToSection(item.href)
		} else {
			setIsOpen(false)
		}
	}

	return (
		<motion.nav
			className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
				scrolled
					? "bg-background/80 backdrop-blur-xl border-b shadow-card"
					: "bg-transparent"
			}`}
			initial={{ opacity: 0, y: -30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.8,
				delay: 0.1,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
		>
			<div className="container mx-auto container-padding">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						{/* <Link
							to="/"
							className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent hover-scale transition-smooth"
						>
							KD
						</Link> */}
						<Link
							to="/"
							className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent hover-scale transition-smooth"
						>
							<img
								src="/logo.png"
								alt="Logo"
								width={120}
								// height={80}
								className="rounded-full"
							/>
						</Link>

					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:block">
						<div className="flex items-center space-x-8">
							{navigationItems.map((item) =>
								item.type === "link" ? (
									<Link
										key={item.name}
										to={item.href}
										className={`transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-hero after:transition-all after:duration-300 hover:after:w-full ${
											scrolled
												? "text-foreground hover:text-primary"
												: "text-white hover:text-white/80"
										} ${
											location.pathname === item.href
												? "after:w-full"
												: ""
										}`}
									>
										{item.name}
									</Link>
								) : (
									<button
										key={item.name}
										onClick={() => handleNavClick(item)}
										className={`transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-hero after:transition-all after:duration-300 hover:after:w-full ${
											scrolled
												? "text-foreground hover:text-primary"
												: "text-white hover:text-white/80"
										}`}
									>
										{item.name}
									</button>
								)
							)}
							<ThemeToggle />
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center space-x-4">
						<ThemeToggle />
						<Button
							variant="outline"
							size="icon"
							onClick={() => setIsOpen(!isOpen)}
							className="border-2"
						>
							{isOpen ? <X size={20} /> : <Menu size={20} />}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-xl rounded-b-lg shadow-card">
							{navigationItems.map((item) =>
								item.type === "link" ? (
									<Link
										key={item.name}
										to={item.href}
										onClick={() => setIsOpen(false)}
										className={`block w-full text-left px-3 py-2 text-base font-medium hover:text-primary hover:bg-accent/50 rounded-md transition-smooth ${
											location.pathname === item.href
												? "text-primary bg-accent/50"
												: "text-foreground"
										}`}
									>
										{item.name}
									</Link>
								) : (
									<button
										key={item.name}
										onClick={() => handleNavClick(item)}
										className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-smooth"
									>
										{item.name}
									</button>
								)
							)}
						</div>
					</div>
				)}
			</div>
		</motion.nav>
	)
}