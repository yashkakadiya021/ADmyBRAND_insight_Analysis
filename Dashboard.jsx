import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import MetricCard from './MetricCard'
import DataTable from './DataTable'
import HeroSection from './HeroSection'
import StatsOverview from './StatsOverview'
import { DashboardSkeleton } from './LoadingSkeleton'
import { mockData, updateMetrics } from '@/lib/mockData'
import { formatCurrency, formatNumber, exportToCSV } from '@/lib/utils'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target,
  Download,
  RefreshCw,
  Calendar,
  Filter
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(mockData)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Set up real-time updates
    const interval = setInterval(() => {
      const updatedData = updateMetrics()
      setData(prev => ({ ...prev, ...updatedData }))
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      const updatedData = updateMetrics()
      setData(prev => ({ ...prev, ...updatedData }))
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    exportToCSV(data.campaigns, 'campaign-performance')
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Hero Section */}
      <HeroSection keyMetrics={data.keyMetrics} />

      {/* Stats Overview */}
      <StatsOverview />

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={data.keyMetrics.revenue.current}
          change={data.keyMetrics.revenue.change}
          trend={data.keyMetrics.revenue.trend}
          icon={DollarSign}
          format="currency"
          delay={0.1}
        />
        <MetricCard
          title="Active Users"
          value={data.keyMetrics.users.current}
          change={data.keyMetrics.users.change}
          trend={data.keyMetrics.users.trend}
          icon={Users}
          format="number"
          delay={0.2}
        />
        <MetricCard
          title="Conversions"
          value={data.keyMetrics.conversions.current}
          change={data.keyMetrics.conversions.change}
          trend={data.keyMetrics.conversions.trend}
          icon={Target}
          format="number"
          delay={0.3}
        />
        <MetricCard
          title="Growth Rate"
          value={data.keyMetrics.growth.current}
          change={data.keyMetrics.growth.change}
          trend={data.keyMetrics.growth.trend}
          icon={TrendingUp}
          format="percentage"
          delay={0.4}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Daily revenue over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.revenue}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).getDate()}
                    className="text-xs"
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    className="text-xs"
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Revenue']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Visitor distribution by source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="visitors"
                  >
                    {data.trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatNumber(value), 'Visitors']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* User Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Active vs new users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.users}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).getDate()}
                    className="text-xs"
                  />
                  <YAxis 
                    tickFormatter={(value) => formatNumber(value)}
                    className="text-xs"
                  />
                  <Tooltip 
                    formatter={(value, name) => [formatNumber(value), name]}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="activeUsers" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Active Users"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="newUsers" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    name="New Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey through conversion stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.conversions} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" tickFormatter={(value) => formatNumber(value)} />
                  <YAxis dataKey="stage" type="category" width={80} />
                  <Tooltip formatter={(value) => [formatNumber(value), 'Count']} />
                  <Bar dataKey="count" fill="#8884d8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Campaign Performance Table */}
      <DataTable 
        data={data.campaigns}
        title="Campaign Performance"
        description="Detailed performance metrics for all campaigns"
      />
    </motion.div>
  )
}

