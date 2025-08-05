import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockData } from '@/lib/mockData'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  Target,
  Eye,
  MousePointer,
  Clock,
  Globe
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { motion } from 'framer-motion'

// Additional mock data for reports
const performanceMetrics = [
  { metric: 'Page Views', value: 125430, change: 12.5, period: 'vs last month' },
  { metric: 'Unique Visitors', value: 45230, change: 8.2, period: 'vs last month' },
  { metric: 'Bounce Rate', value: 32.1, change: -5.3, period: 'vs last month', isPercentage: true },
  { metric: 'Avg Session Duration', value: 245, change: 15.7, period: 'vs last month', isTime: true },
  { metric: 'Conversion Rate', value: 5.2, change: 7.3, period: 'vs last month', isPercentage: true },
  { metric: 'Revenue per Visitor', value: 18.75, change: 9.8, period: 'vs last month', isCurrency: true }
]

const channelPerformance = [
  { channel: 'Organic Search', visitors: 18500, revenue: 285000, roas: 4.2, color: '#8884d8' },
  { channel: 'Paid Search', visitors: 12300, revenue: 195000, roas: 3.8, color: '#82ca9d' },
  { channel: 'Social Media', visitors: 8900, revenue: 125000, roas: 3.1, color: '#ffc658' },
  { channel: 'Email Marketing', visitors: 3200, revenue: 89000, roas: 5.2, color: '#ff7300' },
  { channel: 'Direct Traffic', visitors: 2100, revenue: 67000, roas: 4.8, color: '#00ff88' }
]

const competitorAnalysis = [
  { subject: 'Market Share', A: 120, B: 110, fullMark: 150 },
  { subject: 'Brand Awareness', A: 98, B: 130, fullMark: 150 },
  { subject: 'Customer Satisfaction', A: 86, B: 99, fullMark: 150 },
  { subject: 'Digital Presence', A: 99, B: 85, fullMark: 150 },
  { subject: 'Innovation', A: 85, B: 90, fullMark: 150 },
  { subject: 'Pricing', A: 65, B: 85, fullMark: 150 }
]

const geographicData = [
  { region: 'North America', revenue: 425000, users: 18500, growth: 12.3 },
  { region: 'Europe', revenue: 285000, users: 12800, growth: 8.7 },
  { region: 'Asia Pacific', revenue: 195000, users: 9200, growth: 15.2 },
  { region: 'Latin America', revenue: 89000, users: 3800, growth: 22.1 },
  { region: 'Middle East & Africa', revenue: 67000, users: 2100, growth: 18.5 }
]

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedReport, setSelectedReport] = useState('overview')

  const formatMetricValue = (metric) => {
    if (metric.isCurrency) return formatCurrency(metric.value)
    if (metric.isPercentage) return formatPercentage(metric.value)
    if (metric.isTime) return `${Math.floor(metric.value / 60)}m ${metric.value % 60}s`
    return formatNumber(metric.value)
  }

  const getTrendIcon = (change) => {
    return change > 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and performance analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="competitive">Competitive</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                    {getTrendIcon(metric.change)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatMetricValue(metric)}</div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className={metric.change > 0 ? 'text-green-600' : 'text-red-600'}>
                        {metric.change > 0 ? '+' : ''}{formatPercentage(metric.change)}
                      </span>
                      <span>{metric.period}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Revenue & Traffic Trends */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend Analysis</CardTitle>
                <CardDescription>Monthly revenue performance with projections</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockData.revenue}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).getDate()} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#revenueGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Revenue by marketing channel</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelPerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="channel" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                    <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign ROI Analysis</CardTitle>
                <CardDescription>Return on investment by campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockData.campaigns}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}x`, 'ROAS']} />
                    <Bar dataKey="roas" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel Analysis</CardTitle>
                <CardDescription>User journey optimization insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockData.conversions} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis type="number" tickFormatter={(value) => formatNumber(value)} />
                    <YAxis dataKey="stage" type="category" width={80} />
                    <Tooltip formatter={(value) => [formatNumber(value), 'Count']} />
                    <Bar dataKey="count" fill="#ffc658" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Geographic Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Performance</CardTitle>
              <CardDescription>Revenue and user distribution by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((region, index) => (
                  <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Globe className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">{region.region}</h4>
                        <p className="text-sm text-muted-foreground">{formatNumber(region.users)} users</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(region.revenue)}</div>
                      <div className="text-sm text-green-600">+{formatPercentage(region.growth)} growth</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Analytics</CardTitle>
                <CardDescription>User distribution by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={mockData.devices}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="users"
                    >
                      {mockData.devices.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatNumber(value), 'Users']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Behavior Patterns</CardTitle>
                <CardDescription>Hourly activity distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockData.hourlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Competitive Tab */}
        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
              <CardDescription>Performance comparison with industry benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={competitorAnalysis}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 150]} />
                  <Radar name="Your Brand" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Competitor" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

