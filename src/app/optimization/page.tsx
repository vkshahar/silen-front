"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { MetricCard } from "@/components/ui/metric-card";
import { QuickActionsDropdown } from "@/components/ui/dropdown-menu-demo";
import { Target, TrendingUp, Zap, Shield, Database, BarChart3, AlertCircle, Search, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SelectorChips } from "@/components/ui/selector-chips";
import { useState, useMemo } from "react";

interface OptimizationCard {
  id: string;
  title: string;
  source: string;
  volume: string;
  period: string;
  description: string;
  reduction: string;
  savings: string;
  risk: string;
  sample: { line1: string; line2: string };
  buttonText: string;
  buttonDisabled?: boolean;
}

export default function OptimizationInitiatives() {
  const router = useRouter();
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  const optimizationCards: OptimizationCard[] = [
    {
      id: "remove-debug-logs",
      title: "Remove Debug Logs",
      source: "Windows Event Logs",
      volume: "15GB",
      period: "Daily reduction",
      description: "Filter out verbose debug logging from Windows Event logs to reduce noise and storage costs",
      reduction: "25% reduction",
      savings: "$161/month",
      risk: "Low risk",
      sample: {
        line1: "DEBUG 2025-01-07T12:00:00Z process_id=1234",
        line2: "module=auth message=\"Debug step 1 of 12\""
      },
      buttonText: "Apply"
    },
    {
      id: "logs-to-metric",
      title: "Turn logs into a metric",
      source: "All Log Sources",
      volume: "1.2TB",
      period: "Annual reduction",
      description: "Convert logs with numerical patterns (response_time) into a metric. This reduces log volume by 80% while maintaining operational insight.",
      reduction: "80% reduction",
      savings: "$2,845/month",
      risk: "Low risk",
      sample: {
        line1: "INFO request_id=abc123 endpoint=/api/v1/orders",
        line2: "status_code=200 response_time_ms=120"
      },
      buttonText: "Apply"
    },
    {
      id: "smart-compression",
      title: "Smart Compression",
      source: "Linux Syslogs",
      volume: "3.8TB",
      period: "Annual reduction",
      description: "Advanced algorithm optimizing compression based on log patterns and access frequency across all log sources.",
      reduction: "65% reduction",
      savings: "$3,247/month",
      risk: "Low risk",
      sample: {
        line1: "INFO src=192.168.1.100 dst=10.0.0.5",
        line2: "protocol=TCP port=443 bytes_sent=1024"
      },
      buttonText: "Apply"
    },
    {
      id: "log-retention-policy",
      title: "Log Retention Policy",
      source: "Application Logs",
      volume: "2.1TB",
      period: "Annual reduction",
      description: "Implement intelligent retention policies that automatically archive old logs while preserving critical data for compliance.",
      reduction: "45% reduction",
      savings: "$1,892/month",
      risk: "Medium risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z user_id=456",
        line2: "action=login status=success retention=90d"
      },
      buttonText: "Apply"
    },
    {
      id: "error-log-aggregation",
      title: "Error Log Aggregation",
      source: "Error Logs",
      volume: "850GB",
      period: "Annual reduction",
      description: "Consolidate repetitive error messages into aggregated alerts while maintaining visibility into critical issues.",
      reduction: "70% reduction",
      savings: "$1,156/month",
      risk: "Medium risk",
      sample: {
        line1: "ERROR 2025-01-07T12:00:00Z code=500",
        line2: "message=\"Database connection timeout\" count=127"
      },
      buttonText: "Apply"
    },
    {
      id: "performance-log-sampling",
      title: "Performance Log Sampling",
      source: "Performance Logs",
      volume: "1.5TB",
      period: "Annual reduction",
      description: "Implement intelligent sampling for performance metrics, capturing representative data while reducing volume by 60%.",
      reduction: "60% reduction",
      savings: "$2,134/month",
      risk: "Low risk",
      sample: {
        line1: "PERF 2025-01-07T12:00:00Z endpoint=/api/users",
        line2: "response_time=45ms memory_usage=128MB sample_rate=0.1"
      },
      buttonText: "Apply"
    },
    {
      id: "data-masking",
      title: "Sensitive Data Masking",
      source: "Security Logs",
      volume: "2.8TB",
      period: "Annual reduction",
      description: "Automatically mask or redact sensitive information while maintaining log structure for analysis and compliance requirements.",
      reduction: "35% reduction",
      savings: "$1,589/month",
      risk: "High risk",
      sample: {
        line1: "INFO user=john.doe@company.com action=login",
        line2: "ip=192.168.1.100 session_id=abc123def456"
      },
      buttonText: "Apply"
    },
    {
      id: "schema-normalization",
      title: "Log Schema Normalization",
      source: "Mixed Sources",
      volume: "4.2TB",
      period: "Annual reduction",
      description: "Standardize log formats across different systems to reduce redundancy and improve compression efficiency.",
      reduction: "50% reduction",
      savings: "$2,987/month",
      risk: "High risk",
      sample: {
        line1: "NORM 2025-01-07T12:00:00Z src=webserver",
        line2: "event=request method=GET path=/api/health"
      },
      buttonText: "Apply"
    }
  ];

  const filteredCards = useMemo(() => {
    if (selectedRisks.length === 0) {
      return optimizationCards;
    }
    return optimizationCards.filter(card => selectedRisks.includes(card.risk));
  }, [selectedRisks]);

  const getRiskTagColors = (risk: string) => {
    const lowerRisk = risk.toLowerCase();
    if (lowerRisk.includes('low')) {
      return "bg-green-50 text-green-700 border-green-200";
    } else if (lowerRisk.includes('medium')) {
      return "bg-orange-50 text-orange-700 border-orange-200";
    } else if (lowerRisk.includes('high')) {
      return "bg-red-50 text-red-700 border-red-200";
    }
    return "bg-slate-50 text-slate-700 border-slate-200";
  };
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
                value="8"
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
            
            {/* Risk Filter Chips */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Filter by Risk Level</h3>
                  <p className="text-sm text-slate-600">Select risk levels to filter optimization strategies</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push('/filters')}
                  className="text-sm border-surface-border bg-white text-slate-700 hover:bg-surface-secondary"
                >
                  Manage active filters
                </Button>
              </div>
              <SelectorChips 
                options={["Low risk", "Medium risk", "High risk"]}
                onChange={setSelectedRisks}
              />
            </div>
            
            {/* Optimization Cards - Dynamic 3 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <div key={card.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col relative">
                  <QuickActionsDropdown />
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-slate-600">{card.title}</div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-8">
                        {card.source}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">{card.volume}</div>
                    <div className="text-sm text-slate-500">{card.period}</div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {card.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                      {card.reduction}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
                      {card.savings}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border ${getRiskTagColors(card.risk)}`}>
                      {card.risk}
                    </span>
                  </div>

                  <div className="mb-6 flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Sample</h4>
                    <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-600">
                      {card.sample.line1}<br/>
                      {card.sample.line2}
                    </div>
                  </div>

                  <button 
                    className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors mt-auto ${
                      card.buttonDisabled 
                        ? 'bg-slate-100 text-slate-500 cursor-not-allowed' 
                        : 'bg-brand-primary text-white hover:bg-brand-dark'
                    }`}
                    disabled={card.buttonDisabled}
                  >
                    {card.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}