import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import api from '../api/api';
import toast from 'react-hot-toast';
import { Activity, Search, Verified, TrendingUp } from 'lucide-react';

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('global'); // 'global' or 'personal'

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/items/stats?global=${timeRange === 'global'}`);
        setStats(res.data);
      } catch (err) {
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [timeRange]);

  // Colors for Donut Chart
  const COLORS = ['#0ea5e9', '#a855f7', '#f43f5e', '#22c55e', '#f59e0b', '#64748b'];

  if (loading || !stats) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
           <p className="text-gray-500 font-medium tracking-wide">Crunching data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
           <div>
             <h1 className="text-3xl font-bold text-gray-900 font-title mb-1 flex items-center gap-2">
               <TrendingUp className="text-primary-600" /> Intelligence Center
             </h1>
             <p className="text-gray-500">Track metrics and reporting activities</p>
           </div>
           
           <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex self-start">
             <button 
               onClick={() => setTimeRange('global')}
               className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${timeRange === 'global' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
             >
               Global Campus Data
             </button>
             <button 
               onClick={() => setTimeRange('personal')}
               className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${timeRange === 'personal' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
             >
               My Activity
             </button>
           </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Activity size={80} />
             </div>
             <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-1">Total Reported</p>
             <h2 className="text-4xl font-black text-gray-900 font-title">{stats.summary.totalLost + stats.summary.totalFound}</h2>
             <div className="mt-4 flex gap-4 text-sm font-medium">
               <span className="text-red-500">{stats.summary.totalLost} Lost</span>
               <span className="text-emerald-500">{stats.summary.totalFound} Found</span>
             </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 text-primary-600">
               <Verified size={80} />
             </div>
             <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-1">Resolutions</p>
             <h2 className="text-4xl font-black text-gray-900 font-title">{stats.summary.resolvedItems}</h2>
             <div className="mt-4 flex gap-4 text-sm font-medium">
               <span className="text-primary-600">Successfully matched</span>
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500">
               <Activity size={80} />
             </div>
             <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-1">Today's Activity</p>
             <h2 className="text-4xl font-black text-gray-900 font-title">{stats.summary.todayLost + stats.summary.todayFound}</h2>
             <div className="mt-4 flex gap-4 text-sm font-medium">
               <span className="text-red-500">{stats.summary.todayLost} Lost</span>
               <span className="text-emerald-500">{stats.summary.todayFound} Found</span>
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500">
               <Search size={80} />
             </div>
             <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-1">This Week</p>
             <h2 className="text-4xl font-black text-gray-900 font-title">{stats.summary.weekLost + stats.summary.weekFound}</h2>
             <div className="mt-4 flex gap-4 text-sm font-medium">
               <span className="text-red-500">{stats.summary.weekLost} Lost</span>
               <span className="text-emerald-500">{stats.summary.weekFound} Found</span>
             </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Donut Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 font-title">
              Item Categories
            </h3>
            <div className="h-72 w-full">
              {stats.categories.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.categories}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [value, name.toString().charAt(0).toUpperCase() + name.toString().slice(1)]}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" formatter={(value) => <span className="text-gray-600 font-medium capitalize ml-1">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">No data available</div>
              )}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 font-title">
              Weekly Report Trends
            </h3>
            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.last7Days} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} formatter={(value) => <span className="text-gray-600 font-medium capitalize ml-1">{value}</span>} />
                  <Bar dataKey="lost" name="Lost Items" fill="#ef4444" radius={[4, 4, 4, 4]} barSize={32} />
                  <Bar dataKey="found" name="Found Items" fill="#22c55e" radius={[4, 4, 4, 4]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AnalyticsPage;
