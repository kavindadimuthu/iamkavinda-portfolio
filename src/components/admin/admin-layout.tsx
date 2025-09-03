import { ReactNode } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LayoutDashboard, FileText, Settings, LogOut, Menu, Home } from 'lucide-react'
import { motion } from 'framer-motion'

interface AdminLayoutProps {
  children: ReactNode
}

const sidebarItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  // { href: '/admin/blog/new', icon: FileText, label: 'New Post' },
]

function SidebarContent() {
  const location = useLocation()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-6 w-6" />
          {/* <span>Kavinda Dewmith</span> */}
          <img 
            src="logo-text-black.png" 
            alt="Kavinda Dewmith" 
            width={100}
            className='h-auto ml-4'
          />
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={location.pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link to={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
      
      <div className="border-t p-4">
        <div className='flex items-center justify-between space-x-2'>
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  // Redirect if not admin
  if (!loading && user?.email !== 'kavindadewmith@gmail.com') {
    navigate('/admin/auth')
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:bg-muted/30 md:border-r">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link to="/" className="font-semibold">
          Kavinda Dewmith
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}