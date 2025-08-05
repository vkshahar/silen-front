"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { MetricCard } from "@/components/ui/metric-card";
import { QuickActionsDropdown } from "@/components/ui/dropdown-menu-demo";
import { Target, TrendingUp, Database, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SelectorChips } from "@/components/ui/selector-chips";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface OptimizationCard {
  id: string;
  title: string;
  source: string;
  volume: string;
  period: string;
  description: string;
  reduction: string;
  eventCount: string;
  savings: string;
  risk: string;
  sample: { line1: string; line2: string };
  buttonText: string;
  buttonDisabled?: boolean;
}

export default function OptimizationInitiatives() {
  const router = useRouter();
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [appliedCards, setAppliedCards] = useState<Set<string>>(new Set());

  const optimizationCards: OptimizationCard[] = [
    {
      id: "remove-debug-logs",
      title: "Remove Debug Logs",
      source: "Windows Event Logs",
      volume: "15GB",
      period: "Daily reduction",
      description: "Filter out verbose debug logging from Windows Event logs to reduce noise and storage costs",
      reduction: "25% reduction",
      eventCount: "9.8k events",
      savings: "$2,250/month",
      risk: "Low risk",
      sample: {
        line1: "Event ID: 1001 | Source: Microsoft-Windows-Winlogon",
        line2: "Debug: User logon session started | Process: winlogon.exe"
      },
      buttonText: "Apply"
    },
    {
      id: "firewall-heartbeat",
      title: "Filter Firewall Heartbeat Events",
      source: "Firewall Logs",
      volume: "8.2GB",
      period: "Daily reduction",
      description: "Remove routine 'status OK' heartbeat events from firewall logs that provide no security value",
      reduction: "40% reduction",
      eventCount: "45.2k events",
      savings: "$1,230/month",
      risk: "Low risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z src=firewall-01",
        line2: "message=\"Heartbeat status OK\" interval=60s"
      },
      buttonText: "Apply"
    },
    {
      id: "system-heartbeat",
      title: "Filter System Heartbeats",
      source: "Linux System Logs",
      volume: "12.5GB",
      period: "Daily reduction",
      description: "Remove routine system heartbeat messages from Linux logs that create noise without security value",
      reduction: "35% reduction",
      eventCount: "67.8k events",
      savings: "$1,875/month",
      risk: "Low risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z service=systemd",
        line2: "message=\"Service heartbeat\" status=active"
      },
      buttonText: "Apply"
    },
    {
      id: "chrome-updater",
      title: "Filter Chrome Updater Events",
      source: "Windows Event Logs",
      volume: "6.8GB",
      period: "Daily reduction",
      description: "Remove Chrome updater background events that generate high volume with no security relevance",
      reduction: "50% reduction",
      eventCount: "23.4k events",
      savings: "$1,020/month",
      risk: "Low risk",
      sample: {
        line1: "Event ID: 4688 | Source: Microsoft-Windows-Security-Auditing",
        line2: "Process: chrome.exe | Command: --update-check"
      },
      buttonText: "Apply"
    },
    {
      id: "link-local-traffic",
      title: "Filter Link-Local Traffic",
      source: "Network Logs",
      volume: "9.3GB",
      period: "Daily reduction",
      description: "Exclude link-local traffic (169.254.* or fe80::/10 addresses) from network logs",
      reduction: "30% reduction",
      eventCount: "38.9k events",
      savings: "$1,395/month",
      risk: "Low risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z src=169.254.1.100",
        line2: "dst=169.254.1.101 protocol=UDP port=5353"
      },
      buttonText: "Apply"
    },
    {
      id: "google-dns",
      title: "Filter Google DNS Requests",
      source: "DNS Logs",
      volume: "4.7GB",
      period: "Daily reduction",
      description: "Remove routine Google DNS (8.8.8.8, 8.8.4.4) requests that generate high volume",
      reduction: "45% reduction",
      eventCount: "156.7k events",
      savings: "$705/month",
      risk: "Low risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z src=192.168.1.100",
        line2: "dst=8.8.8.8 query=example.com type=A"
      },
      buttonText: "Apply"
    },
    {
      id: "outlook-events",
      title: "Filter Outlook Execution Events",
      source: "Sysmon",
      volume: "11.2GB",
      period: "Daily reduction",
      description: "Remove routine Outlook execution events that provide no security or operational value",
      reduction: "55% reduction",
      eventCount: "42.1k events",
      savings: "$1,680/month",
      risk: "Low risk",
      sample: {
        line1: "Event ID: 1 | Source: Microsoft-Windows-Sysmon",
        line2: "Process: OUTLOOK.EXE | Parent: explorer.exe"
      },
      buttonText: "Apply"
    },
    {
      id: "auth-success",
      title: "Filter Successful Authentication Logs",
      source: "Authentication Logs",
      volume: "18.6GB",
      period: "Daily reduction",
      description: "Remove routine successful authentication events while preserving failed login attempts",
      reduction: "60% reduction",
      eventCount: "89.3k events",
      savings: "$2,790/month",
      risk: "Low risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z user=john.doe",
        line2: "action=login status=success ip=192.168.1.100"
      },
      buttonText: "Apply"
    },
    {
      id: "allowed-traffic",
      title: "Drop Allowed Traffic Logs",
      source: "Firewall Logs",
      volume: "22.4GB",
      period: "Daily reduction",
      description: "Exclude routine allowed traffic from firewall logs while preserving blocked/denied events",
      reduction: "70% reduction",
      eventCount: "234.7k events",
      savings: "$3,360/month",
      risk: "Low risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z src=192.168.1.100",
        line2: "dst=10.0.0.5 action=allow protocol=TCP port=443"
      },
      buttonText: "Apply"
    },
    {
      id: "cloudfront-200",
      title: "Filter 200 OK Responses",
      source: "AWS CloudFront Logs",
      volume: "31.8GB",
      period: "Daily reduction",
      description: "Remove successful HTTP 200 responses from AWS CloudFront logs while preserving error responses",
      reduction: "65% reduction",
      eventCount: "567.2k events",
      savings: "$4,770/month",
      risk: "Medium risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z status=200",
        line2: "method=GET path=/api/health response_time=45ms"
      },
      buttonText: "Apply"
    },
    {
      id: "entra-info",
      title: "Suppress Info Level Logs",
      source: "Entra ID Audit Logs",
      volume: "14.3GB",
      period: "Daily reduction",
      description: "Filter out informational level logs from Entra ID audit logs while preserving warning and error events",
      reduction: "50% reduction",
      eventCount: "78.9k events",
      savings: "$2,145/month",
      risk: "Low risk",
      sample: {
        line1: "INFO 2025-01-07T12:00:00Z tenant=contoso",
        line2: "message=\"User session created\" level=info"
      },
      buttonText: "Apply"
    }
  ];

  const handleApplyOptimization = (cardId: string, cardTitle: string) => {
    // Add card to applied set
    setAppliedCards(prev => new Set([...prev, cardId]));
    
    // Show success toast
    toast.success("Filter Applied Successfully!", {
      description: `${cardTitle} has been applied to your log sources.`,
      duration: 4000,
    });
  };

  const filteredCards = useMemo(() => {
    let cards = optimizationCards.filter(card => !appliedCards.has(card.id));
    
    if (selectedRisks.length === 0) {
      return cards;
    }
    return cards.filter(card => selectedRisks.includes(card.risk));
  }, [selectedRisks, appliedCards]);

  // Calculate counts for each risk level
  const riskCounts = useMemo(() => {
    const counts = {
      "Low risk": 0,
      "Medium risk": 0,
      "High risk": 0
    };
    
    optimizationCards.forEach(card => {
      if (counts.hasOwnProperty(card.risk)) {
        counts[card.risk as keyof typeof counts]++;
      }
    });
    
    return counts;
  }, []);

  // Create options with counts
  const riskOptions = useMemo(() => {
    return [
      `Low risk (${riskCounts["Low risk"]})`,
      `Medium risk (${riskCounts["Medium risk"]})`,
      `High risk (${riskCounts["High risk"]})`
    ];
  }, [riskCounts]);

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
                title="Possible volume reduction (Daily)"
                value="155.8GB"
                change="+24%"
                changeType="positive"
                icon={TrendingUp}
              />
              <MetricCard
                title="Average Reduction Rate"
                value="65%"
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
                options={riskOptions}
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
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      {card.volume} <span className="text-slate-500 font-normal text-lg">({card.eventCount})</span>
                    </div>
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
                    onClick={() => handleApplyOptimization(card.id, card.title)}
                  >
                    {card.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      {/* Toast Component */}
      <Toaster />
    </div>
  );
}