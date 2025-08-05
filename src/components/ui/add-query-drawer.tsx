"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QueryFormData {
  queryName: string;
  dataSource: string;
  timeFrame: string;
  customDateFrom: string;
  customDateTo: string;
  logicalOperator: string;
  conditions: Array<{ field: string; operator: string; value: string }>;
}

interface AddQueryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuery?: (query: any) => void;
}

export const AddQueryDrawer: React.FC<AddQueryDrawerProps> = ({ 
  isOpen, 
  onClose, 
  onAddQuery
}) => {
  const [formData, setFormData] = useState<QueryFormData>({
    queryName: "",
    dataSource: "",
    timeFrame: "",
    customDateFrom: "",
    customDateTo: "",
    logicalOperator: "AND",
    conditions: [{ field: "EventID", operator: "equals", value: "" }]
  });

  const availableDataSources = [
    { id: "windows-logs", name: "Windows Event Logs" },
    { id: "linux-logs", name: "Linux Web Servers" },
    { id: "network-logs", name: "Cisco Network Switches" },
    { id: "app-logs", name: "Application Servers" },
    { id: "security-logs", name: "Security Scanners" }
  ];

  const timeFrameOptions = [
    { id: "last-hour", label: "Last Hour" },
    { id: "last-24h", label: "Last 24 Hours" },
    { id: "last-7d", label: "Last 7 Days" },
    { id: "last-30d", label: "Last 30 Days" },
    { id: "custom", label: "Custom Range" }
  ];

  const fieldOptions = [
    "EventID",
    "Computer Name", 
    "User Name",
    "Command Line",
    "Image Path",
    "Log Source"
  ];

  const operatorOptions = [
    "equals",
    "contains",
    "starts_with",
    "ends_with",
    "greater_than",
    "less_than",
    "regex_match"
  ];

  // Reset form when drawer opens and handle body scroll
  useEffect(() => {
    if (isOpen) {
      setFormData({
        queryName: "",
        dataSource: "",
        timeFrame: "",
        customDateFrom: "",
        customDateTo: "",
        logicalOperator: "AND",
        conditions: [{ field: "EventID", operator: "equals", value: "" }]
      });
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when drawer is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const addCondition = () => {
    setFormData(prev => ({
      ...prev,
      conditions: [...prev.conditions, { field: "EventID", operator: "equals", value: "" }]
    }));
  };

  const removeCondition = (index: number) => {
    if (formData.conditions.length > 1) {
      setFormData(prev => ({
        ...prev,
        conditions: prev.conditions.filter((_, i) => i !== index)
      }));
    }
  };

  const updateCondition = (index: number, field: keyof typeof formData.conditions[0], value: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? { ...condition, [field]: value } : condition
      )
    }));
  };

  const getTimeFrameClause = (timeFrame: string, customFrom?: string, customTo?: string) => {
    const now = new Date();
    switch (timeFrame) {
      case 'last-hour':
        return `timestamp >= "${new Date(now.getTime() - 60*60*1000).toISOString()}"`;
      case 'last-24h':
        return `timestamp >= "${new Date(now.getTime() - 24*60*60*1000).toISOString()}"`;
      case 'last-7d':
        return `timestamp >= "${new Date(now.getTime() - 7*24*60*60*1000).toISOString()}"`;
      case 'last-30d':
        return `timestamp >= "${new Date(now.getTime() - 30*24*60*60*1000).toISOString()}"`;
      case 'custom':
        if (customFrom && customTo) {
          return `timestamp >= "${customFrom}T00:00:00.000Z" AND timestamp <= "${customTo}T23:59:59.999Z"`;
        } else if (customFrom) {
          return `timestamp >= "${customFrom}T00:00:00.000Z"`;
        } else if (customTo) {
          return `timestamp <= "${customTo}T23:59:59.999Z"`;
        }
        return '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.queryName.trim() || !formData.dataSource.trim() || !formData.conditions.some(c => c.value.trim())) {
      return;
    }

    if (onAddQuery) {
      // Build query string from conditions
      const queryConditions = formData.conditions
        .filter(c => c.value.trim())
        .map(condition => `${condition.field} ${condition.operator} "${condition.value}"`)
        .join(` ${formData.logicalOperator} `);
      
      const selectedSource = availableDataSources.find(ds => ds.id === formData.dataSource);
      const timeFrameClause = formData.timeFrame ? ` AND ${getTimeFrameClause(formData.timeFrame, formData.customDateFrom, formData.customDateTo)}` : '';
      const queryString = `source="${selectedSource?.name || formData.dataSource}"${timeFrameClause}${queryConditions ? ` AND (${queryConditions})` : ''}`;

      const newQuery = {
        id: Date.now().toString(),
        status: "Pending" as const,
        queryName: formData.queryName,
        query: queryString,
        created: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
        results: "—"
      };

      onAddQuery(newQuery);
      onClose();
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
      <div className={`fixed right-0 top-0 h-full w-[800px] bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Create New Query</h2>
            <p className="text-sm text-slate-600">Build a query to search your dehydrated logs</p>
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
            
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Basic Information</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Query Name *
                </label>
                <input
                  type="text"
                  value={formData.queryName}
                  onChange={(e) => setFormData(prev => ({ ...prev, queryName: e.target.value }))}
                  placeholder="e.g., Security Events Last Week"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Data Source *
                </label>
                <select
                  value={formData.dataSource}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataSource: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  required
                >
                  <option value="">Select a data source...</option>
                  {availableDataSources.map(source => (
                    <option key={source.id} value={source.id}>{source.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Frame Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Time Frame</h3>
              
              <div className="space-y-3">
                <select
                  value={formData.timeFrame}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      timeFrame: e.target.value,
                      customDateFrom: e.target.value !== 'custom' ? '' : prev.customDateFrom,
                      customDateTo: e.target.value !== 'custom' ? '' : prev.customDateTo
                    }));
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                >
                  <option value="">No time filter</option>
                  {timeFrameOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
                
                {/* Custom Date Range Inputs */}
                {formData.timeFrame === 'custom' && (
                  <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        From Date
                      </label>
                      <input
                        type="date"
                        value={formData.customDateFrom}
                        onChange={(e) => setFormData(prev => ({ ...prev, customDateFrom: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        To Date
                      </label>
                      <input
                        type="date"
                        value={formData.customDateTo}
                        onChange={(e) => setFormData(prev => ({ ...prev, customDateTo: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Query Conditions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Query Conditions</h3>
                <div className="flex items-center gap-3">
                  <select
                    value={formData.logicalOperator}
                    onChange={(e) => setFormData(prev => ({ ...prev, logicalOperator: e.target.value }))}
                    className="px-3 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCondition}
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Rule
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {formData.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                    {/* Field Selection */}
                    <div className="flex-1">
                      <select
                        value={condition.field}
                        onChange={(e) => updateCondition(index, 'field', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors text-sm"
                      >
                        {fieldOptions.map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Operator Selection */}
                    <div className="flex-1">
                      <select
                        value={condition.operator}
                        onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors text-sm"
                      >
                        {operatorOptions.map(operator => (
                          <option key={operator} value={operator}>
                            {operator.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Value Input */}
                    <div className="flex-1">
                      <input
                        type="text"
                        value={condition.value}
                        onChange={(e) => updateCondition(index, 'value', e.target.value)}
                        placeholder="Enter value, regex, or number"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors text-sm"
                        required
                      />
                    </div>
                    
                    {/* Remove Button */}
                    {formData.conditions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCondition(index)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Query Preview */}
            {formData.dataSource && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Query Preview</h3>
                <div className="p-4 bg-slate-100 rounded-lg">
                  <code className="text-sm text-slate-800 font-mono break-all">
                    {(() => {
                      const selectedSource = availableDataSources.find(ds => ds.id === formData.dataSource);
                      const timeFrameClause = formData.timeFrame ? ` AND ${getTimeFrameClause(formData.timeFrame, formData.customDateFrom, formData.customDateTo)}` : '';
                      const queryConditions = formData.conditions
                        .filter(c => c.value.trim())
                        .map(condition => `${condition.field} ${condition.operator} "${condition.value}"`)
                        .join(` ${formData.logicalOperator} `);
                      
                      return `source="${selectedSource?.name || formData.dataSource}"${timeFrameClause}${queryConditions ? ` AND (${queryConditions})` : ''}`;
                    })()}
                  </code>
                </div>
              </div>
            )}

            {/* Info Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700">
                  After creating the query, it will be executed against your dehydrated logs in cold storage. This process may take several minutes depending on the time range and complexity.
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
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!formData.queryName.trim() || !formData.dataSource.trim() || !formData.conditions.some(c => c.value.trim())}
            >
              Create Query
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};