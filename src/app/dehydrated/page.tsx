"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Database, Play, CheckCircle, HardDrive, Search, Eye, MoreVertical, X, Info, Download, RefreshCw, Loader } from "lucide-react";
import { useState, useEffect } from "react";

interface QueryHistory {
  id: string;
  status: "Completed" | "Running" | "Failed" | "Pending";
  queryName: string;
  query: string;
  created: string;
  results: string;
  resultsSize?: string;
  dehydrationStatus?: "none" | "dehydrating" | "completed";
  dehydrationDestination?: string;
  completedTime?: string;
  estimatedCost?: string;
  logSources?: string[];
}

export default function DehydratedLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<QueryHistory | null>(null);
  const [queries, setQueries] = useState<QueryHistory[]>([
    {
      id: "1",
      status: "Completed",
      queryName: "Security Events Last Week",
      query: 'source="security-logs" AND timestamp >= "2024-01-01" AND timestamp < "2024-01-08" AND message CONTAINS "failed login"',
      created: "2024-01-08 14:30:00",
      results: "15,420 logs",
      resultsSize: "2.4 GB",
      dehydrationStatus: "none",
      completedTime: "2024-01-08 14:32:15",
      estimatedCost: "$0.12",
      logSources: ["firewall-logs", "auth-server", "vpn-gateway"]
    },
    {
      id: "2",
      status: "Running",
      queryName: "Application Errors December",
      query: 'level="ERROR" AND timestamp >= "2023-12-01"',
      created: "2024-01-08 15:45:00",
      results: "—",
      dehydrationStatus: "none"
    },
    {
      id: "3",
      status: "Failed",
      queryName: "Network Traffic Analysis",
      query: 'source="network-logs" AND bytes > 1000000',
      created: "2024-01-08 16:00:00",
      results: "Query timeout - dataset too large",
      dehydrationStatus: "none"
    },
    {
      id: "4",
      status: "Completed",
      queryName: "Authentication Failures",
      query: 'message CONTAINS "authentication failed" AND level="WARNING"',
      created: "2024-01-07 09:15:00",
      results: "3,247 logs",
      resultsSize: "892 MB",
      dehydrationStatus: "none",
      completedTime: "2024-01-07 09:18:32",
      estimatedCost: "$0.08",
      logSources: ["auth-server", "web-gateway"]
    },
    {
      id: "5",
      status: "Completed",
      queryName: "Database Performance Issues",
      query: 'source="database-logs" AND message CONTAINS "slow query"',
      created: "2024-01-06 16:22:00",
      results: "1,854 logs",
      resultsSize: "445 MB",
      dehydrationStatus: "none",
      completedTime: "2024-01-06 16:25:18",
      estimatedCost: "$0.04",
      logSources: ["mysql-primary", "postgres-replica"]
    }
  ]);

  const [formData, setFormData] = useState({
    queryName: "",
    s3Query: ""
  });

  const [selectedDestination, setSelectedDestination] = useState("");

  const destinations = [
    { id: "splunk", name: "Splunk Production", type: "Splunk" },
    { id: "elasticsearch", name: "Elasticsearch Dev", type: "Elasticsearch" },
    { id: "azure-sentinel", name: "Azure Sentinel", type: "Azure Sentinel" },
    { id: "datadog", name: "Datadog", type: "Datadog" }
  ];

  // Mock functionality for query lifecycle
  const simulateQueryProgress = (queryId: string) => {
    // Pending -> Running after 2 seconds
    setTimeout(() => {
      setQueries(prev => prev.map(q => 
        q.id === queryId ? { ...q, status: "Running" as const } : q
      ));
    }, 2000);

    // Running -> Completed after 6 seconds total
    setTimeout(() => {
      const mockResults = [
        { logs: "8,234 logs", size: "1.2 GB" },
        { logs: "12,567 logs", size: "2.8 GB" },
        { logs: "4,891 logs", size: "756 MB" },
        { logs: "19,432 logs", size: "3.4 GB" }
      ];
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      
      setQueries(prev => prev.map(q => 
        q.id === queryId ? { 
          ...q, 
          status: "Completed" as const,
          results: result.logs,
          resultsSize: result.size
        } : q
      ));
    }, 6000);
  };

  const handleCreateQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.queryName.trim() || !formData.s3Query.trim()) return;

    const newQuery: QueryHistory = {
      id: Date.now().toString(),
      status: "Pending",
      queryName: formData.queryName,
      query: formData.s3Query,
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

    setQueries(prev => [newQuery, ...prev]);
    simulateQueryProgress(newQuery.id);
    
    setFormData({ queryName: "", s3Query: "" });
    setIsModalOpen(false);
  };

  const handleViewResults = (query: QueryHistory) => {
    setSelectedQuery(query);
    setIsResultsModalOpen(true);
  };

  const handleDehydrate = () => {
    if (!selectedQuery || !selectedDestination) return;

    const destination = destinations.find(d => d.id === selectedDestination);
    if (!destination) return;

    // Start dehydration process
    setQueries(prev => prev.map(q => 
      q.id === selectedQuery.id ? {
        ...q,
        dehydrationStatus: "dehydrating" as const
      } : q
    ));

    // Complete dehydration after 3 seconds
    setTimeout(() => {
      setQueries(prev => prev.map(q => 
        q.id === selectedQuery.id ? {
          ...q,
          dehydrationStatus: "completed" as const,
          dehydrationDestination: destination.type
        } : q
      ));
    }, 3000);

    setIsResultsModalOpen(false);
    setSelectedDestination("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Running":
        return <Play className="h-4 w-4 text-blue-600" />;
      case "Pending":
        return <div className="h-4 w-4 rounded-full bg-yellow-500 animate-pulse" />;
      case "Failed":
        return <div className="h-4 w-4 rounded-full bg-red-600 flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>;
      default:
        return null;
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-700";
      case "Running":
        return "text-blue-700";
      case "Pending":
        return "text-yellow-700";
      case "Failed":
        return "text-red-700";
      default:
        return "text-slate-700";
    }
  };

  // Calculate metrics from current queries
  const metrics = {
    totalQueries: queries.length,
    runningQueries: queries.filter(q => q.status === "Running" || q.status === "Pending").length,
    completedToday: queries.filter(q => {
      const today = new Date().toDateString();
      const queryDate = new Date(q.created).toDateString();
      return queryDate === today && q.status === "Completed";
    }).length,
    storageRetrieved: queries
      .filter(q => q.status === "Completed" && q.resultsSize)
      .reduce((total, q) => {
        const size = q.resultsSize!;
        const value = parseFloat(size);
        if (size.includes("GB")) return total + value;
        if (size.includes("MB")) return total + value / 1024;
        return total;
      }, 0)
      .toFixed(1) + " GB"
  };

  const getResultsContent = (query: QueryHistory) => {
    if (query.status === "Completed" && query.resultsSize) {
      return (
        <div className="text-sm text-slate-900">
          <div>{query.results}</div>
          <div className="text-xs text-slate-500">{query.resultsSize}</div>
        </div>
      );
    } else if (query.status === "Running") {
      return <span className="text-sm text-slate-500">—</span>;
    } else {
      return <span className="text-sm text-red-600">{query.results}</span>;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Dehydrated Logs</h1>
                  <p className="text-slate-600 mt-1">Query and retrieve filtered logs from cold storage (AWS S3)</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Queries"
                value={metrics.totalQueries.toString()}
                icon={Database}
              />
              <MetricCard
                title="Running Queries"
                value={metrics.runningQueries.toString()}
                icon={Play}
              />
              <MetricCard
                title="Completed Today"
                value={metrics.completedToday.toString()}
                icon={CheckCircle}
              />
              <MetricCard
                title="Storage Retrieved"
                value={metrics.storageRetrieved}
                icon={HardDrive}
              />
            </div>
            
            {/* Query History Section */}
            <div className="relative">
              {/* Button positioned above table component */}
              <div className="flex justify-end mb-4">
                <Button 
                  className="bg-brand-primary text-white hover:bg-brand-dark"
                  onClick={() => setIsModalOpen(true)}
                >
                  + New Query
                </Button>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="h-5 w-5 text-slate-500" />
                    <h2 className="text-lg font-semibold text-slate-900">Query History</h2>
                  </div>
                </div>
                
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Status</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Query Name</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Query</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Created</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Results</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Dehydration</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {queries.map((query) => (
                        <tr key={query.id} className="hover:bg-slate-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(query.status)}
                              <span className={`text-sm font-medium ${getStatusColors(query.status)}`}>
                                {query.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm font-medium text-slate-900">{query.queryName}</span>
                          </td>
                          <td className="py-4 px-6">
                            <code className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono">
                              {query.query}
                            </code>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-slate-600">{query.created}</span>
                          </td>
                          <td className="py-4 px-6">
                            {getResultsContent(query)}
                          </td>
                          <td className="py-4 px-6">
                            {query.status === "Completed" && (
                              <>
                                {query.dehydrationStatus === "none" && (
                                  <span className="text-sm text-slate-500">—</span>
                                )}
                                {query.dehydrationStatus === "dehydrating" && (
                                  <div className="flex items-center gap-2">
                                    <Loader className="h-4 w-4 animate-spin text-blue-600" />
                                    <span className="text-sm text-blue-700">Dehydrating...</span>
                                  </div>
                                )}
                                {query.dehydrationStatus === "completed" && (
                                  <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-200">
                                    {query.dehydrationDestination}
                                  </span>
                                )}
                              </>
                            )}
                            {query.status !== "Completed" && (
                              <span className="text-sm text-slate-400">—</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {query.status === "Completed" ? (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-brand-primary hover:text-brand-dark"
                                onClick={() => handleViewResults(query)}
                              >
                                View Results
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            )}
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

      {/* Create New Query Modal */}
      {isModalOpen && (
        <>
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">Create New Query</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex">
                {/* Form Section */}
                <div className="flex-1 p-6">
                  <form onSubmit={handleCreateQuery} className="space-y-6">
                    {/* Query Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Query Name
                      </label>
                      <input
                        type="text"
                        value={formData.queryName}
                        onChange={(e) => setFormData(prev => ({ ...prev, queryName: e.target.value }))}
                        placeholder="e.g., Security Events Last Week"
                        className="w-full px-3 py-2 border border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* S3 Query */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        S3 Query
                      </label>
                      <textarea
                        value={formData.s3Query}
                        onChange={(e) => setFormData(prev => ({ ...prev, s3Query: e.target.value }))}
                        placeholder="Enter your S3 query using SQL-like syntax..."
                        rows={6}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors resize-none font-mono text-sm"
                        required
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="submit"
                        className="bg-brand-primary text-white hover:bg-brand-dark"
                      >
                        Create Query
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Query Syntax Help Section */}
                <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-5 w-5 text-brand-primary" />
                    <h3 className="font-semibold text-slate-900">Query Syntax</h3>
                  </div>

                  {/* Supported Operators */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Supported Operators:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex gap-2">
                        <code className="bg-slate-200 px-1 rounded text-xs">AND</code>
                        <code className="bg-slate-200 px-1 rounded text-xs">OR</code>
                        <code className="bg-slate-200 px-1 rounded text-xs">NOT</code>
                        <code className="bg-slate-200 px-1 rounded text-xs">CONTAINS</code>
                      </div>
                      <div className="flex gap-2">
                        <code className="bg-slate-200 px-1 rounded text-xs">=</code>
                        <code className="bg-slate-200 px-1 rounded text-xs">&gt;=</code>
                        <code className="bg-slate-200 px-1 rounded text-xs">&lt;=</code>
                      </div>
                    </div>
                  </div>

                  {/* Common Fields */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Common Fields:</h4>
                    <div className="space-y-1 text-xs text-slate-600">
                      <div><code className="bg-slate-200 px-1 rounded">timestamp</code></div>
                      <div><code className="bg-slate-200 px-1 rounded">source</code></div>
                      <div><code className="bg-slate-200 px-1 rounded">level</code></div>
                      <div><code className="bg-slate-200 px-1 rounded">message</code></div>
                      <div><code className="bg-slate-200 px-1 rounded">host</code></div>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-700">Examples</h4>
                    
                    <div>
                      <h5 className="text-xs font-medium text-slate-600 mb-1">Time Range Query</h5>
                      <code className="block text-xs bg-slate-200 p-2 rounded">
                        timestamp &gt;= "2024-01-01" AND timestamp &lt; "2024-01-08"
                      </code>
                      <p className="text-xs text-slate-500 mt-1">Filter logs by date range</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-slate-600 mb-1">Source Filter</h5>
                      <code className="block text-xs bg-slate-200 p-2 rounded">
                        source="application-logs" OR source="error-logs"
                      </code>
                      <p className="text-xs text-slate-500 mt-1">Query specific log sources</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-slate-600 mb-1">Text Search</h5>
                      <code className="block text-xs bg-slate-200 p-2 rounded">
                        message CONTAINS "error" AND level="ERROR"
                      </code>
                      <p className="text-xs text-slate-500 mt-1">Search for text within log messages</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-slate-600 mb-1">Complex Query</h5>
                      <code className="block text-xs bg-slate-200 p-2 rounded">
                        source="security" AND (level="WARN" OR level="ERROR") AND timestamp &gt;= "2024-01-01"
                      </code>
                      <p className="text-xs text-slate-500 mt-1">Combine multiple conditions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Query Results Modal */}
      {isResultsModalOpen && selectedQuery && (
        <>
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsResultsModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">
                  Query Results: {selectedQuery.queryName}
                </h2>
                <button 
                  onClick={() => setIsResultsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                
                {/* Query Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Query Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-1">Query:</p>
                      <code className="block text-sm bg-slate-100 p-3 rounded-lg text-slate-800 font-mono">
                        {selectedQuery.query}
                      </code>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-1">Created:</p>
                        <p className="text-sm text-slate-600">{selectedQuery.created}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-1">Completed:</p>
                        <p className="text-sm text-slate-600">{selectedQuery.completedTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="bg-slate-50 rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Results Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{selectedQuery.results?.split(' ')[0]}</p>
                      <p className="text-sm text-slate-600">Total Logs Found</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{selectedQuery.resultsSize}</p>
                      <p className="text-sm text-slate-600">Data Size</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{selectedQuery.estimatedCost}</p>
                      <p className="text-sm text-slate-600">Estimated Cost</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{selectedQuery.logSources?.length || 0}</p>
                      <p className="text-sm text-slate-600">Log Sources</p>
                    </div>
                  </div>

                  {selectedQuery.logSources && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedQuery.logSources.map((source, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Actions</h3>
                  
                  {/* Download as CSV */}
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-900">Download as CSV</p>
                        <p className="text-sm text-slate-600">Export all {selectedQuery.results} to CSV file</p>
                      </div>
                    </div>
                    <Button className="bg-brand-primary text-white hover:bg-brand-dark">
                      Download
                    </Button>
                  </div>

                  {/* Dehydrate to Destination */}
                  <div className="flex items-start justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-slate-900">Dehydrate to Destination</p>
                        <p className="text-sm text-slate-600">Send logs back to a live SIEM for analysis</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <select
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                        className="text-sm border border-slate-300 rounded px-3 py-1 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                      >
                        <option value="">Select destination...</option>
                        {destinations.map(dest => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name} - {dest.type}
                          </option>
                        ))}
                      </select>
                      <Button 
                        onClick={handleDehydrate}
                        disabled={!selectedDestination}
                        className="bg-green-600 text-white hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-sm px-3 py-1"
                      >
                        Dehydrate
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <Button 
                    variant="outline"
                    onClick={() => setIsResultsModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}