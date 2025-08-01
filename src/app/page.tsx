"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { MetricCard } from "@/components/ui/metric-card";
import { IngressEgressChart } from "@/components/ui/ingress-egress-chart";
import { 
  Calendar,
  ArrowDown,
  ArrowUp,
  Target,
  Database
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Security Dashboard</h1>
              <p className="text-slate-600 mt-1">Monitor your security metrics and network traffic</p>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Metrics Header with Tag */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                Data Source
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 -mt-4">
              <MetricCard
                title="Cost Savings (30 Days)"
                value="$6,286"
                change="+15%"
                changeType="positive"
                icon={Calendar}
              />
              <MetricCard
                title="Cost Savings (Annual)"
                value="$75,426"
                change="+18%"
                changeType="positive"
                icon={Calendar}
              />
              <MetricCard
                title="Input Data"
                value="1848 GB"
                change="-5%"
                changeType="negative"
                icon={ArrowDown}
              />
              <MetricCard
                title="Output Data"
                value="643 GB"
                change="+12%"
                changeType="positive"
                icon={ArrowUp}
              />
              <MetricCard
                title="Optimization Rate"
                value="65%"
                change="+8%"
                changeType="positive"
                icon={Target}
              />
            </div>

            {/* Charts Section */}
            <div className="w-full">
              <IngressEgressChart />
            </div>

            {/* Log Sources Table */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Log Sources Overview</h2>
              <p className="text-slate-600 mb-6">Daily volumes, costs, and optimization efficiency per source</p>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <div className="text-sm font-semibold text-slate-900">Source Name</div>
                  <div className="text-sm font-semibold text-slate-900">Daily Volume</div>
                  <div className="text-sm font-semibold text-slate-900">Monthly Volume</div>
                  <div className="text-sm font-semibold text-slate-900">Monthly Cost (Before Optimization)</div>
                  <div className="text-sm font-semibold text-slate-900">Optimized Volume</div>
                  <div className="text-sm font-semibold text-slate-900">Monthly Savings</div>
                  <div className="text-sm font-semibold text-slate-900">Reduction %</div>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="grid grid-cols-7 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                    <div className="text-sm text-slate-900 font-medium">Windows Event Logs</div>
                    <div className="text-sm text-slate-700">12.3 GB</div>
                    <div className="text-sm text-slate-700">369 GB</div>
                    <div className="text-sm text-red-600 font-medium">$1,845</div>
                    <div className="text-sm text-teal-600 font-medium">129 GB</div>
                    <div className="text-sm text-green-600 font-medium">$1,199</div>
                    <div className="text-sm text-brand-primary font-semibold">65%</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                    <div className="text-sm text-slate-900 font-medium">Linux Syslog Logs</div>
                    <div className="text-sm text-slate-700">10.8 GB</div>
                    <div className="text-sm text-slate-700">324 GB</div>
                    <div className="text-sm text-red-600 font-medium">$1,620</div>
                    <div className="text-sm text-teal-600 font-medium">104 GB</div>
                    <div className="text-sm text-green-600 font-medium">$1,102</div>
                    <div className="text-sm text-brand-primary font-semibold">68%</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                    <div className="text-sm text-slate-900 font-medium">AWS Logs</div>
                    <div className="text-sm text-slate-700">15.2 GB</div>
                    <div className="text-sm text-slate-700">456 GB</div>
                    <div className="text-sm text-red-600 font-medium">$2,280</div>
                    <div className="text-sm text-teal-600 font-medium">182 GB</div>
                    <div className="text-sm text-green-600 font-medium">$1,368</div>
                    <div className="text-sm text-brand-primary font-semibold">60%</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                    <div className="text-sm text-slate-900 font-medium">Entra ID Logs</div>
                    <div className="text-sm text-slate-700">8.7 GB</div>
                    <div className="text-sm text-slate-700">261 GB</div>
                    <div className="text-sm text-red-600 font-medium">$1,305</div>
                    <div className="text-sm text-teal-600 font-medium">78 GB</div>
                    <div className="text-sm text-green-600 font-medium">$914</div>
                    <div className="text-sm text-brand-primary font-semibold">70%</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                    <div className="text-sm text-slate-900 font-medium">Palo Alto Firewall Logs</div>
                    <div className="text-sm text-slate-700">14.6 GB</div>
                    <div className="text-sm text-slate-700">438 GB</div>
                    <div className="text-sm text-red-600 font-medium">$2,190</div>
                    <div className="text-sm text-teal-600 font-medium">149 GB</div>
                    <div className="text-sm text-green-600 font-medium">$1,445</div>
                    <div className="text-sm text-brand-primary font-semibold">66%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}