'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts'
import { 
  Activity, Users, AlertTriangle, CheckCircle, Brain, 
  Globe, Shield, TrendingUp, MapPin, MessageSquare, Menu, X
} from 'lucide-react'

// Mock Data based on DPR specifications
const kpiData = [
  { label: 'Total Population', value: '4.06 Cr', change: '+2.3%', icon: Users, color: 'text-primary-600' },
  { label: 'Health Workers', value: '50,800', change: '+15%', icon: CheckCircle, color: 'text-success' },
  { label: 'AI Predictions', value: '2.4M', change: '+94.2%', icon: Brain, color: 'text-tribal' },
  { label: 'Critical Alerts', value: '1,247', change: '-12%', icon: AlertTriangle, color: 'text-danger' },
]

const diseaseTrendData = [
  { month: 'Jan', predicted: 1200, actual: 1150, malaria: 450, tb: 320 },
  { month: 'Feb', predicted: 1400, actual: 1380, malaria: 520, tb: 340 },
  { month: 'Mar', predicted: 1800, actual: 1750, malaria: 680, tb: 380 },
  { month: 'Apr', predicted: 2200, actual: 2100, malaria: 850, tb: 420 },
  { month: 'May', predicted: 2600, actual: 2550, malaria: 980, tb: 450 },
  { month: 'Jun', predicted: 3100, actual: 3000, malaria: 1200, tb: 480 },
]

const districtData = [
  { name: 'Ranchi', cases: 2450, aiAccuracy: 94.2 },
  { name: 'East Singhbhum', cases: 2180, aiAccuracy: 92.8 },
  { name: 'Dhanbad', cases: 1950, aiAccuracy: 91.5 },
  { name: 'Khunti', cases: 1720, aiAccuracy: 93.1 },
  { name: 'Dumka', cases: 1580, aiAccuracy: 89.7 },
  { name: 'Gumla', cases: 1420, aiAccuracy: 90.3 },
  { name: 'Simdega', cases: 1280, aiAccuracy: 88.9 },
  { name: 'West Singhbhum', cases: 1150, aiAccuracy: 91.2 },
]

const tribalHealthData = [
  { name: 'Malaria', value: 35, color: '#ef4444' },
  { name: 'TB', value: 25, color: '#f59e0b' },
  { name: 'Anemia', value: 20, color: '#10b981' },
  { name: 'Malnutrition', value: 15, color: '#3b82f6' },
  { name: 'Others', value: 5, color: '#8b5cf6' },
]

const aiModels = [
  { name: 'Disease Outbreak Prediction', accuracy: 94.2, status: 'Active', lastUpdate: '2 hrs ago' },
  { name: 'Tribal Health Risk Assessment', accuracy: 91.8, status: 'Active', lastUpdate: '4 hrs ago' },
  { name: 'Maternal Health Monitoring', accuracy: 96.5, status: 'Active', lastUpdate: '1 hr ago' },
  { name: 'Financial Fraud Detection', accuracy: 98.1, status: 'Active', lastUpdate: '30 min ago' },
  { name: 'Hospital Performance Analytics', accuracy: 93.7, status: 'Training', lastUpdate: '6 hrs ago' },
  { name: 'Medicine Supply Chain', accuracy: 95.3, status: 'Active', lastUpdate: '3 hrs ago' },
]

const tribalLanguages = ['Santhali', 'Ho', 'Mundari', 'Kurukh', 'Khortha', 'Sadri', 'Hindi']

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">J-HIP</h1>
          <p className="text-gray-600">Loading Health Intelligence Platform...</p>
          <p className="text-sm text-gray-500 mt-2">AI Models Initializing</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary-600 to-tribal p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">J-HIP</h1>
                <p className="text-xs text-gray-500">Jharkhand Health Intelligence Platform</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-primary-500 focus:border-primary-500"
              >
                {tribalLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                <Shield className="h-4 w-4" />
                <span>DPDP Compliant</span>
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b px-4 py-4"
        >
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          >
            {tribalLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md">
            <Shield className="h-4 w-4" />
            <span>DPDP Compliant</span>
          </button>
        </motion.div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-primary-600 to-tribal rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Executive Dashboard</h2>
                <p className="text-primary-100 mb-4">AI-Enabled Health Intelligence for 4.06 Crore Citizens across 24 Districts</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Phase 1: 4 Districts</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">₹77.15 Cr Project</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">60 Months</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">94.2%</div>
                  <div className="text-primary-100">Average AI Accuracy</div>
                  <div className="text-sm text-primary-200 mt-1">Across 27 Use Cases</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                <span className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-sm text-gray-600">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Disease Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
              AI-Predicted vs Actual Disease Outbreaks
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={diseaseTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="predicted" stroke="#3b82f6" fill="#dbeafe" name="AI Predicted" />
                <Area type="monotone" dataKey="actual" stroke="#10b981" fill="#d1fae5" name="Actual Cases" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Tribal Health Priorities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-tribal" />
              Tribal Health Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tribalHealthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tribalHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap gap-2">
              {tribalLanguages.slice(0, 4).map(lang => (
                <span key={lang} className="px-2 py-1 bg-tribal/10 text-tribal rounded-md text-xs">
                  {lang}
                </span>
              ))}
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">+3 more</span>
            </div>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* District-wise Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary-600" />
              District-wise Case Distribution & AI Accuracy
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="cases" fill="#3b82f6" name="Cases" />
                <Bar yAxisId="right" dataKey="aiAccuracy" fill="#10b981" name="AI Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* HITL Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-success" />
              Human-in-the-Loop Protocol
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Critical Alerts Reviewed</div>
                  <div className="text-sm text-gray-600">Last 24 hours</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-success">1,247</div>
                  <div className="text-xs text-gray-500">100% Reviewed</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Pending Review</div>
                  <div className="text-sm text-gray-600">Requires attention</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-warning">23</div>
                  <div className="text-xs text-gray-500">&lt; 2 hrs SLA</div>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-primary-600" />
                  <span className="font-medium text-gray-900">AI Recommendation</span>
                </div>
                <p className="text-sm text-gray-700">
                  All critical alerts require Medical Officer verification before action as per Clinical AI Safety Board protocol.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Models Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-tribal" />
            AI Model Performance Monitor
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Model Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Accuracy</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Update</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Performance</th>
                </tr>
              </thead>
              <tbody>
                {aiModels.map((model, index) => (
                  <tr key={model.name} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{model.name}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${model.accuracy >= 95 ? 'text-success' : model.accuracy >= 90 ? 'text-primary-600' : 'text-warning'}`}>
                        {model.accuracy}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        model.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {model.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{model.lastUpdate}</td>
                    <td className="py-3 px-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${model.accuracy >= 95 ? 'bg-success' : model.accuracy >= 90 ? 'bg-primary-600' : 'bg-warning'}`}
                          style={{ width: `${model.accuracy}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>Jharkhand Health Intelligence Platform (J-HIP) | ₹77.15 Crore Digital Public Infrastructure</p>
          <p className="mt-1">State Data Centre (Ranchi) + IndiaAI Mission | DPDP Act 2023 Compliant | End-to-End Encrypted</p>
        </motion.div>
      </main>
    </div>
  )
}
