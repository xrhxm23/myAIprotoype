import React from 'react';
import { Calendar, Users, BookOpen, Brain, TrendingUp, CheckCircle } from 'lucide-react';

const stats = [
  { name: 'Active Classes', value: '24', icon: Calendar, color: 'bg-blue-500' },
  { name: 'Teachers', value: '156', icon: Users, color: 'bg-green-500' },
  { name: 'Subjects', value: '48', icon: BookOpen, color: 'bg-purple-500' },
  { name: 'AI Accuracy', value: '94%', icon: Brain, color: 'bg-orange-500' },
];

const nepCompliance = [
  { feature: 'Multidisciplinary Integration', status: 'active', percentage: 92 },
  { feature: 'Art Education Priority', status: 'active', percentage: 88 },
  { feature: 'Physical Education Balance', status: 'active', percentage: 95 },
  { feature: 'Value-based Learning', status: 'active', percentage: 90 },
  { feature: 'Flexible Assessment', status: 'active', percentage: 85 },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">AI-powered NEP 2020 compliant timetable management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NEP 2020 Compliance */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">NEP 2020 Compliance</h2>
          </div>
          <div className="space-y-4">
            {nepCompliance.map((item) => (
              <div key={item.feature} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.feature}</span>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent AI Generations */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Brain className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Recent AI Generations</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Class 10-A Timetable</p>
                <p className="text-sm text-gray-600">Generated 2 hours ago</p>
              </div>
              <div className="text-green-600 font-medium">95% AI Score</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Class 9-B Timetable</p>
                <p className="text-sm text-gray-600">Generated 5 hours ago</p>
              </div>
              <div className="text-blue-600 font-medium">92% AI Score</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Class 8-C Timetable</p>
                <p className="text-sm text-gray-600">Generated 1 day ago</p>
              </div>
              <div className="text-purple-600 font-medium">89% AI Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Ready to generate a new timetable?</h3>
            <p className="text-blue-100 mt-1">Use our AI-powered system for NEP 2020 compliant scheduling</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Start AI Generation
          </button>
        </div>
      </div>
    </div>
  );
}