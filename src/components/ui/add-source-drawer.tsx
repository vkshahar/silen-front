"use client";

import React, { useState } from "react";
import { X, Plus, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddSourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSourceDrawer: React.FC<AddSourceDrawerProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    endpoint: "",
    port: "",
    protocol: "syslog",
    authentication: "",
    username: "",
    password: "",
    description: "",
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

  const protocols = [
    "syslog",
    "tcp",
    "udp", 
    "http",
    "https",
    "api"
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Add New Source</h2>
              <p className="text-sm text-slate-600">Configure a new log source connection</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Source Configuration Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Source Configuration</h3>
              
              {/* Source Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Source Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Production Web Servers"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  required
                />
              </div>

              {/* Source Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Source Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  required
                >
                  <option value="">Select source type</option>
                  {sourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of this log source..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Connection Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Connection Details</h3>
              
              {/* Endpoint */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Endpoint/Host *
                </label>
                <input
                  type="text"
                  value={formData.endpoint}
                  onChange={(e) => handleInputChange("endpoint", e.target.value)}
                  placeholder="e.g., 192.168.1.100 or logs.example.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  required
                />
              </div>

              {/* Port and Protocol */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Port *
                  </label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={(e) => handleInputChange("port", e.target.value)}
                    placeholder="514"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Protocol *
                  </label>
                  <select
                    value={formData.protocol}
                    onChange={(e) => handleInputChange("protocol", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    required
                  >
                    {protocols.map(protocol => (
                      <option key={protocol} value={protocol}>{protocol.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Authentication Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Authentication</h3>
              
              {/* Authentication Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Authentication Type
                </label>
                <select
                  value={formData.authentication}
                  onChange={(e) => handleInputChange("authentication", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                >
                  <option value="">None</option>
                  <option value="basic">Basic Auth</option>
                  <option value="api-key">API Key</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>

              {/* Conditional Auth Fields */}
              {formData.authentication === "basic" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tags Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Tags</h3>
              
              {/* Add Tag Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.newTag}
                  onChange={(e) => handleInputChange("newTag", e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
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

              {/* Display Tags */}
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
                <p className="text-sm text-blue-800 font-medium">Configuration Note</p>
                <p className="text-sm text-blue-700 mt-1">
                  After adding the source, it may take a few minutes to establish the connection and begin receiving logs.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 p-6 bg-slate-50">
          <div className="flex items-center justify-end gap-3">
            <Button 
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Source
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};