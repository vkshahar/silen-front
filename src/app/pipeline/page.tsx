"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useState } from "react";

const pipelineData = [
  {
    name: "Web Server Analytics Pipeline",
    source: "Apache Web Servers",
    destinations: ["Splunk SIEM", "DataLake S3"],
    status: "active",
    lastUpdated: "2 minutes ago"
  },
  {
    name: "Security Events Pipeline",
    source: "Windows Domain Controllers",
    destinations: ["QRadar", "Elastic Security"],
    status: "active",
    lastUpdated: "5 minutes ago"
  },
  {
    name: "Network Infrastructure Pipeline",
    source: "Cisco Network Switches",
    destinations: ["Splunk Infrastructure"],
    status: "error",
    lastUpdated: "2 hours ago"
  },
  {
    name: "Application Logs Pipeline",
    source: "Kubernetes Clusters",
    destinations: ["Grafana Loki", "CloudWatch"],
    status: "active",
    lastUpdated: "1 minute ago"
  },
  {
    name: "Database Audit Pipeline",
    source: "MySQL Database Servers",
    destinations: ["Compliance Archive"],
    status: "deactivated",
    lastUpdated: "3 days ago"
  },
  {
    name: "Cloud Services Pipeline",
    source: "AWS CloudTrail",
    destinations: ["Security Analytics", "Cost Management"],
    status: "active",
    lastUpdated: "30 seconds ago"
  }
];

export default function PipelineManagement() {
  const [pipelines] = useState(pipelineData);

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
          <CheckCircle className="w-3 h-3" />
          Active
        </span>
      );
    } else if (status === "error") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded border border-red-200">
          <AlertTriangle className="w-3 h-3" />
          Error
        </span>
      );
    } else if (status === "deactivated") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200">
          <XCircle className="w-3 h-3" />
          Deactivated
        </span>
      );
    }
  };

  const formatDestinations = (destinations: string[]) => {
    if (destinations.length === 1) {
      return destinations[0];
    } else if (destinations.length === 2) {
      return destinations.join(", ");
    } else {
      return `${destinations[0]}, +${destinations.length - 1} more`;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <Sidebar />
      
      <div className="flex-1 transition-all duration-300 ease-in-out">
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Pipeline Management</h1>
                <p className="text-slate-600 mt-1">Monitor and manage data pipelines from sources to destinations</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="relative">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">Active Pipelines</h2>
                    <p className="text-slate-600 text-sm">Data flow pipelines connecting sources to destinations</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Pipeline Name</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Source</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Destinations</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pipelines.map((pipeline, index) => (
                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-900 font-medium">{pipeline.name}</div>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700">{pipeline.source}</td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-slate-700">
                              {formatDestinations(pipeline.destinations)}
                            </div>
                          </td>
                          <td className="px-4 py-4">{getStatusBadge(pipeline.status)}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{pipeline.lastUpdated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}