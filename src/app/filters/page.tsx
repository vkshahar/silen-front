"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Filter {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  reduction: string;
  savings: string;
  enabled: boolean;
}

export default function FiltersManagement() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filter[]>([
    {
      id: "1",
      name: "Remove Debug Logs",
      type: "Windows Event Logs",
      status: "Active",
      reduction: "25% reduction",
      savings: "$2,250/month",
      enabled: true
    },
    {
      id: "2", 
      name: "Turn logs into a metric",
      type: "All Log Sources",
      status: "Active",
      reduction: "80% reduction", 
      savings: "$42,675/month",
      enabled: true
    },
    {
      id: "3",
      name: "Smart Compression",
      type: "Linux Syslogs", 
      status: "Inactive",
      reduction: "65% reduction",
      savings: "$48,705/month",
      enabled: false
    }
  ]);

  const toggleFilter = (id: string) => {
    setFilters(filters.map(filter => 
      filter.id === id 
        ? { ...filter, enabled: !filter.enabled, status: filter.enabled ? 'Inactive' : 'Active' }
        : filter
    ));
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
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push('/optimization')}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Optimization
                </Button>
                <div className="border-l border-slate-200 h-6"></div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Filters Management</h1>
                  <p className="text-slate-600 mt-1">Manage and configure your active optimization filters</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Filters Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Active Filters</h2>
                <p className="text-sm text-slate-600 mt-1">Toggle filters on or off to manage your optimization strategies</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Filter Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Reduction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Savings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Enable/Disable
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filters.map((filter) => (
                      <tr key={filter.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {filter.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {filter.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            filter.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {filter.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {filter.reduction}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {filter.savings}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleFilter(filter.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                              filter.enabled ? 'bg-purple-600' : 'bg-slate-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                filter.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
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
    </div>
  );
}