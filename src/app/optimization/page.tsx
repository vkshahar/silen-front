"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { MetricCard } from "@/components/ui/metric-card";
import { QuickActionsDropdown } from "@/components/ui/dropdown-menu-demo";
import { Target, TrendingUp, Zap, Shield, Database, BarChart3, AlertCircle, Search, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OptimizationInitiatives() {
  const router = useRouter();
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
            
            {/* Optimization Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Savings"
                value="$6,253"
                change="+24%"
                changeType="positive"
                icon={TrendingUp}
              />
              <MetricCard
                title="Average Reduction Rate"
                value="56.7%"
                change="+12%"
                changeType="positive"
                icon={Target}
              />
              <MetricCard
                title="Recommended Optimizations"
                value="6"
                changeType="neutral"
                icon={Database}
              />
              <MetricCard
                title="Active filters"
                value="2"
                changeType="positive"
                icon={BarChart3}
              />
            </div>
            
            {/* Manage Active Filters Button */}
            <div className="flex justify-start">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/filters')}
                className="text-sm border-surface-border bg-white text-slate-700 hover:bg-surface-secondary"
              >
                Manage active filters
              </Button>
            </div>
            
            {/* Optimization Cards - 3 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Remove Debug Logs Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col relative">
                <QuickActionsDropdown />
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-slate-600">Remove Debug Logs</div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-8">
                      Windows Event Logs
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">15GB</div>
                  <div className="text-sm text-slate-500">Daily reduction</div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Filter out verbose debug logging from Windows Event logs to reduce noise and storage costs
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                    25% reduction
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
                    $161/month
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200">
                    Low risk
                  </span>
                </div>

                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    DEBUG 2025-01-07T12:00:00Z process_id=1234<br/>
                    module=auth message="Debug step 1 of 12"
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors mt-auto">
                  Apply
                </button>
              </div>

              {/* Turn logs into a metric Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col relative">
                <QuickActionsDropdown />
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-slate-600">Turn logs into a metric</div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-8">
                      All Log Sources
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">1.2TB</div>
                  <div className="text-sm text-slate-500">Annual reduction</div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Convert logs with numerical patterns (response_time) into a metric. This reduces log volume by 80% while maintaining operational insight.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                    80% reduction
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
                    $2,845/month
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200">
                    No risk
                  </span>
                </div>

                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    INFO request_id=abc123 endpoint=/api/v1/orders<br/>
                    status_code=200 response_time_ms=120
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors mt-auto">
                  Apply
                </button>
              </div>

              {/* Smart Compression Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col relative">
                <QuickActionsDropdown />
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-slate-600">Smart Compression</div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-8">
                      Linux Syslogs
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">3.8TB</div>
                  <div className="text-sm text-slate-500">Annual reduction</div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Advanced algorithm optimizing compression based on log patterns and access frequency across all log sources.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                    65% reduction
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
                    $3,247/month
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200">
                    Low impact
                  </span>
                </div>

                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    INFO src=192.168.1.100 dst=10.0.0.5<br/>
                    protocol=TCP port=443 bytes_sent=1024
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors mt-auto">
                  Apply
                </button>
              </div>

              {/* Log Retention Policy Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col relative">
                <QuickActionsDropdown />
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-slate-600">Log Retention Policy</div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-8">
                      Application Logs
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">2.1TB</div>
                  <div className="text-sm text-slate-500">Annual reduction</div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Implement intelligent retention policies that automatically archive old logs while preserving critical data for compliance.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                    45% reduction
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
                    $1,892/month
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200">
                    Medium risk
                  </span>
                </div>

                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    INFO 2025-01-07T12:00:00Z user_id=456<br/>
                    action=login status=success retention=90d
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors mt-auto">
                  Apply
                </button>
              </div>

              {/* Error Log Aggregation Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col relative">
                <QuickActionsDropdown />
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-slate-600">Error Log Aggregation</div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-8">
                      Error Logs
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">850GB</div>
                  <div className="text-sm text-slate-500">Annual reduction</div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Consolidate repetitive error messages into aggregated alerts while maintaining visibility into critical issues.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                    70% reduction
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
                    $1,156/month
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200">
                    Low risk
                  </span>
                </div>

                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    ERROR 2025-01-07T12:00:00Z code=500<br/>
                    message="Database connection timeout" count=127
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors mt-auto">
                  Apply
                </button>
              </div>

              {/* Performance Log Sampling Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col relative">
                <QuickActionsDropdown />
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-slate-600">Performance Log Sampling</div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-8">
                      Performance Logs
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">1.5TB</div>
                  <div className="text-sm text-slate-500">Annual reduction</div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Implement intelligent sampling for performance metrics, capturing representative data while reducing volume by 60%.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                    60% reduction
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
                    $2,134/month
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200">
                    No risk
                  </span>
                </div>

                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Sample</h4>
                  <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                    PERF 2025-01-07T12:00:00Z endpoint=/api/users<br/>
                    response_time=45ms memory_usage=128MB sample_rate=0.1
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors mt-auto">
                  Apply
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}