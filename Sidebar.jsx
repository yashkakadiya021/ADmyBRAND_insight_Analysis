import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Settings,
  FileText,
  Home,
  Activity
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

const stats = [
  {
    name: 'Revenue',
    icon: DollarSign,
    color: 'text-green-500',
  },
  {
    name: 'Users',
    icon: Users,
    color: 'text-blue-500',
  },
  {
    name: 'Growth',
    icon: TrendingUp,
    color: 'text-purple-500',
  },
  {
    name: 'Activity',
    icon: Activity,
    color: 'text-orange-500',
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card/50 backdrop-blur">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <PieChart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold">Analytics</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-secondary text-secondary-foreground'
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="mt-8">
          <h3 className="mb-2 px-3 text-sm font-medium text-muted-foreground">
            Quick Stats
          </h3>
          <div className="space-y-1">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
              >
                <stat.icon className={cn('h-4 w-4', stat.color)} />
                <span className="text-muted-foreground">{stat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

