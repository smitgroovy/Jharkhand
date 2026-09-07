'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Brain, 
  ShieldCheck, 
  Hospital, 
  TrendingUp,
  MapPin,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Languages,
  Mic,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn } from '../utils/cn';

// Mock Data
const dashboardStats = [
  { title: 'Total Population Covered', value: '4.06 Cr', change: '+2.3%', icon: Users, color: 'text-primary-600' },
  { title: 'Active Health Workers', value: '50,800', change: '+5.1%', icon: Activity, color: 'text-success' },
  { title: 'AI Predictions Today', value: '12,450', change: '+18.7%', icon: Brain, color: 'text-accent-600' },
  { title: 'Critical Alerts', value: '23', change: '-12.4%', icon: AlertCircle, color: 'text-danger' },
];

const districtData = [
  { name: 'Ranchi', cases: 1240, predicted: 980, trend: 'up' },
  { name: 'East Singhbhum', cases: 1180, predicted: 1050, trend: 'stable' },
  { name: 'Khunti', cases: 890, predicted: 720, trend: 'down' },
  { name: 'Dumka', cases: 760, predicted: 680, trend: 'down' },
  { name: 'West Singhbhum', cases: 650, predicted: 590, trend: 'stable' },
  { name: 'Hazaribagh', cases: 580, predicted: 520, trend: 'down' },
  { name: 'Palamu', cases: 520, predicted: 480, trend: 'stable' },
  { name: 'Giridih', cases: 490, predicted: 450, trend: 'down' },
];

const diseaseTrendData = [
  { month: 'Jan', Malaria: 120, TB: 85, Anemia: 340, Diarrhea: 95 },
  { month: 'Feb', Malaria: 135, TB: 88, Anemia: 355, Diarrhea: 102 },
  { month: 'Mar', Malaria: 158, TB: 92, Anemia: 368, Diarrhea: 118 },
  { month: 'Apr', Malaria: 195, TB: 95, Anemia: 382, Diarrhea: 145 },
  { month: 'May', Malaria: 245, TB: 98, Anemia: 395, Diarrhea: 178 },
  { month: 'Jun', Malaria: 320, TB: 102, Anemia: 410, Diarrhea: 225 },
  { month: 'Jul', Malaria: 425, TB: 108, Anemia: 425, Diarrhea: 285 },
  { month: 'Aug', Malaria: 380, TB: 112, Anemia: 438, Diarrhea: 265 },
  { month: 'Sep', Malaria: 295, TB: 115, Anemia: 445, Diarrhea: 198 },
  { month: 'Oct', Malaria: 210, TB: 118, Anemia: 452, Diarrhea: 145 },
  { month: 'Nov', Malaria: 165, TB: 120, Anemia: 458, Diarrhea: 112 },
  { month: 'Dec', Malaria: 138, TB: 122, Anemia: 465, Diarrhea: 98 },
];

const tribalHealthData = [
  { condition: 'Anemia', percentage: 42, priority: 'critical' },
  { condition: 'Malaria', percentage: 28, priority: 'high' },
  { condition: 'TB', percentage: 18, priority: 'medium' },
  { condition: 'Malnutrition', percentage: 35, priority: 'critical' },
  { condition: 'Diarrhea', percentage: 22, priority: 'high' },
];

const aiUseCases = [
  { name: 'Outbreak Prediction', status: 'active', accuracy: '94.2%', impact: 'High' },
  { name: 'Risk Stratification', status: 'active', accuracy: '91.8%', impact: 'High' },
  { name: 'CDSS Support', status: 'active', accuracy: '89.5%', impact: 'Medium' },
  { name: 'Fraud Detection', status: 'active', accuracy: '96.3%', impact: 'High' },
  { name: 'Resource Optimization', status: 'training', accuracy: 'N/A', impact: 'Medium' },
  { name: 'Voice Assistant', status: 'active', accuracy: '87.4%', impact: 'Low' },
];

