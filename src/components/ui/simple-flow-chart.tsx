"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Database, Shield, Server, Cloud, Activity, Target } from 'lucide-react';

interface FlowNode {
  id: string;
  label: string;
  volume: string;
  icon: React.ComponentType<any>;
  type: 'source' | 'destination';
}

interface FlowConnection {
  source: string;
  destination: string;
}

export const SimpleFlowChart = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandedSources, setExpandedSources] = useState(false);
  const [showAllSources, setShowAllSources] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const INITIAL_SOURCES_LIMIT = 4;
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
    { id: 'checkpoint', label: 'Check Point Security Gateway', volume: '10.5 GB/day', icon: Shield, type: 'source' }
  ];

  const visibleSources = showAllSources ? allSources : allSources.slice(0, INITIAL_SOURCES_LIMIT);
  const hiddenSourcesCount = allSources.length - INITIAL_SOURCES_LIMIT;

  const destinations: FlowNode[] = [
    { id: 'splunk', label: 'Splunk', volume: 'Active', icon: Activity, type: 'destination' },
    { id: 'datadog', label: 'Datadog', volume: 'Active', icon: Target, type: 'destination' },
    { id: 'elastic', label: 'Elastic', volume: 'Active', icon: Database, type: 'destination' },
    { id: 'sentinel', label: 'Sentinel', volume: 'Active', icon: Cloud, type: 'destination' }
  ];

  const allConnections: FlowConnection[] = [
    // Initial visible sources
    { source: 'windows', destination: 'splunk' },
    { source: 'windows', destination: 'sentinel' },
    { source: 'linux', destination: 'datadog' },
    { source: 'linux', destination: 'elastic' },
    { source: 'aws', destination: 'splunk' },
    { source: 'aws', destination: 'datadog' },
    { source: 'aws', destination: 'sentinel' },
    { source: 'entra', destination: 'sentinel' },
    { source: 'entra', destination: 'elastic' },
    // Expanded sources connections
    { source: 'firewall', destination: 'splunk' },
    { source: 'firewall', destination: 'elastic' },
    { source: 'nginx', destination: 'datadog' },
    { source: 'docker', destination: 'elastic' },
    { source: 'apache', destination: 'splunk' },
    { source: 'kubernetes', destination: 'datadog' },
    { source: 'kubernetes', destination: 'elastic' },
    { source: 'mysql', destination: 'splunk' },
    { source: 'postgresql', destination: 'datadog' },
    { source: 'postgresql', destination: 'elastic' },
    { source: 'redis', destination: 'elastic' },
    { source: 'jenkins', destination: 'splunk' },
    { source: 'jenkins', destination: 'datadog' },
    { source: 'gitlab', destination: 'datadog' },
    { source: 'elasticsearch', destination: 'elastic' },
    { source: 'mongodb', destination: 'splunk' },
    { source: 'mongodb', destination: 'datadog' },
    { source: 'tomcat', destination: 'splunk' },
    { source: 'iis', destination: 'sentinel' },
    { source: 'rabbitmq', destination: 'datadog' },
    { source: 'kafka', destination: 'elastic' },
    { source: 'kafka', destination: 'splunk' },
    { source: 'haproxy', destination: 'datadog' },
    { source: 'vsphere', destination: 'splunk' },
    { source: 'vsphere', destination: 'sentinel' },
    { source: 'office365', destination: 'sentinel' },
    { source: 'salesforce', destination: 'splunk' },
    { source: 'okta', destination: 'sentinel' },
    { source: 'crowdstrike', destination: 'splunk' },
    { source: 'crowdstrike', destination: 'sentinel' },
    { source: 'fortinet', destination: 'splunk' },
    { source: 'fortinet', destination: 'elastic' },
    { source: 'checkpoint', destination: 'splunk' },
    { source: 'checkpoint', destination: 'sentinel' }
  ];

  const visibleConnections = showAllSources 
    ? allConnections 
    : allConnections.filter(conn => visibleSources.some(source => source.id === conn.source));

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

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const getNodePosition = (nodeId: string, type: 'source' | 'destination', isExpandNode = false) => {
    const containerWidth = 700;
    const containerHeight = 650;
    
    if (type === 'source') {
      const nodeList = showAllSources ? allSources : visibleSources;
      let index = nodeList.findIndex(n => n.id === nodeId);
      
      if (isExpandNode) {
        index = visibleSources.length; // Position expand node after visible sources
      }
      
      // Calculate spacing to fit all nodes properly
      const totalNodes = nodeList.length + (hiddenSourcesCount > 0 && !showAllSources ? 1 : 0);
      const availableHeight = containerHeight - 100; // Leave margins
      const nodeSpacing = Math.min(90, Math.max(50, availableHeight / totalNodes));
      const totalUsedHeight = totalNodes * nodeSpacing;
      const startY = Math.max(20, (containerHeight - totalUsedHeight) / 2);
      
      return {
        x: 80,
        y: startY + (index * nodeSpacing)
      };
    } else {
      const index = destinations.findIndex(n => n.id === nodeId);
      
      // Calculate spacing for destinations to distribute evenly
      const availableHeight = containerHeight - 100; // Leave margins
      const nodeSpacing = Math.min(90, Math.max(50, availableHeight / destinations.length));
      const totalUsedHeight = destinations.length * nodeSpacing;
      const startY = Math.max(20, (containerHeight - totalUsedHeight) / 2);
      
      return {
        x: containerWidth - 220,
        y: startY + (index * nodeSpacing)
      };
    }
  };

  const renderConnection = (connection: FlowConnection) => {
    const sourcePos = getNodePosition(connection.source, 'source');
    const destPos = getNodePosition(connection.destination, 'destination');
    
    const startX = sourcePos.x + 200;
    const startY = sourcePos.y + 30;
    const endX = destPos.x;
    const endY = destPos.y + 30;
    
    const isHighlighted = hoveredNode === connection.source || hoveredNode === connection.destination;
    
    // Create smooth curve path
    const midX = (startX + endX) / 2;
    const path = `M ${startX} ${startY} Q ${midX} ${startY} ${midX} ${(startY + endY) / 2} Q ${midX} ${endY} ${endX} ${endY}`;
    
    return (
      <path
        key={`${connection.source}-${connection.destination}`}
        d={path}
        stroke={isHighlighted ? "#8b5cf6" : "#e2e8f0"}
        strokeWidth={isHighlighted ? 2 : 1}
        strokeDasharray="4,4"
        fill="none"
        className="transition-all duration-300"
        style={{
          filter: isHighlighted ? "drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))" : "none"
        }}
      />
    );
  };

  const renderExpandNode = () => {
    if (hiddenSourcesCount <= 0) return null;
    
    const position = getNodePosition('expand', 'source', true);
    const isHovered = hoveredNode === 'expand';
    const isExpanded = showAllSources;
    
    return (
      <div
        key="expand-node"
        className={`absolute transition-all duration-300 cursor-pointer ${
          isHovered ? 'scale-105 z-10' : 'scale-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: 200,
          height: 60
        }}
        onMouseEnter={() => setHoveredNode('expand')}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => setShowAllSources(!showAllSources)}
      >
        <div className={`
          w-full h-full rounded-lg border-2 transition-all duration-300 
          flex items-center justify-center
          ${isHovered 
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

  const renderNode = (node: FlowNode) => {
    const position = getNodePosition(node.id, node.type);
    const isHovered = hoveredNode === node.id;
    const isConnected = hoveredNode && visibleConnections.some(c => 
      (c.source === node.id && c.destination === hoveredNode) ||
      (c.destination === node.id && c.source === hoveredNode)
    );
    
    return (
      <div
        key={node.id}
        className={`absolute transition-all duration-300 ${
          isHovered ? 'scale-105 z-10' : isConnected ? 'scale-102' : 'scale-100'
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
            : isConnected
            ? 'bg-purple-25 border-purple-100'
            : 'bg-white border-slate-200 hover:border-slate-300'
          }
        `}>
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
            ${isHovered 
              ? 'bg-purple-100' 
              : isConnected 
              ? 'bg-purple-50'
              : 'bg-slate-50'
            }
          `}>
            <node.icon className={`
              w-4 h-4 transition-all duration-300
              ${isHovered 
                ? 'text-purple-600' 
                : isConnected
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
                : isConnected
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
                : isConnected
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
  };

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
          className="relative w-[700px] h-full"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
            transformOrigin: 'center center'
          }}
        >
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {visibleConnections.map(renderConnection)}
          </svg>
          
          {/* Source nodes */}
          {visibleSources.map(renderNode)}
          
          {/* Expand node */}
          {renderExpandNode()}
          
          {/* Destination nodes */}
          {destinations.map(renderNode)}
        </div>
        
        {/* Zoom instructions */}
        <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-white/80 px-2 py-1 rounded border border-slate-200">
          Scroll to zoom • Drag to pan
        </div>
      </div>
    </div>
  );
};