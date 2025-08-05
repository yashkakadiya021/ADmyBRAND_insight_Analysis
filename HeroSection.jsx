import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Sparkles,
  Zap,
  Award,
  BarChart3
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection({ keyMetrics }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const achievements = [
    { icon: Award, label: "Top Performer", color: "text-yellow-500" },
    { icon: Zap, label: "High Growth", color: "text-blue-500" },
    { icon: Sparkles, label: "Quality Leader", color: "text-purple-500" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
      
      <Card className="relative border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Side - Welcome & Stats */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Live Dashboard
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {currentTime.toLocaleTimeString()}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Welcome Back, Sudhanshu!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your campaigns are performing exceptionally well today. Here's your real-time overview.
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/40">
                      <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">Revenue</p>
                      <p className="text-xl font-bold text-green-900 dark:text-green-100">
                        {formatCurrency(keyMetrics.revenue.current)}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-800/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Users</p>
                      <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
                        {formatNumber(keyMetrics.users.current)}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-800/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40">
                      <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Conversions</p>
                      <p className="text-xl font-bold text-purple-900 dark:text-purple-100">
                        {formatNumber(keyMetrics.conversions.current)}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200/50 dark:border-orange-800/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/40">
                      <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Growth</p>
                      <p className="text-xl font-bold text-orange-900 dark:text-orange-100">
                        {keyMetrics.growth.current}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Achievements */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-muted-foreground">Today's Achievements:</span>
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-1"
                  >
                    <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                    <span className="text-xs font-medium">{achievement.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Visual Elements */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Central Circle */}
                <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                    <BarChart3 className="h-16 w-16 text-primary-foreground" />
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                  >
                    <TrendingUp className="h-6 w-6 text-white" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg"
                  >
                    <Users className="h-5 w-5 text-white" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      x: [0, 8, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute top-1/2 -right-6 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                  </motion.div>
                </div>

                {/* Background Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl scale-110 -z-10" />
              </motion.div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-between pt-6 border-t border-border/50"
          >
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Full Report
              </Button>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: {currentTime.toLocaleString()}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

