// Mock data for ADmyBRAND Insights Dashboard

// Generate realistic dates for the last 30 days
const generateDates = (days = 30) => {
  const dates = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split('T')[0])
  }
  return dates
}

// Generate realistic revenue data with growth trend
const generateRevenueData = () => {
  const dates = generateDates(30)
  const baseRevenue = 45000
  return dates.map((date, index) => ({
    date,
    revenue: Math.round(baseRevenue + (Math.random() * 15000) + (index * 500)),
    target: baseRevenue + (index * 600),
  }))
}

// Generate user analytics data
const generateUserData = () => {
  const dates = generateDates(30)
  const baseUsers = 12000
  return dates.map((date, index) => ({
    date,
    activeUsers: Math.round(baseUsers + (Math.random() * 3000) + (index * 100)),
    newUsers: Math.round(800 + (Math.random() * 400)),
    returningUsers: Math.round(2000 + (Math.random() * 800)),
  }))
}

// Generate conversion funnel data
const generateConversionData = () => [
  { stage: 'Visitors', count: 45230, percentage: 100 },
  { stage: 'Leads', count: 12450, percentage: 27.5 },
  { stage: 'Qualified', count: 6890, percentage: 15.2 },
  { stage: 'Customers', count: 2340, percentage: 5.2 },
]

// Generate traffic sources data
const generateTrafficSources = () => [
  { source: 'Organic Search', visitors: 18500, percentage: 41.2, color: '#8884d8' },
  { source: 'Direct', visitors: 12300, percentage: 27.4, color: '#82ca9d' },
  { source: 'Social Media', visitors: 8900, percentage: 19.8, color: '#ffc658' },
  { source: 'Email', visitors: 3200, percentage: 7.1, color: '#ff7300' },
  { source: 'Referral', visitors: 2100, percentage: 4.7, color: '#00ff88' },
]

// Generate device analytics
const generateDeviceData = () => [
  { device: 'Desktop', users: 28500, percentage: 63.3, color: '#8884d8' },
  { device: 'Mobile', users: 14200, percentage: 31.6, color: '#82ca9d' },
  { device: 'Tablet', users: 2300, percentage: 5.1, color: '#ffc658' },
]

// Generate campaign performance data
const generateCampaignData = () => [
  {
    id: 1,
    name: 'Summer Sale 2024',
    status: 'Active',
    impressions: 125000,
    clicks: 8500,
    conversions: 340,
    spend: 12500,
    revenue: 45600,
    ctr: 6.8,
    cpc: 1.47,
    roas: 3.65,
  },
  {
    id: 2,
    name: 'Brand Awareness Q4',
    status: 'Active',
    impressions: 89000,
    clicks: 4200,
    conversions: 180,
    spend: 8900,
    revenue: 28400,
    ctr: 4.7,
    cpc: 2.12,
    roas: 3.19,
  },
  {
    id: 3,
    name: 'Holiday Promotion',
    status: 'Paused',
    impressions: 156000,
    clicks: 12300,
    conversions: 520,
    spend: 18700,
    revenue: 67800,
    ctr: 7.9,
    cpc: 1.52,
    roas: 3.63,
  },
  {
    id: 4,
    name: 'Product Launch',
    status: 'Completed',
    impressions: 78000,
    clicks: 5600,
    conversions: 290,
    spend: 9800,
    revenue: 34500,
    ctr: 7.2,
    cpc: 1.75,
    roas: 3.52,
  },
]

// Generate hourly performance data for today
const generateHourlyData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  return hours.map(hour => ({
    hour: `${hour.toString().padStart(2, '0')}:00`,
    visitors: Math.round(800 + Math.random() * 400 + Math.sin(hour / 24 * Math.PI * 2) * 200),
    conversions: Math.round(15 + Math.random() * 10 + Math.sin(hour / 24 * Math.PI * 2) * 5),
  }))
}

// Key metrics for dashboard cards
export const keyMetrics = {
  revenue: {
    current: 847500,
    previous: 782300,
    change: 8.3,
    trend: 'up',
  },
  users: {
    current: 45230,
    previous: 41800,
    change: 8.2,
    trend: 'up',
  },
  conversions: {
    current: 2340,
    previous: 2180,
    change: 7.3,
    trend: 'up',
  },
  growth: {
    current: 12.5,
    previous: 9.8,
    change: 2.7,
    trend: 'up',
  },
}

// Export all mock data
export const mockData = {
  revenue: generateRevenueData(),
  users: generateUserData(),
  conversions: generateConversionData(),
  trafficSources: generateTrafficSources(),
  devices: generateDeviceData(),
  campaigns: generateCampaignData(),
  hourlyPerformance: generateHourlyData(),
  keyMetrics,
}

// Utility function to simulate real-time updates
export const updateMetrics = () => {
  // Simulate small changes in real-time metrics
  keyMetrics.users.current += Math.round((Math.random() - 0.5) * 20)
  keyMetrics.conversions.current += Math.round((Math.random() - 0.5) * 5)
  
  // Update hourly data with new values
  const hourlyData = generateHourlyData()
  mockData.hourlyPerformance = hourlyData
  
  return { keyMetrics, hourlyPerformance: hourlyData }
}

