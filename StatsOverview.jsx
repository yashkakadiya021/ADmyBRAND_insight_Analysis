import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { 
  TrendingUp, 
  TrendingDown,
  Eye,
  MousePointer,
  Clock,
  Zap,
  Target,
  Users,
  DollarSign,
  Activity,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'
import { motion } from 'framer-motion'

const liveMetrics = [
  {
    id: 'visitors',
    title: 'Live Visitors',
    value: 1247,
    change: 12.5,
    icon: Eye,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    isLive: true
  },
  {
    id: 'clicks',
    title: 'Clicks Today',
    value: 8934,
    change: 8.2,
    icon: MousePointer,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  {
    id: 'sessions',
    title: 'Avg. Session',
    value: 245,
    change: 15.7,
    icon: Clock,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    isTime: true
  },
  {
    id: 'engagement',
    title: 'Engagement Rate',
    value: 67.8,
    change: 5.3,
    icon: Zap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    isPercentage: true
  }
]

const performanceGoals = [
  {
    title: 'Monthly Revenue Goal',
    current: 847500,
    target: 1000000,
    icon: DollarSign,
    color: 'text-green-500'
  },
  {
    title: 'User Acquisition Goal',
    current: 45230,
    target: 50000,
    icon: Users,
    color: 'text-blue-500'
  },
  {
    title: 'Conversion Rate Goal',
    current: 5.2,
    target: 6.0,
    icon: Target,
    color: 'text-purple-500',
    isPercentage: true
  }
]

const deviceBreakdown = [
  { device: 'Desktop', percentage: 63.3, icon: Monitor, color: 'bg-blue-500' },
  { device: 'Mobile', percentage: 31.6, icon: Smartphone, color: 'bg-green-500' },
  { device: 'Tablet', percentage: 5.1, icon: Globe, color: 'bg-orange-500' }
]

export default function StatsOverview() {
  const [liveData, setLiveData] = useState(liveMetrics)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev.map(metric => ({
        ...metric,
        value: metric.isLive ? metric.value + Math.floor(Math.random() * 10 - 5) : metric.value
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatValue = (metric) => {
    if (metric.isTime) return `${Math.floor(metric.value / 60)}m ${metric.value % 60}s`
    if (metric.isPercentage) return `${metric.value}%`
    return formatNumber(metric.value)
  }

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Live Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {liveData.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`relative overflow-hidden ${metric.borderColor} hover:shadow-lg transition-all duration-300`}>
              <div className={`absolute inset-0 ${metric.bgColor} opacity-50`} />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-white/80 dark:bg-gray-800/80`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                {metric.isLive && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-2 right-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </motion.div>
                )}
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold">{formatValue(metric)}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant="secondary" 
                    className={`${metric.change > 0 ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'} border-0`}
                  >
                    {metric.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {Math.abs(metric.change)}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs yesterday</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Performance Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceGoals.map((goal, index) => {
              const percentage = getProgressPercentage(goal.current, goal.target)
              const isOnTrack = percentage >= 80
              
              return (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <goal.icon className={`h-5 w-5 ${goal.color}`} />
                      <span className="font-medium">{goal.title}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {goal.isPercentage ? `${goal.current}%` : formatNumber(goal.current)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        of {goal.isPercentage ? `${goal.target}%` : formatNumber(goal.target)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={percentage} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span className={isOnTrack ? 'text-green-600' : 'text-orange-600'}>
                        {percentage.toFixed(1)}% complete
                      </span>
                      <Badge variant={isOnTrack ? 'default' : 'secondary'} className="text-xs">
                        {isOnTrack ? 'On Track' : 'Needs Attention'}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Device Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Device Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceBreakdown.map((device, index) => (
                <motion.div
                  key={device.device}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className={`p-2 rounded-lg ${device.color} bg-opacity-10`}>
                    <device.icon className={`h-5 w-5 text-white`} style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{device.device}</span>
                      <span className="text-sm font-bold">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${device.percentage}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.2 }}
                        className={`h-2 rounded-full ${device.color}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

