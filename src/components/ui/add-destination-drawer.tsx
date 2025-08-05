"use client";

import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddDestinationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: {
    name?: string;
    type?: string;
    costPerGB?: string;
    apiKey?: string;
    ipAddress?: string;
    port?: string;
  } | null;
  mode?: 'add' | 'edit';
  onAddDestination?: (destination: any) => void;
}

export const AddDestinationDrawer: React.FC<AddDestinationDrawerProps> = ({ 
  isOpen, 
  onClose, 
  editData, 
  mode = 'add',
  onAddDestination
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [formData, setFormData] = useState({
    siemName: "",
    siemType: "Splunk",
    costPerGB: "5",
    apiKey: "",
    ipAddress: "",
    port: "8089"
  });

  const siemTypes = [
    "Splunk",
    "QRadar",
    "Sentinel",
    "ArcSight",
    "LogRhythm",
    "Elastic SIEM",
    "Chronicle",
    "Sumo Logic"
  ];

  useEffect(() => {
    if (editData && mode === 'edit') {
      setFormData({
        siemName: editData.name || '',
        siemType: editData.type || 'Splunk',
        costPerGB: editData.costPerGB?.replace('$', '') || '5',
        apiKey: editData.apiKey || '',
        ipAddress: editData.ipAddress || '',
        port: editData.port || '8089'
      });
    } else {
      // Reset form for add mode
      setFormData({
        siemName: "",
        siemType: "Splunk",
        costPerGB: "5",
        apiKey: "",
        ipAddress: "",
        port: "8089"
      });
    }

    // Handle body scroll prevention
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [editData, mode, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'add' && onAddDestination) {
      // Create new destination with connecting status
      const newDestination = {
        name: formData.siemName,
        type: formData.siemType,
        status: "connecting",
        costPerGB: `$${formData.costPerGB}`,
        ipAddress: formData.ipAddress,
        apiKey: "****-****-****",
        lastSync: new Date().toLocaleDateString()
      };
      
      // Add destination and close drawer immediately
      onAddDestination(newDestination);
      onClose();
    } else {
      // Edit mode - keep existing behavior
      setIsConnecting(true);
      
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setIsConnecting(false);
      setConnectionSuccess(true);
      
      // Show success state briefly then close
      setTimeout(() => {
        setConnectionSuccess(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-[700px] bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {mode === 'edit' ? 'Edit SIEM' : 'Add New SIEM'}
            </h2>
            <p className="text-sm text-slate-600">
              {mode === 'edit' ? 'Update SIEM connection configuration' : 'Configure a new SIEM destination connection'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 pb-24" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Configuration */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Basic Configuration</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  SIEM Name *
                </label>
                <input
                  type="text"
                  value={formData.siemName}
                  onChange={(e) => handleInputChange("siemName", e.target.value)}
                  placeholder="e.g., Splunk Production"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  SIEM Type *
                </label>
                <select
                  value={formData.siemType}
                  onChange={(e) => handleInputChange("siemType", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  required
                >
                  {siemTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Cost per GB ($) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.costPerGB}
                  onChange={(e) => handleInputChange("costPerGB", e.target.value)}
                  placeholder="5"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Connection Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Connection Details</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  API Key *
                </label>
                <input
                  type="text"
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange("apiKey", e.target.value)}
                  placeholder="Enter API key"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    IP Address/Hostname *
                  </label>
                  <input
                    type="text"
                    value={formData.ipAddress}
                    onChange={(e) => handleInputChange("ipAddress", e.target.value)}
                    placeholder="192.168.1.100 or hostname"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Port *
                  </label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={(e) => handleInputChange("port", e.target.value)}
                    placeholder="8089"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700">
                  After {mode === 'edit' ? 'updating' : 'adding'} the SIEM connection, it may take a few minutes to establish the connection and test connectivity.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer Actions */}
        <div className="flex-shrink-0 border-t border-slate-200 p-6 bg-white">
          <div className="flex items-center justify-end gap-3">
            <Button 
              variant="outline"
              onClick={onClose}
              disabled={isConnecting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isConnecting || connectionSuccess}
              className={`flex items-center gap-2 min-w-[120px] ${
                connectionSuccess 
                  ? 'bg-green-600 hover:bg-green-600' 
                  : ''
              }`}
            >
              {connectionSuccess ? (
                <>
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  Active
                </>
              ) : isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting
                </>
              ) : (
                <>
                  {mode === 'edit' ? 'Save SIEM' : 'Add SIEM'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};