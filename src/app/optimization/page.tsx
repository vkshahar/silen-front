"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Target, TrendingUp, Zap, Shield, Database, BarChart3, AlertCircle, Search, Activity } from "lucide-react";

export default function OptimizationInitiatives() {
  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Optimization Initiatives</h1>
              <p className="text-slate-600 mt-1">Explore and implement advanced optimization strategies for your log data</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Optimization Cards - Vertical Layout */}
            <div className="space-y-6">
              
              {/* Remove Debug Logs Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Remove Debug Logs</h3>
                    <div className="mb-2">
                      <div className="text-4xl font-bold text-slate-900">15GB</div>
                      <div className="text-sm text-slate-500 uppercase tracking-wide">DAILY REDUCTION</div>
                    </div>
                  </div>
                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    Pending
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Action:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Filter out verbose debug logging from Windows Event logs to reduce noise and storage costs
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Reduction</div>
                    <div className="text-xl font-bold text-green-600">25.0%</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Security Impact</div>
                    <div className="text-xl font-bold text-slate-600">2/10</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Monthly Savings</div>
                    <div className="text-xl font-bold text-blue-600">$161.438</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    DEBUG 2025-01-07T12:00:00Z process_id=1234 thread_id=5678<br/>
                    module=authentication user_session=abc123<br/>
                    message="Debug: validating user credentials step 1 of 12"
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    Detected 15M debug entries in the last 24 hours.
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <AlertCircle className="w-4 h-4" />
                    Check Alerts
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <Search className="w-4 h-4" />
                    Check History
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors">
                    <Zap className="w-4 h-4" />
                    Implement
                  </button>
                </div>
              </div>

              {/* Turn logs into a metric Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Turn logs into a metric</h3>
                    <div className="mb-2">
                      <div className="text-4xl font-bold text-slate-900">1.2TB</div>
                      <div className="text-sm text-slate-500 uppercase tracking-wide">ANNUAL REDUCTION</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-brand-primary" />
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Action:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Convert logs with numerical patterns (response_time) into a metric. This reduces log volume by 80% while maintaining operational insight.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Volume Reduction</div>
                    <div className="text-xl font-bold text-green-600">80%</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Data Preserved</div>
                    <div className="text-xl font-bold text-slate-600">95%</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Monthly Savings</div>
                    <div className="text-xl font-bold text-blue-600">$2,845</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    INFO 2025-01-07T12:00:00Z request_id=abc123 user_id=user456<br/>
                    endpoint=/api/v1/orders status_code=200 response_time_ms=120<br/>
                    message="Request completed"
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    Detected 10M similar patterns in the last 24 hours.
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    Preview
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <Target className="w-4 h-4" />
                    Configure
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors">
                    <Zap className="w-4 h-4" />
                    Apply
                  </button>
                </div>
              </div>

              {/* Smart Compression Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Smart Compression</h3>
                    <div className="mb-2">
                      <div className="text-4xl font-bold text-slate-900">3.8TB</div>
                      <div className="text-sm text-slate-500 uppercase tracking-wide">ANNUAL REDUCTION</div>
                    </div>
                  </div>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Action:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Advanced algorithm optimizing compression based on log patterns and access frequency across all log sources.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Compression Rate</div>
                    <div className="text-xl font-bold text-green-600">65.2%</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Performance Impact</div>
                    <div className="text-xl font-bold text-slate-600">1/10</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Monthly Savings</div>
                    <div className="text-xl font-bold text-blue-600">$3,247</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    INFO 2025-01-07T12:00:00Z src=192.168.1.100 dst=10.0.0.5<br/>
                    protocol=TCP port=443 bytes_sent=1024 bytes_received=2048<br/>
                    status=established duration=120ms
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    Optimizing 25M network logs daily with adaptive compression.
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    View Stats
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <Target className="w-4 h-4" />
                    Configure
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-lg text-sm font-medium cursor-not-allowed">
                    <Shield className="w-4 h-4" />
                    Running
                  </button>
                </div>
              </div>

            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Optimization Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">$23,800</div>
                  <div className="text-sm text-slate-600">Total Monthly Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-primary mb-1">78%</div>
                  <div className="text-sm text-slate-600">Average Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
                  <div className="text-sm text-slate-600">Active Initiatives</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
                  <div className="text-sm text-slate-600">Upcoming Features</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}