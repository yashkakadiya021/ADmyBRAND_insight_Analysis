import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber, formatPercentage, getTrendInfo } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  format = 'number',
  className = '',
  delay = 0 
}) {
  const trendInfo = getTrendInfo(change)
  
  const formatValue = (val) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val)
      case 'percentage':
        return formatPercentage(val)
      case 'number':
      default:
        return formatNumber(val)
    }
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold tracking-tight">
                {formatValue(value)}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant="secondary" 
                  className={`${trendInfo.bgColor} ${trendInfo.color} border-0`}
                >
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {formatPercentage(Math.abs(change))}
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 pointer-events-none" />
      </Card>
    </motion.div>
  )
}

