"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { MetricCard } from "@/components/ui/metric-card";
import { IngressEgressChart } from "@/components/ui/ingress-egress-chart";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Activity,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Security Dashboard</h1>
              <p className="text-slate-600 mt-1">Monitor your security metrics and network traffic</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">Last updated</p>
                <p className="text-xs text-slate-500">2 minutes ago</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Threats Blocked"
                value="1,245"
                change="+12.5% from last week"
                changeType="positive"
                icon={Shield}
                description="Successfully blocked threats"
              />
              <MetricCard
                title="Critical Alerts"
                value="23"
                change="+5 from yesterday"
                changeType="negative"
                icon={AlertTriangle}
                description="Requiring immediate attention"
              />
              <MetricCard
                title="Active Users"
                value="156"
                change="No change"
                changeType="neutral"
                icon={Users}
                description="Currently online"
              />
              <MetricCard
                title="System Uptime"
                value="99.9%"
                change="+0.1% this month"
                changeType="positive"
                icon={Activity}
                description="Last 30 days"
              />
            </div>

            {/* Charts Section */}
            <div className="w-full">
              <IngressEgressChart />
            </div>

            {/* Additional Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Data Processed"
                value="2.4 TB"
                change="+15.3% from last month"
                changeType="positive"
                icon={TrendingUp}
                description="Total data processed"
              />
              <MetricCard
                title="Failed Login Attempts"
                value="89"
                change="-23% from last week"
                changeType="positive"
                icon={TrendingDown}
                description="Blocked unauthorized access"
              />
              <MetricCard
                title="Response Time"
                value="125ms"
                change="Stable"
                changeType="neutral"
                icon={Minus}
                description="Average API response time"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <Shield className="h-5 w-5 text-brand-primary mb-2" />
                  <p className="text-sm font-medium text-slate-900">Run Security Scan</p>
                  <p className="text-xs text-slate-500">Full system scan</p>
                </button>
                <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mb-2" />
                  <p className="text-sm font-medium text-slate-900">View Alerts</p>
                  <p className="text-xs text-slate-500">23 critical alerts</p>
                </button>
                <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <Users className="h-5 w-5 text-blue-500 mb-2" />
                  <p className="text-sm font-medium text-slate-900">Manage Users</p>
                  <p className="text-xs text-slate-500">156 active users</p>
                </button>
                <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <Activity className="h-5 w-5 text-green-500 mb-2" />
                  <p className="text-sm font-medium text-slate-900">System Status</p>
                  <p className="text-xs text-slate-500">All systems operational</p>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}