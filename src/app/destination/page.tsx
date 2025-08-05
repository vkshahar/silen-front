"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { MoreHorizontal, CheckCircle, AlertTriangle, XCircle, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddDestinationDrawer } from "@/components/ui/add-destination-drawer";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";

const destinationData = [
  {
    name: "Splunk Production",
    type: "Splunk",
    status: "active",
    costPerGB: "$5",
    ipAddress: "192.168.1.100",
    apiKey: "****-****-****",
    lastSync: "1/15/2024"
  },
  {
    name: "QRadar Secondary",
    type: "QRadar",
    status: "active",
    costPerGB: "$4.5",
    ipAddress: "192.168.1.101",
    apiKey: "****-****-****",
    lastSync: "1/15/2024"
  },
  {
    name: "Sentinel Cloud",
    type: "Sentinel",
    status: "inactive",
    costPerGB: "$6",
    ipAddress: "sentinel.azure.com",
    apiKey: "****-****-****",
    lastSync: "1/10/2024"
  }
];

export default function DestinationManagement() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<typeof destinationData[0] | null>(null);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit'>('add');
  const [destinations, setDestinations] = useState(destinationData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [destinationToDelete, setDestinationToDelete] = useState<{index: number, name: string} | null>(null);

  const handleEditDestination = (destination: typeof destinationData[0]) => {
    setEditingDestination(destination);
    setDrawerMode('edit');
    setIsDrawerOpen(true);
    setOpenDropdown(null);
  };

  const handleDeleteDestination = (index: number) => {
    setDestinationToDelete({ index, name: destinations[index].name });
    setDeleteDialogOpen(true);
    setOpenDropdown(null);
  };

  const confirmDelete = () => {
    if (destinationToDelete) {
      setDestinations(destinations.filter((_, i) => i !== destinationToDelete.index));
    }
    setDeleteDialogOpen(false);
    setDestinationToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDestinationToDelete(null);
  };

  const handleAddDestination = () => {
    setEditingDestination(null);
    setDrawerMode('add');
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingDestination(null);
    setOpenDropdown(null);
  };

  const handleAddNewDestination = (newDestination: any) => {
    // Add destination with connecting status
    setDestinations(prev => [...prev, newDestination]);
    
    // Simulate connection process - change to active after 3 seconds
    setTimeout(() => {
      setDestinations(prev => 
        prev.map(dest => 
          dest === newDestination 
            ? { ...dest, status: 'active' }
            : dest
        )
      );
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
          <CheckCircle className="w-3 h-3" />
          active
        </span>
      );
    } else if (status === "connecting") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
          <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          connecting
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
                <h1 className="text-2xl font-bold text-slate-900">Destination Management</h1>
                <p className="text-slate-600 mt-1">Manage and monitor your SIEM destinations and connections</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Destinations Table */}
            <div className="relative">
              {/* Button positioned above table component */}
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={handleAddDestination}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New SIEM
                </Button>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">SIEM Connections</h2>
                    <p className="text-slate-600 text-sm">Connected security information and event management systems</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Name</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Type</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Status</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Cost/GB</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">IP Address</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">API Key</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Last Sync</th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {destinations.map((destination, index) => (
                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-slate-900 font-medium">{destination.name}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{destination.type}</td>
                          <td className="px-4 py-4">{getStatusBadge(destination.status)}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{destination.costPerGB}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{destination.ipAddress}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-700">{destination.apiKey}</span>
                              <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                                <Eye className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700">{destination.lastSync}</td>
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
                                  <div className={`absolute right-0 w-32 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20 ${
                                    index >= destinations.length - 2 ? 'bottom-8 mb-1' : 'top-8 mt-1'
                                  }`}>
                                    <button
                                      onClick={() => handleEditDestination(destination)}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                      <Edit className="w-3 h-3" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteDestination(index)}
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
      
      {/* Add Destination Drawer */}
      <AddDestinationDrawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer}
        editData={editingDestination}
        mode={drawerMode}
        onAddDestination={handleAddNewDestination}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        sourceName={destinationToDelete?.name || ''}
        itemType="destination"
      />
    </div>
  );
}