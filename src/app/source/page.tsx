"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { MoreHorizontal, CheckCircle, AlertTriangle, XCircle, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddSourceDrawer } from "@/components/ui/add-source-drawer";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

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
  const [editingSource, setEditingSource] = useState<typeof sourceData[0] | null>(null);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit'>('add');
  const [sources, setSources] = useState(sourceData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState<{index: number, name: string} | null>(null);

  const handleEditSource = (source: typeof sourceData[0]) => {
    setEditingSource(source);
    setDrawerMode('edit');
    setIsDrawerOpen(true);
    setOpenDropdown(null);
  };

  const handleDeleteSource = (index: number) => {
    setSourceToDelete({ index, name: sources[index].source });
    setDeleteDialogOpen(true);
    setOpenDropdown(null);
  };

  const confirmDelete = () => {
    if (sourceToDelete) {
      setSources(sources.filter((_, i) => i !== sourceToDelete.index));
    }
    setDeleteDialogOpen(false);
    setSourceToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSourceToDelete(null);
  };

  const handleAddSource = () => {
    setEditingSource(null);
    setDrawerMode('add');
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingSource(null);
    setOpenDropdown(null);
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
          <CheckCircle className="w-3 h-3" />
          active
        </span>
      );
    } else if (status === "error") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded border border-red-200">
          <AlertTriangle className="w-3 h-3" />
          error
        </span>
      );
    } else if (status === "inactive") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200">
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
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Sources Table */}
            <div className="relative">
              {/* Button positioned above table component */}
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={handleAddSource}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add a source
                </Button>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">Log Sources Overview</h2>
                    <p className="text-slate-600 text-sm">Daily volumes, costs, and optimization efficiency per source</p>
                  </div>
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
                      {sources.map((source, index) => (
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
                            <div className="relative">
                              <button 
                                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              
                              {openDropdown === index && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setOpenDropdown(null)}
                                  />
                                  <div className="absolute right-0 top-8 mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
                                    <button
                                      onClick={() => handleEditSource(source)}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                      <Edit className="w-3 h-3" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteSource(index)}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      Delete
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
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
      
      {/* Add Source Drawer */}
      <AddSourceDrawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer}
        editData={editingSource}
        mode={drawerMode}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        sourceName={sourceToDelete?.name || ''}
      />
    </div>
  );
}