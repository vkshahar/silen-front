"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddSourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: {
    source?: string;
    type?: string;
    endpoint?: string;
    port?: string;
    protocol?: string;
    authentication?: string;
    username?: string;
    password?: string;
    description?: string;
    tags?: string[];
  } | null;
  mode?: 'add' | 'edit';
  onAddSource?: (source: any) => void;
}

export const AddSourceDrawer: React.FC<AddSourceDrawerProps> = ({ 
  isOpen, 
  onClose, 
  editData, 
  mode = 'add',
  onAddSource
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [formData, setFormData] = useState({
    sourceName: "",
    sourceType: "Windows Event Logs",
    collectionModel: "Push Model",
    collectorAddress: "",
    transport: "UDP Syslog",
    port: "514",
    authToken: "",
    tlsSettings: "No",
    metadataHeaders: "",
    timeZone: "UTC",
    maxPacketSize: "64KB",
    retryPolicy: "3 attempts with exponential backoff",
    tags: [] as string[],
    newTag: ""
  });

  const sourceTypes = [
    "Windows Event Logs",
    "Linux Syslogs", 
    "Network Devices",
    "Applications",
    "Security Tools",
    "Cloud Services",
    "Containers",
    "Custom"
  ];

  const collectionModels = [
    "Push Model",
    "Pull Model",
    "Streaming Model"
  ];

  const transports = [
    "UDP Syslog",
    "TCP Syslog", 
    "HTTP(S)",
    "gRPC",
    "MQTT",
    "Kafka"
  ];

  const tlsOptions = [
    "No",
    "TLS 1.2",
    "TLS 1.3",
    "Mutual TLS"
  ];

  const timeZones = [
    "UTC",
    "EST",
    "PST",
    "GMT",
    "Custom Format"
  ];

  const packetSizes = [
    "64KB",
    "128KB", 
    "256KB",
    "512KB",
    "1MB",
    "2MB"
  ];

  useEffect(() => {
    if (editData && mode === 'edit') {
      setFormData({
        sourceName: editData.source || '',
        sourceType: editData.type || 'Windows Event Logs',
        collectionModel: 'Push Model',
        collectorAddress: editData.endpoint || '',
        transport: editData.protocol?.toUpperCase() + ' Syslog' || 'UDP Syslog',
        port: editData.port || '514',
        authToken: editData.authentication || '',
        tlsSettings: 'No',
        metadataHeaders: '',
        timeZone: 'UTC',
        maxPacketSize: '64KB',
        retryPolicy: '3 attempts with exponential backoff',
        tags: editData.tags || [],
        newTag: ''
      });
    } else {
      // Reset form for add mode
      setFormData({
        sourceName: "",
        sourceType: "Windows Event Logs",
        collectionModel: "Push Model",
        collectorAddress: "",
        transport: "UDP Syslog",
        port: "514",
        authToken: "",
        tlsSettings: "No",
        metadataHeaders: "",
        timeZone: "UTC",
        maxPacketSize: "64KB",
        retryPolicy: "3 attempts with exponential backoff",
        tags: [],
        newTag: ""
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

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ""
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'add' && onAddSource) {
      // Create new source with connecting status
      const newSource = {
        source: formData.sourceName,
        dailyLogs: "0 logs/day",
        type: formData.sourceType,
        dailyVolume: "0 logs",
        sizeBeforeOptimization: "0 GB",
        optimizedSize: "0 GB",
        reduction: "0%",
        monthlySavings: "$0",
        status: "connecting",
        errors: null
      };
      
      // Add source and close drawer immediately
      onAddSource(newSource);
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
              {mode === 'edit' ? 'Edit Source' : 'Add New Source'}
            </h2>
            <p className="text-sm text-slate-600">
              {mode === 'edit' ? 'Update log source configuration' : 'Configure a new log source connection'}
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Source Name *
                  </label>
                  <input
                    type="text"
                    value={formData.sourceName}
                    onChange={(e) => handleInputChange("sourceName", e.target.value)}
                    placeholder="e.g., Windows Domain Controllers"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Source Type *
                  </label>
                  <select
                    value={formData.sourceType}
                    onChange={(e) => handleInputChange("sourceType", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                    required
                  >
                    {sourceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Collection Model *
                </label>
                <select
                  value={formData.collectionModel}
                  onChange={(e) => handleInputChange("collectionModel", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  required
                >
                  {collectionModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Connection Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Connection Details</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Collector Address (IP/FQDN) *
                </label>
                <input
                  type="text"
                  value={formData.collectorAddress}
                  onChange={(e) => handleInputChange("collectorAddress", e.target.value)}
                  placeholder="192.168.1.100 or collector.domain.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Transport & Protocol *
                  </label>
                  <select
                    value={formData.transport}
                    onChange={(e) => handleInputChange("transport", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                    required
                  >
                    {transports.map(transport => (
                      <option key={transport} value={transport}>{transport}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Port *
                  </label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={(e) => handleInputChange("port", e.target.value)}
                    placeholder="514"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Security & Authentication */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Security & Authentication</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Auth / Token
                  </label>
                  <input
                    type="text"
                    value={formData.authToken}
                    onChange={(e) => handleInputChange("authToken", e.target.value)}
                    placeholder="HEC token, client certificate, shared secret"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    TLS Settings
                  </label>
                  <select
                    value={formData.tlsSettings}
                    onChange={(e) => handleInputChange("tlsSettings", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  >
                    {tlsOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Metadata & Processing */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Metadata & Processing</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Metadata Headers
                </label>
                <input
                  type="text"
                  value={formData.metadataHeaders}
                  onChange={(e) => handleInputChange("metadataHeaders", e.target.value)}
                  placeholder="sourcetype, index, tenant_id, etc."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Time Zone / Timestamp Format
                  </label>
                  <select
                    value={formData.timeZone}
                    onChange={(e) => handleInputChange("timeZone", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  >
                    {timeZones.map(zone => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Max Packet/Record Size
                  </label>
                  <select
                    value={formData.maxPacketSize}
                    onChange={(e) => handleInputChange("maxPacketSize", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  >
                    {packetSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Retry Policy
                </label>
                <input
                  type="text"
                  value={formData.retryPolicy}
                  onChange={(e) => handleInputChange("retryPolicy", e.target.value)}
                  placeholder="Retry attempts, backoff strategy"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                />
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Tags</h3>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.newTag}
                  onChange={(e) => handleInputChange("newTag", e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTag}
                  className="px-3"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Info Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700">
                  After {mode === 'edit' ? 'updating' : 'adding'} the source, it may take a few minutes to establish the connection and begin receiving logs.
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
                  {mode === 'edit' ? 'Save' : 'Add'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};