const COLORS = ['#0ea5e9', '#d946ef', '#10b981', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'population', label: 'Population Health', icon: Users },
    { id: 'tribal', label: 'Tribal Health', icon: MapPin },
    { id: 'clinical', label: 'Clinical CDSS', icon: Brain },
    { id: 'financial', label: 'Financial Integrity', icon: ShieldCheck },
    { id: 'hospital', label: 'Hospital Performance', icon: Hospital },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading J-HIP Platform</h2>
          <p className="text-gray-500 mt-2">Initializing AI models and data streams...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-800">J-HIP</h1>
              <p className="text-xs text-gray-500">Health Intelligence</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                activeTab === item.id
                  ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {activeTab === item.id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Languages className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Multilingual AI</span>
            </div>
            <p className="text-xs text-gray-600">Santhali, Ho, Mundari, Kurukh, Khortha, Sadri, Hindi</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg text-gray-800">J-HIP</h1>
                    <p className="text-xs text-gray-500">Health Intelligence</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                      activeTab === item.id
                        ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {navItems.find(item => item.id === activeTab)?.label}
                </h1>
                <p className="text-sm text-gray-500">
                  Real-time health intelligence across 24 districts
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search districts, facilities..." 
                  className="bg-transparent border-none outline-none text-sm w-48"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-xl">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Report</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {dashboardStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    'text-sm font-medium px-2 py-1 rounded-lg',
                    stat.change.startsWith('+') 
                      ? 'text-success bg-green-50' 
                      : 'text-danger bg-red-50'
                  )}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Disease Trend Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Disease Outbreak Trends</h3>
                  <p className="text-sm text-gray-500">AI-predicted vs Actual cases across Jharkhand</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
                    Malaria
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="w-3 h-3 bg-accent-500 rounded-full"></span>
                    TB
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={diseaseTrendData}>
                  <defs>
                    <linearGradient id="colorMalaria" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                    }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="Malaria" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorMalaria)" />
                  <Area type="monotone" dataKey="TB" stroke="#d946ef" fillOpacity={1} fill="url(#colorTB)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* District Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">District-wise Case Distribution</h3>
                  <p className="text-sm text-gray-500">Top 8 districts by active cases</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={districtData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={11} width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                    }} 
                  />
                  <Bar dataKey="cases" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
                  <Bar dataKey="predicted" fill="#d946ef" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Tribal Health Priorities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Tribal Health Priorities</h3>
                <p className="text-sm text-gray-500">Critical conditions in tribal blocks</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={tribalHealthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="percentage"
                  >
                    {tribalHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {tribalHealthData.map((item, index) => (
                  <div key={item.condition} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index] }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.condition}</span>
                    </div>
                    <span className={cn(
                      'text-sm font-medium px-2 py-0.5 rounded-lg',
                      item.priority === 'critical' ? 'bg-red-100 text-red-700' :
                      item.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    )}>
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Use Cases Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">AI Use Cases Status</h3>
                  <p className="text-sm text-gray-500">27 AI models across 5 pillars</p>
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                  View All <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {aiUseCases.map((useCase, index) => (
                  <motion.div
                    key={useCase.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        useCase.status === 'active' ? 'bg-green-100' : 'bg-yellow-100'
                      )}>
                        {useCase.status === 'active' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{useCase.name}</h4>
                        <p className="text-sm text-gray-500">Impact: {useCase.impact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'px-2 py-1 rounded-lg text-sm font-medium',
                          useCase.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        )}>
                          {useCase.status === 'active' ? 'Active' : 'Training'}
                        </span>
                        {useCase.accuracy !== 'N/A' && (
                          <span className="text-sm font-semibold text-gray-700">{useCase.accuracy}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Critical Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-danger" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Critical AI Alerts</h3>
                  <p className="text-sm text-gray-500">Requires immediate human review (HITL Protocol)</p>
                </div>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All Alerts
              </button>
            </div>
            <div className="space-y-3">
              {[
                { location: 'Khunti District', type: 'Malaria Outbreak Risk', confidence: '96.2%', priority: 'Critical' },
                { location: 'East Singhbhum', type: 'Anomaly in PM-JAY Claims', confidence: '94.8%', priority: 'High' },
                { location: 'Dumka Tribal Block', type: 'Severe Anemia Cluster Detected', confidence: '92.1%', priority: 'High' },
              ].map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{alert.type}</h4>
                      <p className="text-sm text-gray-600">{alert.location} • AI Confidence: {alert.confidence}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'px-3 py-1 rounded-lg text-sm font-medium',
                      alert.priority === 'Critical' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
                    )}>
                      {alert.priority}
                    </span>
                    <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border transition-colors">
                      Review
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>J-HIP v1.0 • AI-Enabled State Health Intelligence Platform</p>
            <p className="mt-1">Built for Government of Jharkhand • 4.06 Crore Citizens • 24 Districts</p>
            <p className="mt-1 text-xs">All AI outputs are advisory only • Human-in-the-Loop (HITL) protocol enforced</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
