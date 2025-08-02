"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Edit, Trash2, CheckCircle, AlertTriangle, XCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddSourceDrawer } from "@/components/ui/add-source-drawer";

const sourceData = [
  {
    source: "Windows Domain Controllers",
    dailyLogs: "45,000 logs/day",
    type: "Windows Event Logs",
    dailyVolume: "45,000 logs",
    sizeBeforeOptimization: "1350.0 GB",
    optimizedSize: "877.5 GB",
    reduction: "-35%",
    monthlySavings: "$2363",
    status: "active",
    errors: null
  },
  {
    source: "Linux Web Servers",
    dailyLogs: "32,000 logs/day",
    type: "Linux Syslogs",
    dailyVolume: "32,000 logs",
    sizeBeforeOptimization: "960.0 GB",
    optimizedSize: "624.0 GB",
    reduction: "-35%",
    monthlySavings: "$1680",
    status: "active",
    errors: "2 errors"
  },
  {
    source: "Cisco Network Switches",
    dailyLogs: "15,000 logs/day",
    type: "Network Devices",
    dailyVolume: "15,000 logs",
    sizeBeforeOptimization: "450.0 GB",
    optimizedSize: "292.5 GB",
    reduction: "-35%",
    monthlySavings: "$788",
    status: "error",
    errors: "15 errors"
  },
  {
    source: "Application Servers",
    dailyLogs: "28,000 logs/day",
    type: "Applications",
    dailyVolume: "28,000 logs",
    sizeBeforeOptimization: "840.0 GB",
    optimizedSize: "546.0 GB",
    reduction: "-35%",
    monthlySavings: "$1470",
    status: "active",
    errors: "1 errors"
  },
  {
    source: "Security Scanners",
    dailyLogs: "8,000 logs/day",
    type: "Security Tools",
    dailyVolume: "8,000 logs",
    sizeBeforeOptimization: "240.0 GB",
    optimizedSize: "156.0 GB",
    reduction: "-35%",
    monthlySavings: "$420",
    status: "inactive",
    errors: null
  }
];

export default function SourceManagement() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getStatusBadge = (status: string, errors: string | null) => {
    if (status === "active" && !errors) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-body-sm font-medium rounded-full border border-green-200">
          <CheckCircle className="w-3 h-3" />
          active
        </span>
      );
    } else if (status === "active" && errors) {
      return (
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-body-sm font-medium rounded-full border border-green-200">
            <CheckCircle className="w-3 h-3" />
            active
          </span>
          <div className="text-xs text-red-600">{errors}</div>
        </div>
      );
    } else if (status === "error") {
      return (
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-body-sm font-medium rounded-full border border-red-200">
            <AlertTriangle className="w-3 h-3" />
            error
          </span>
          <div className="text-xs text-red-600">{errors}</div>
        </div>
      );
    } else if (status === "inactive") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 text-body-sm font-medium rounded-full border border-slate-200">
          <XCircle className="w-3 h-3" />
          inactive
        </span>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Source Management</h1>
                <p className="text-slate-600 mt-1">Manage and monitor your log sources, volumes, and optimization metrics</p>
              </div>
              <Button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add a source
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Sources Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Log Sources Overview</h2>
                <p className="text-slate-600 text-sm">Daily volumes, costs, and optimization efficiency per source</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Source</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Type</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Daily Volume</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Size (GB)<br/>(Before Optimization)</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Optimized Size (GB)</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Reduction</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Monthly<br/>Savings</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Status</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sourceData.map((source, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-sm text-slate-900 font-medium">{source.source}</div>
                            <div className="text-xs text-slate-500">{source.dailyLogs}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">{source.type}</td>
                        <td className="px-4 py-4 text-sm text-slate-700">{source.dailyVolume}</td>
                        <td className="px-4 py-4 text-sm text-red-600 font-medium">{source.sizeBeforeOptimization}</td>
                        <td className="px-4 py-4 text-sm text-teal-600 font-medium">{source.optimizedSize}</td>
                        <td className="px-4 py-4 text-sm text-green-600 font-medium">{source.reduction}</td>
                        <td className="px-4 py-4 text-sm text-green-600 font-medium">{source.monthlySavings}</td>
                        <td className="px-4 py-4">{getStatusBadge(source.status, source.errors)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-slate-400 hover:text-brand-primary hover:bg-purple-50 rounded transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Add Source Drawer */}
      <AddSourceDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}