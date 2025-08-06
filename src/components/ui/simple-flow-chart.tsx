"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Database, Shield, Server, Cloud, Activity, Target, Shuffle } from 'lucide-react';

interface FlowNode {
  id: string;
  label: string;
  volume: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: 'source' | 'destination';
}

interface HubNode {
  id: 'hub';
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: 'hub';
}

export const SimpleFlowChart = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [showAllSources, setShowAllSources] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const INITIAL_SOURCES_LIMIT = 4;
  const SOURCES_PER_PAGE = 8;
  const MAX_DISPLAYABLE_SOURCES = 25;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2;

  const allSources: FlowNode[] = [
    { id: 'windows', label: 'Microsoft Windows Event Logs', volume: '12.3 GB/day', icon: Shield, type: 'source' },
    { id: 'linux', label: 'Red Hat Enterprise Linux Syslogs', volume: '10.8 GB/day', icon: Server, type: 'source' },
    { id: 'aws', label: 'Amazon Web Services CloudTrail', volume: '15.2 GB/day', icon: Cloud, type: 'source' },
    { id: 'entra', label: 'Microsoft Entra ID (Azure AD)', volume: '8.7 GB/day', icon: Database, type: 'source' },
    // Hidden sources that appear when expanded
    { id: 'firewall', label: 'Palo Alto Networks Firewall', volume: '14.6 GB/day', icon: Shield, type: 'source' },
    { id: 'nginx', label: 'Nginx Web Server Access Logs', volume: '9.2 GB/day', icon: Server, type: 'source' },
    { id: 'docker', label: 'Docker Container Runtime Logs', volume: '6.8 GB/day', icon: Database, type: 'source' },
    { id: 'apache', label: 'Apache HTTP Server Access Logs', volume: '11.4 GB/day', icon: Server, type: 'source' },
    { id: 'kubernetes', label: 'Kubernetes Cluster Event Logs', volume: '18.9 GB/day', icon: Cloud, type: 'source' },
    { id: 'mysql', label: 'MySQL Database Server Logs', volume: '5.3 GB/day', icon: Database, type: 'source' },
    { id: 'postgresql', label: 'PostgreSQL Database Logs', volume: '4.7 GB/day', icon: Database, type: 'source' },
    { id: 'redis', label: 'Redis Cache Server Logs', volume: '3.2 GB/day', icon: Database, type: 'source' },
    { id: 'jenkins', label: 'Jenkins CI/CD Pipeline Logs', volume: '7.8 GB/day', icon: Server, type: 'source' },
    { id: 'gitlab', label: 'GitLab Application Logs', volume: '6.1 GB/day', icon: Cloud, type: 'source' },
    { id: 'elasticsearch', label: 'Elasticsearch Cluster Logs', volume: '13.4 GB/day', icon: Database, type: 'source' },
    { id: 'mongodb', label: 'MongoDB Database Logs', volume: '8.9 GB/day', icon: Database, type: 'source' },
    { id: 'tomcat', label: 'Apache Tomcat Application Server', volume: '9.7 GB/day', icon: Server, type: 'source' },
    { id: 'iis', label: 'Microsoft IIS Web Server', volume: '11.2 GB/day', icon: Server, type: 'source' },
    { id: 'rabbitmq', label: 'RabbitMQ Message Broker', volume: '4.5 GB/day', icon: Cloud, type: 'source' },
    { id: 'kafka', label: 'Apache Kafka Streaming Logs', volume: '16.3 GB/day', icon: Cloud, type: 'source' },
    { id: 'haproxy', label: 'HAProxy Load Balancer', volume: '7.6 GB/day', icon: Server, type: 'source' },
    { id: 'vsphere', label: 'VMware vSphere Infrastructure', volume: '12.8 GB/day', icon: Cloud, type: 'source' },
    { id: 'office365', label: 'Microsoft Office 365 Logs', volume: '14.1 GB/day', icon: Cloud, type: 'source' },
    { id: 'salesforce', label: 'Salesforce Platform Logs', volume: '6.4 GB/day', icon: Cloud, type: 'source' },
    { id: 'okta', label: 'Okta Identity Management', volume: '5.8 GB/day', icon: Shield, type: 'source' },
    { id: 'crowdstrike', label: 'CrowdStrike Endpoint Protection', volume: '9.3 GB/day', icon: Shield, type: 'source' },
    { id: 'fortinet', label: 'Fortinet FortiGate Firewall', volume: '13.7 GB/day', icon: Shield, type: 'source' },
    { id: 'checkpoint', label: 'Check Point Security Gateway', volume: '10.5 GB/day', icon: Shield, type: 'source' },
    // Additional sources for testing 100+ scenario
    { id: 'zabbix', label: 'Zabbix Monitoring System', volume: '7.2 GB/day', icon: Activity, type: 'source' },
    { id: 'nagios', label: 'Nagios Core Monitoring', volume: '5.4 GB/day', icon: Activity, type: 'source' },
    { id: 'prometheus', label: 'Prometheus Metrics Server', volume: '11.8 GB/day', icon: Target, type: 'source' },
    { id: 'grafana', label: 'Grafana Analytics Platform', volume: '3.9 GB/day', icon: Target, type: 'source' },
    { id: 'azure', label: 'Microsoft Azure Activity Logs', volume: '19.5 GB/day', icon: Cloud, type: 'source' },
    { id: 'gcp', label: 'Google Cloud Platform Logs', volume: '16.7 GB/day', icon: Cloud, type: 'source' },
    { id: 'oracle', label: 'Oracle Database Server Logs', volume: '8.1 GB/day', icon: Database, type: 'source' },
    { id: 'cassandra', label: 'Apache Cassandra Cluster', volume: '12.3 GB/day', icon: Database, type: 'source' },
    { id: 'airflow', label: 'Apache Airflow Workflows', volume: '6.7 GB/day', icon: Cloud, type: 'source' },
    { id: 'spark', label: 'Apache Spark Processing', volume: '14.2 GB/day', icon: Server, type: 'source' }
  ];

  // Smart source display logic to handle large datasets
  const getVisibleSources = () => {
    if (!showAllSources) {
      return allSources.slice(0, INITIAL_SOURCES_LIMIT);
    }
    
    // When expanded, show all sources immediately in columns
    return allSources;
  };
  
  const visibleSources = getVisibleSources();
  const hiddenSourcesCount = showAllSources 
    ? 0 // No hidden sources when expanded - show all
    : allSources.length - INITIAL_SOURCES_LIMIT;

  const destinations: FlowNode[] = [
    { id: 'splunk', label: 'Splunk', volume: 'Active', icon: Activity, type: 'destination' },
    { id: 'datadog', label: 'Datadog', volume: 'Active', icon: Target, type: 'destination' },
    { id: 'elastic', label: 'Elastic', volume: 'Active', icon: Database, type: 'destination' },
    { id: 'sentinel', label: 'Sentinel', volume: 'Active', icon: Cloud, type: 'destination' }
  ];

  // Central hub that all sources connect through
  const hub = useCallback((): HubNode => ({
    id: 'hub',
    label: 'Data Processing Hub',
    description: 'All sources route through here',
    icon: Shuffle,
    type: 'hub'
  }), []);

  // Simplified Hub Architecture: No direct source-to-destination connections
  // All sources connect to hub, hub connects to all destinations

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isHovering && containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomLevel + delta));
        setZoomLevel(newZoom);
      }
    };

    if (isHovering) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isHovering, zoomLevel]);

  const handleContainerEnter = () => {
    setIsHovering(true);
  };

  const handleContainerLeave = () => {
    setIsHovering(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const resetView = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const getNodePosition = useCallback((nodeId: string, type: 'source' | 'destination' | 'hub', isExpandNode = false, columnIndex = 0) => {
    const containerWidth = 1200; // Increased width to accommodate more columns
    const containerHeight = 650;
    const SOURCES_PER_COLUMN = 10;
    const INITIAL_COLUMN_X = 280; // Fixed position for initial column
    
    if (type === 'source') {
      const nodeList = showAllSources ? allSources : visibleSources;
      let index = nodeList.findIndex(n => n.id === nodeId);
      
      if (isExpandNode) {
        index = visibleSources.length; // Position expand node after visible sources
      }
      
      // For the first 4 sources (initial column), ALWAYS keep them at the same position
      if (index < INITIAL_SOURCES_LIMIT) {
        // Original column positioning - never changes
        const totalNodes = INITIAL_SOURCES_LIMIT + (hiddenSourcesCount > 0 && !showAllSources ? 1 : 0);
        const availableHeight = containerHeight - 160;
        const minNodeSpacing = 85;
        const maxNodeSpacing = 110;
        
        let nodeSpacing = availableHeight / INITIAL_SOURCES_LIMIT; // Always base on initial sources
        nodeSpacing = Math.max(minNodeSpacing, Math.min(maxNodeSpacing, nodeSpacing));
        
        const totalUsedHeight = INITIAL_SOURCES_LIMIT * nodeSpacing;
        const startY = Math.max(30, (containerHeight - totalUsedHeight) / 2);
        
        return {
          x: INITIAL_COLUMN_X, // Always at this fixed position
          y: startY + (index * nodeSpacing)
        };
      }
      
      // Additional sources (only when expanded) - appear in columns to the left
      if (showAllSources && index >= INITIAL_SOURCES_LIMIT) {
        const additionalIndex = index - INITIAL_SOURCES_LIMIT;
        const column = Math.floor(additionalIndex / SOURCES_PER_COLUMN);
        const rowInColumn = additionalIndex % SOURCES_PER_COLUMN;
        
        const availableHeight = containerHeight - 160;
        const minNodeSpacing = 60;
        const maxNodeSpacing = 75;
        
        let nodeSpacing = availableHeight / SOURCES_PER_COLUMN;
        nodeSpacing = Math.max(minNodeSpacing, Math.min(maxNodeSpacing, nodeSpacing));
        
        const nodesInThisColumn = Math.min(SOURCES_PER_COLUMN, allSources.length - INITIAL_SOURCES_LIMIT - (column * SOURCES_PER_COLUMN));
        const totalUsedHeight = nodesInThisColumn * nodeSpacing;
        const startY = Math.max(30, (containerHeight - totalUsedHeight) / 2);
        
        return {
          x: INITIAL_COLUMN_X - ((column + 1) * 220), // Columns to the left of initial column
          y: startY + (rowInColumn * nodeSpacing)
        };
      }
      
      // Fallback for non-expanded view (should only be initial sources)
      const totalNodes = nodeList.length + (hiddenSourcesCount > 0 && !showAllSources ? 1 : 0);
      const availableHeight = containerHeight - 160;
      const minNodeSpacing = 85;
      const maxNodeSpacing = 110;
      
      let nodeSpacing = availableHeight / totalNodes;
      nodeSpacing = Math.max(minNodeSpacing, Math.min(maxNodeSpacing, nodeSpacing));
      
      const totalUsedHeight = totalNodes * nodeSpacing;
      const startY = Math.max(30, (containerHeight - totalUsedHeight) / 2);
      
      return {
        x: INITIAL_COLUMN_X,
        y: startY + (index * nodeSpacing)
      };
    } else if (type === 'destination') {
      const index = destinations.findIndex(n => n.id === nodeId);
      
      const availableHeight = containerHeight - 160;
      const minNodeSpacing = 100;
      const maxNodeSpacing = 140;
      
      let nodeSpacing = availableHeight / destinations.length;
      nodeSpacing = Math.max(minNodeSpacing, Math.min(maxNodeSpacing, nodeSpacing));
      
      const totalUsedHeight = destinations.length * nodeSpacing;
      const startY = Math.max(30, (containerHeight - totalUsedHeight) / 2);
      
      return {
        x: containerWidth - 260, // Fixed position for destinations
        y: startY + (index * nodeSpacing)
      };
    } else if (type === 'hub') {
      // Hub stays in fixed position regardless of source expansion
      return {
        x: containerWidth / 2 - 100, // Fixed center position
        y: containerHeight / 2 - 40  // Fixed center vertically
      };
    }
    
    return { x: 0, y: 0 }; // Fallback
  }, [showAllSources, visibleSources, hiddenSourcesCount, allSources, destinations]);

  // Render source-to-hub connections
  const renderSourceToHubConnection = useCallback((sourceId: string) => {
    const sourcePos = getNodePosition(sourceId, 'source');
    const hubPos = getNodePosition('hub', 'hub');
    
    const startX = sourcePos.x + 200; // Right edge of source node
    const startY = sourcePos.y + 30;  // Center of source node
    const endX = hubPos.x;            // Left edge of hub node  
    const endY = hubPos.y + 40;       // Center of hub node
    
    const isHighlighted = hoveredNode === sourceId || hoveredNode === 'hub';
    
    // Create smooth curve path that works better with multiple columns
    const controlPointOffset = Math.min(100, Math.abs(endX - startX) * 0.5);
    const midX1 = startX + controlPointOffset;
    const midX2 = endX - controlPointOffset;
    const path = `M ${startX} ${startY} C ${midX1} ${startY} ${midX2} ${endY} ${endX} ${endY}`;
    
    return (
      <path
        key={`source-to-hub-${sourceId}`}
        data-testid={`source-to-hub-${sourceId}`}
        d={path}
        stroke={isHighlighted ? "#8b5cf6" : "#94a3b8"}
        strokeWidth={isHighlighted ? 3 : 2}
        strokeDasharray={isHighlighted ? "6,3" : "5,3"}
        fill="none"
        className="transition-all duration-300"
        style={{
          filter: isHighlighted ? "drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))" : "drop-shadow(0 0 2px rgba(148, 163, 184, 0.2))",
          opacity: isHighlighted ? 1 : 0.7
        }}
      />
    );
  }, [hoveredNode, getNodePosition]);

  // Render hub-to-destination connections  
  const renderHubToDestConnection = useCallback((destinationId: string) => {
    const hubPos = getNodePosition('hub', 'hub');
    const destPos = getNodePosition(destinationId, 'destination');
    
    const startX = hubPos.x + 200;    // Right edge of hub node
    const startY = hubPos.y + 40;     // Center of hub node
    const endX = destPos.x;           // Left edge of destination node
    const endY = destPos.y + 30;      // Center of destination node
    
    const isHighlighted = hoveredNode === 'hub' || hoveredNode === destinationId;
    
    // Create smooth curve path with improved control points
    const controlPointOffset = Math.min(80, Math.abs(endX - startX) * 0.4);
    const midX1 = startX + controlPointOffset;
    const midX2 = endX - controlPointOffset;
    const path = `M ${startX} ${startY} C ${midX1} ${startY} ${midX2} ${endY} ${endX} ${endY}`;
    
    return (
      <path
        key={`hub-to-dest-${destinationId}`}
        data-testid={`hub-to-dest-${destinationId}`}
        d={path}
        stroke={isHighlighted ? "#8b5cf6" : "#94a3b8"}
        strokeWidth={isHighlighted ? 3 : 2}
        strokeDasharray={isHighlighted ? "6,3" : "5,3"}
        fill="none"
        className="transition-all duration-300"
        style={{
          filter: isHighlighted ? "drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))" : "drop-shadow(0 0 2px rgba(148, 163, 184, 0.2))",
          opacity: isHighlighted ? 1 : 0.7
        }}
      />
    );
  }, [hoveredNode, getNodePosition]);

  const renderExpandNode = () => {
    if (hiddenSourcesCount <= 0) return null;
    
    const isExpanded = showAllSources;
    const INITIAL_COLUMN_X = 280; // Same as in getNodePosition
    
    let position;
    if (!isExpanded) {
      // Position after the last visible source in the original column
      const lastVisibleIndex = visibleSources.length - 1;
      const lastVisiblePos = getNodePosition(visibleSources[lastVisibleIndex]?.id || 'dummy', 'source');
      position = {
        x: INITIAL_COLUMN_X, // Always at the initial column position
        y: lastVisiblePos.y + 95 // Space after last visible source
      };
    } else {
      // When expanded, show collapse button at bottom of original column (fixed position)
      position = {
        x: INITIAL_COLUMN_X, // Always at the initial column position
        y: 570 // Bottom of container
      };
    }
    
    const isHovered = hoveredNode === 'expand';
    
    return (
      <div
        key="expand-node"
        className={`absolute transition-all duration-300 cursor-pointer z-10 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: 200,
          height: 60
        }}
        onMouseEnter={() => setHoveredNode('expand')}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => {
          setShowAllSources(!showAllSources);
        }}
      >
        <div className={`
          w-full h-full rounded-lg border-2 transition-all duration-300 
          flex items-center justify-center
          ${
            isHovered 
              ? 'bg-purple-50 border-purple-300 shadow-lg shadow-purple-100' 
              : 'bg-purple-25 border-purple-200 border-dashed hover:border-purple-300'
          }
        `}>
          <div className={`
            text-xs font-medium transition-all duration-300 text-center
            ${isHovered ? 'text-purple-700' : 'text-purple-600'}
          `}>
            {isExpanded ? (
              <>
                <div>Show less</div>
                <div className="text-xs opacity-75">Click to collapse</div>
              </>
            ) : (
              <>
                <div>+{hiddenSourcesCount} others</div>
                <div className="text-xs opacity-75">Click to expand</div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render hub node with special styling
  const renderHubNode = useCallback(() => {
    const position = getNodePosition('hub', 'hub');
    const isHovered = hoveredNode === 'hub';
    const isConnected = hoveredNode !== null && hoveredNode !== 'hub'; // Hub is always "connected" when any other node is hovered
    const hubData = hub();
    
    return (
      <div
        key="hub"
        data-testid="hub-node"
        className={`absolute transition-all duration-300 hub-node ${
          isHovered ? 'scale-110 z-20' : isConnected ? 'scale-105' : 'scale-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: 200,
          height: 80 // Slightly taller than regular nodes
        }}
        onMouseEnter={() => setHoveredNode('hub')}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <div className={`
          w-full h-full rounded-lg border-2 transition-all duration-300 cursor-pointer
          flex flex-col items-center justify-center px-3 gap-1
          ${isHovered 
            ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300 shadow-xl shadow-purple-200' 
            : isConnected
            ? 'bg-gradient-to-br from-purple-25 to-purple-50 border-purple-200'
            : 'bg-gradient-to-br from-slate-50 to-purple-25 border-purple-200 hover:border-purple-300'
          }
        `}>
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
            ${isHovered 
              ? 'bg-purple-200' 
              : isConnected 
              ? 'bg-purple-100'
              : 'bg-purple-50'
            }
          `}>
            <hubData.icon className={`
              w-5 h-5 transition-all duration-300
              ${isHovered 
                ? 'text-purple-700' 
                : isConnected
                ? 'text-purple-600'
                : 'text-purple-500'
              }
            `} />
          </div>
          <div className="text-center">
            <div className={`
              text-xs font-semibold transition-all duration-300 leading-tight
              ${isHovered 
                ? 'text-purple-900' 
                : isConnected
                ? 'text-purple-800'
                : 'text-purple-700'
              }
            `}>
              {hubData.label}
            </div>
            <div className={`
              text-xs transition-all duration-300 truncate
              ${isHovered 
                ? 'text-purple-700' 
                : isConnected
                ? 'text-purple-600'
                : 'text-purple-500'
              }
            `}>
              {hubData.description}
            </div>
          </div>
        </div>
      </div>
    );
  }, [hoveredNode, getNodePosition, hub]);

  const renderNode = useCallback((node: FlowNode) => {
    const position = getNodePosition(node.id, node.type);
    const isHovered = hoveredNode === node.id;
    const isConnected = hoveredNode === 'hub' || (hoveredNode !== null && hoveredNode !== node.id);
    
    return (
      <div
        key={node.id}
        data-testid={`${node.type}-node-${node.id}`}
        className={`absolute transition-all duration-300 ${
          isHovered ? 'scale-105 z-10' : isConnected && hoveredNode === 'hub' ? 'scale-102' : 'scale-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: 200,
          height: 60
        }}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <div className={`
          w-full h-full rounded-lg border transition-all duration-300 cursor-pointer
          flex items-center px-3 gap-2
          ${isHovered 
            ? 'bg-purple-50 border-purple-200 shadow-lg shadow-purple-100' 
            : (isConnected && hoveredNode === 'hub')
            ? 'bg-purple-25 border-purple-100'
            : 'bg-white border-slate-200 hover:border-slate-300'
          }
        `}>
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
            ${isHovered 
              ? 'bg-purple-100' 
              : (isConnected && hoveredNode === 'hub')
              ? 'bg-purple-50'
              : 'bg-slate-50'
            }
          `}>
            <node.icon className={`
              w-4 h-4 transition-all duration-300
              ${isHovered 
                ? 'text-purple-600' 
                : (isConnected && hoveredNode === 'hub')
                ? 'text-purple-500'
                : 'text-slate-500'
              }
            `} />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`
              text-xs font-medium transition-all duration-300 leading-tight
              ${isHovered 
                ? 'text-purple-900' 
                : (isConnected && hoveredNode === 'hub')
                ? 'text-purple-700'
                : 'text-slate-700'
              }
            `}>
              {node.label}
            </div>
            <div className={`
              text-xs transition-all duration-300 truncate
              ${isHovered 
                ? 'text-purple-600' 
                : (isConnected && hoveredNode === 'hub')
                ? 'text-purple-500'
                : 'text-slate-500'
              }
            `}>
              {node.volume}
            </div>
          </div>
        </div>
      </div>
    );
  }, [hoveredNode, getNodePosition]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Data Flow Overview</h3>
          <p className="text-slate-600 text-sm">Interactive visualization of log sources connecting to SIEM destinations</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetView}
            className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 transition-colors"
          >
            Reset View
          </button>
          <div className="text-xs text-slate-500">
            Zoom: {Math.round(zoomLevel * 100)}%
          </div>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative h-[650px] bg-gradient-to-br from-slate-50 to-purple-50/30 rounded-lg border border-slate-100 overflow-hidden flex items-center justify-center select-none"
        onMouseEnter={handleContainerEnter}
        onMouseLeave={() => {
          handleContainerLeave();
          handleMouseUp();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)`,
            backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`
          }}
        />
        
        {/* Centered container with zoom and pan */}
        <div 
          className="relative w-[1200px] h-full" // Updated width to accommodate more columns
          data-testid="flow-chart-container"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
            transformOrigin: 'center center'
          }}
        >
          {/* SVG for connections - layered behind nodes with z-index */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            data-testid="connection-svg"
            style={{ zIndex: 0 }}
          >
            {/* Source-to-hub connections */}
            {visibleSources.map(source => renderSourceToHubConnection(source.id))}
            
            {/* Hub-to-destination connections */}
            {destinations.map(destination => renderHubToDestConnection(destination.id))}
          </svg>
          
          {/* All nodes layered above connections with higher z-index */}
          <div className="relative z-10">
            {/* Source nodes */}
            {visibleSources.map(renderNode)}
            
            {/* Hub node */}
            {renderHubNode()}
            
            {/* Expand node */}
            {renderExpandNode()}
            
            {/* Destination nodes */}
            {destinations.map(renderNode)}
          </div>
        </div>
        
        {/* Zoom instructions */}
        <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-white/80 px-2 py-1 rounded border border-slate-200">
          Scroll to zoom • Drag to pan
        </div>
      </div>
    </div>
  );
};