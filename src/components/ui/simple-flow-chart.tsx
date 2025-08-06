"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Database, Shield, Server, Cloud, Activity, Target, Shuffle } from 'lucide-react';

interface FlowNode {
  id: string;
  label: string;
  volume: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: 'source' | 'destination';
  destinations?: string[]; // For sources: which destinations they connect to
}

interface HubNode {
  id: 'hub';
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: 'hub';
}

// Memoized Node Component to prevent unnecessary re-renders
const MemoizedNode = React.memo(({ 
  node, 
  position, 
  isHovered, 
  isConnected, 
  onMouseEnter, 
  onMouseLeave 
}: {
  node: FlowNode;
  position: { x: number; y: number };
  isHovered: boolean;
  isConnected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  return (
    <div
      data-testid={`${node.type}-node-${node.id}`}
      className={`absolute transition-all duration-300 ${
        isHovered ? 'scale-105 z-10' : isConnected ? 'scale-102' : 'scale-100'
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: 200,
        height: 60,
        transform: `translate3d(0, 0, 0)` // Force hardware acceleration
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
});

MemoizedNode.displayName = 'MemoizedNode';

// Memoized Hub Node Component
const MemoizedHubNode = React.memo(({ 
  position, 
  isHovered, 
  isConnected, 
  onMouseEnter, 
  onMouseLeave,
  hubData 
}: {
  position: { x: number; y: number };
  isHovered: boolean;
  isConnected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hubData: HubNode;
}) => {
  return (
    <div
      data-testid="hub-node"
      className={`absolute transition-all duration-300 hub-node ${
        isHovered ? 'scale-110 z-20' : isConnected ? 'scale-105' : 'scale-100'
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: 200,
        height: 80,
        transform: `translate3d(0, 0, 0)` // Force hardware acceleration
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
});

MemoizedHubNode.displayName = 'MemoizedHubNode';

// Memoized Connection Component
const MemoizedConnection = React.memo(({ 
  path, 
  isHighlighted, 
  testId 
}: {
  path: string;
  isHighlighted: boolean;
  testId: string;
}) => {
  return (
    <path
      data-testid={testId}
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
});

MemoizedConnection.displayName = 'MemoizedConnection';

export const SimpleFlowChart = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [showExpandedList, setShowExpandedList] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const INITIAL_SOURCES_LIMIT = 10;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2;

  // Memoized static data - never changes during component lifecycle
  const allSources: FlowNode[] = useMemo(() => [
    { id: 'windows', label: 'Microsoft Windows Event Logs', volume: '12.3 GB/day', icon: Shield, type: 'source', destinations: ['splunk', 'sentinel'] },
    { id: 'linux', label: 'Red Hat Enterprise Linux Syslogs', volume: '10.8 GB/day', icon: Server, type: 'source', destinations: ['elastic', 'datadog'] },
    { id: 'aws', label: 'Amazon Web Services CloudTrail', volume: '15.2 GB/day', icon: Cloud, type: 'source', destinations: ['splunk', 'datadog', 'sentinel'] },
    { id: 'entra', label: 'Microsoft Entra ID (Azure AD)', volume: '8.7 GB/day', icon: Database, type: 'source', destinations: ['sentinel', 'splunk'] },
    { id: 'firewall', label: 'Palo Alto Networks Firewall', volume: '14.6 GB/day', icon: Shield, type: 'source', destinations: ['splunk', 'sentinel'] },
    { id: 'nginx', label: 'Nginx Web Server Access Logs', volume: '9.2 GB/day', icon: Server, type: 'source', destinations: ['elastic', 'datadog'] },
    { id: 'docker', label: 'Docker Container Runtime Logs', volume: '6.8 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'datadog'] },
    { id: 'apache', label: 'Apache HTTP Server Access Logs', volume: '11.4 GB/day', icon: Server, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'kubernetes', label: 'Kubernetes Cluster Event Logs', volume: '18.9 GB/day', icon: Cloud, type: 'source', destinations: ['datadog', 'elastic', 'splunk'] },
    { id: 'mysql', label: 'MySQL Database Server Logs', volume: '5.3 GB/day', icon: Database, type: 'source', destinations: ['splunk', 'datadog'] },
    { id: 'postgresql', label: 'PostgreSQL Database Logs', volume: '4.7 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'datadog'] },
    { id: 'redis', label: 'Redis Cache Server Logs', volume: '3.2 GB/day', icon: Database, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'jenkins', label: 'Jenkins CI/CD Pipeline Logs', volume: '7.8 GB/day', icon: Server, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'gitlab', label: 'GitLab Application Logs', volume: '6.1 GB/day', icon: Cloud, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'elasticsearch', label: 'Elasticsearch Cluster Logs', volume: '13.4 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'mongodb', label: 'MongoDB Database Logs', volume: '8.9 GB/day', icon: Database, type: 'source', destinations: ['splunk', 'datadog'] },
    { id: 'tomcat', label: 'Apache Tomcat Application Server', volume: '9.7 GB/day', icon: Server, type: 'source', destinations: ['splunk', 'elastic'] },
    { id: 'iis', label: 'Microsoft IIS Web Server', volume: '11.2 GB/day', icon: Server, type: 'source', destinations: ['sentinel', 'splunk'] },
    { id: 'rabbitmq', label: 'RabbitMQ Message Broker', volume: '4.5 GB/day', icon: Cloud, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'kafka', label: 'Apache Kafka Streaming Logs', volume: '16.3 GB/day', icon: Cloud, type: 'source', destinations: ['elastic', 'datadog', 'splunk'] },
    { id: 'haproxy', label: 'HAProxy Load Balancer Logs', volume: '7.2 GB/day', icon: Server, type: 'source', destinations: ['datadog', 'splunk'] },
    { id: 'consul', label: 'HashiCorp Consul Service Mesh', volume: '5.8 GB/day', icon: Cloud, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'vault', label: 'HashiCorp Vault Security Logs', volume: '4.3 GB/day', icon: Shield, type: 'source', destinations: ['sentinel', 'splunk'] },
    { id: 'nomad', label: 'HashiCorp Nomad Orchestration', volume: '6.7 GB/day', icon: Cloud, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'prometheus', label: 'Prometheus Monitoring System', volume: '9.1 GB/day', icon: Activity, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'grafana', label: 'Grafana Dashboard Analytics', volume: '3.9 GB/day', icon: Activity, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'influxdb', label: 'InfluxDB Time Series Database', volume: '8.4 GB/day', icon: Database, type: 'source', destinations: ['datadog', 'splunk'] },
    { id: 'cassandra', label: 'Apache Cassandra NoSQL DB', volume: '12.7 GB/day', icon: Database, type: 'source', destinations: ['splunk', 'elastic'] },
    { id: 'couchdb', label: 'Apache CouchDB Document Store', volume: '6.5 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'datadog'] },
    { id: 'memcached', label: 'Memcached Caching System', volume: '2.8 GB/day', icon: Database, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'etcd', label: 'etcd Distributed Key-Value Store', volume: '4.1 GB/day', icon: Database, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'zookeeper', label: 'Apache ZooKeeper Coordination', volume: '3.6 GB/day', icon: Cloud, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'solr', label: 'Apache Solr Search Platform', volume: '10.3 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'activemq', label: 'Apache ActiveMQ Message Broker', volume: '7.9 GB/day', icon: Cloud, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'minio', label: 'MinIO Object Storage Service', volume: '14.2 GB/day', icon: Cloud, type: 'source', destinations: ['splunk', 'datadog'] },
    { id: 'traefik', label: 'Traefik Reverse Proxy', volume: '8.6 GB/day', icon: Server, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'istio', label: 'Istio Service Mesh Control', volume: '11.8 GB/day', icon: Cloud, type: 'source', destinations: ['datadog', 'elastic', 'splunk'] },
    { id: 'linkerd', label: 'Linkerd Service Mesh Proxy', volume: '9.4 GB/day', icon: Cloud, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'envoy', label: 'Envoy Proxy Service Mesh', volume: '13.1 GB/day', icon: Server, type: 'source', destinations: ['elastic', 'datadog'] },
    { id: 'cilium', label: 'Cilium Network Security', volume: '7.5 GB/day', icon: Shield, type: 'source', destinations: ['sentinel', 'splunk'] },
    { id: 'falco', label: 'Falco Runtime Security', volume: '5.9 GB/day', icon: Shield, type: 'source', destinations: ['sentinel', 'splunk'] },
    { id: 'jaeger', label: 'Jaeger Distributed Tracing', volume: '8.2 GB/day', icon: Activity, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'zipkin', label: 'Zipkin Distributed Tracing', volume: '6.8 GB/day', icon: Activity, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'fluentd', label: 'Fluentd Log Collector', volume: '12.5 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'filebeat', label: 'Elastic Filebeat Log Shipper', volume: '9.8 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'logstash', label: 'Elastic Logstash Data Pipeline', volume: '15.7 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'beats', label: 'Elastic Beats Data Shippers', volume: '11.3 GB/day', icon: Database, type: 'source', destinations: ['elastic', 'splunk'] },
    { id: 'vector', label: 'Vector Observability Pipeline', volume: '7.7 GB/day', icon: Activity, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'telegraf', label: 'InfluxData Telegraf Agent', volume: '6.2 GB/day', icon: Activity, type: 'source', destinations: ['datadog', 'splunk'] },
    { id: 'collectd', label: 'collectd System Statistics', volume: '4.9 GB/day', icon: Activity, type: 'source', destinations: ['datadog', 'elastic'] },
    { id: 'nagios', label: 'Nagios Monitoring System', volume: '5.4 GB/day', icon: Activity, type: 'source', destinations: ['splunk', 'datadog'] }
  ], []);

  // Sort all sources by volume (GB/day) and take top 10 for display
  const topSources = useMemo(() => {
    return allSources
      .map(source => ({
        ...source,
        volumeNumber: parseFloat(source.volume.replace(' GB/day', ''))
      }))
      .sort((a, b) => b.volumeNumber - a.volumeNumber)
      .slice(0, INITIAL_SOURCES_LIMIT);
  }, [allSources]);
  
  // Remaining sources for the hover list
  const remainingSources = useMemo(() => {
    return allSources
      .map(source => ({
        ...source,
        volumeNumber: parseFloat(source.volume.replace(' GB/day', ''))
      }))
      .sort((a, b) => b.volumeNumber - a.volumeNumber)
      .slice(INITIAL_SOURCES_LIMIT);
  }, [allSources]);

  const destinations: FlowNode[] = useMemo(() => [
    { id: 'splunk', label: 'Splunk', volume: 'Active', icon: Activity, type: 'destination' },
    { id: 'datadog', label: 'Datadog', volume: 'Active', icon: Target, type: 'destination' },
    { id: 'elastic', label: 'Elastic', volume: 'Active', icon: Database, type: 'destination' },
    { id: 'sentinel', label: 'Sentinel', volume: 'Active', icon: Cloud, type: 'destination' }
  ], []);

  const hub: HubNode = useMemo(() => ({
    id: 'hub',
    label: 'Data Processing Hub',
    description: 'All sources route through here',
    icon: Shuffle,
    type: 'hub'
  }), []);

  // Always show only top 10 sources
  const visibleSources = topSources;
  
  const hiddenSourcesCount = remainingSources.length;

  // Memoized position calculator with stable reference
  const getNodePosition = useCallback((nodeId: string, type: 'source' | 'destination' | 'hub', isExpandNode = false) => {
    const containerWidth = 1200;
    const containerHeight = 650;
    const SOURCES_PER_COLUMN = 10;
    const INITIAL_COLUMN_X = 200;
    
    if (type === 'source') {
      let index = visibleSources.findIndex(n => n.id === nodeId);
      
      if (isExpandNode) {
        index = visibleSources.length;
      }
      
      if (index === -1) {
        return { x: 0, y: 0 };
      }
      
      const totalNodes = visibleSources.length + (hiddenSourcesCount > 0 ? 1 : 0);
      const availableHeight = containerHeight - 160;
      const minNodeSpacing = 75;
      const maxNodeSpacing = 90;
      
      let nodeSpacing = availableHeight / totalNodes;
      nodeSpacing = Math.max(minNodeSpacing, Math.min(maxNodeSpacing, nodeSpacing));
      
      const totalUsedHeight = totalNodes * nodeSpacing;
      const startY = Math.max(30, (containerHeight - totalUsedHeight) / 2);
      
      return { x: INITIAL_COLUMN_X, y: startY + (index * nodeSpacing) };
    } else if (type === 'destination') {
      const index = destinations.findIndex(n => n.id === nodeId);
      const availableHeight = containerHeight - 200;
      const nodeSpacing = Math.max(110, Math.min(150, availableHeight / destinations.length));
      const totalUsedHeight = destinations.length * nodeSpacing;
      const startY = Math.max(30, (containerHeight - totalUsedHeight) / 2);
      
      return { x: containerWidth - 260, y: startY + (index * nodeSpacing) };
    } else if (type === 'hub') {
      return { x: containerWidth / 2 - 100, y: containerHeight / 2 - 40 };
    }
    
    return { x: 0, y: 0 };
  }, [visibleSources, hiddenSourcesCount, destinations]);

  // Memoized connection paths for better performance
  const sourceToHubPaths = useMemo(() => {
    return visibleSources.map(source => {
      const sourcePos = getNodePosition(source.id, 'source');
      const hubPos = getNodePosition('hub', 'hub');
      
      const startX = sourcePos.x + 200;
      const startY = sourcePos.y + 30;
      const endX = hubPos.x;
      const endY = hubPos.y + 40;
      
      const controlPointOffset = Math.min(100, Math.abs(endX - startX) * 0.5);
      const midX1 = startX + controlPointOffset;
      const midX2 = endX - controlPointOffset;
      const path = `M ${startX} ${startY} C ${midX1} ${startY} ${midX2} ${endY} ${endX} ${endY}`;
      
      return { id: source.id, path, testId: `source-to-hub-${source.id}` };
    });
  }, [visibleSources, getNodePosition]);

  const hubToDestPaths = useMemo(() => {
    return destinations.map(dest => {
      const hubPos = getNodePosition('hub', 'hub');
      const destPos = getNodePosition(dest.id, 'destination');
      
      const startX = hubPos.x + 200;
      const startY = hubPos.y + 40;
      const endX = destPos.x;
      const endY = destPos.y + 30;
      
      const controlPointOffset = Math.min(80, Math.abs(endX - startX) * 0.4);
      const midX1 = startX + controlPointOffset;
      const midX2 = endX - controlPointOffset;
      const path = `M ${startX} ${startY} C ${midX1} ${startY} ${midX2} ${endY} ${endX} ${endY}`;
      
      return { id: dest.id, path, testId: `hub-to-dest-${dest.id}` };
    });
  }, [destinations, getNodePosition]);

  // Memoized node positions for stable references
  const nodePositions = useMemo(() => {
    const positions = new Map();
    visibleSources.forEach(source => {
      positions.set(source.id, getNodePosition(source.id, 'source'));
    });
    destinations.forEach(dest => {
      positions.set(dest.id, getNodePosition(dest.id, 'destination'));
    });
    positions.set('hub', getNodePosition('hub', 'hub'));
    return positions;
  }, [visibleSources, destinations, getNodePosition]);

  // Optimized mouse handlers with useCallback and stable references
  const handleNodeMouseEnter = useCallback((nodeId: string) => {
    setHoveredNode(nodeId);
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  // Throttled wheel handler for smoother zooming
  const throttledWheelHandler = useCallback(
    ((handler, delay) => {
      let timeoutId: NodeJS.Timeout;
      let lastExecTime = 0;
      return (...args: any[]) => {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
          handler.apply(null, args);
          lastExecTime = currentTime;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            handler.apply(null, args);
            lastExecTime = Date.now();
          }, delay - (currentTime - lastExecTime));
        }
      };
    })((e: WheelEvent) => {
      if (isHovering && containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel(prev => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)));
      }
    }, 16), // ~60fps throttling
    [isHovering]
  );

  useEffect(() => {
    if (isHovering) {
      document.addEventListener('wheel', throttledWheelHandler, { passive: false });
    }
    return () => {
      document.removeEventListener('wheel', throttledWheelHandler);
    };
  }, [isHovering, throttledWheelHandler]);

  const handleContainerEnter = useCallback(() => setIsHovering(true), []);
  const handleContainerLeave = useCallback(() => setIsHovering(false), []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setPanOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, lastPanPoint]);

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const resetView = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleExpandHover = useCallback(() => {
    setShowExpandedList(true);
  }, []);
  
  const handleExpandLeave = useCallback(() => {
    setShowExpandedList(false);
  }, []);

  // Memoized expand node with stable position
  const expandNode = useMemo(() => {
    if (hiddenSourcesCount <= 0) return null;
    
    const lastVisibleIndex = visibleSources.length - 1;
    if (lastVisibleIndex < 0) return null;
    
    const lastVisiblePos = getNodePosition(visibleSources[lastVisibleIndex].id, 'source');
    const position = { x: 280, y: lastVisiblePos.y + 75 };
    
    return { position };
  }, [hiddenSourcesCount, visibleSources, getNodePosition]);

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
        onMouseLeave={handleContainerLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        {/* Background pattern with will-change for better performance */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)`,
            backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
            transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0)`,
            willChange: 'transform'
          }}
        />
        
        {/* Centered container with optimized transforms */}
        <div 
          className="relative w-[1200px] h-full"
          data-testid="flow-chart-container"
          style={{
            transform: `scale(${zoomLevel}) translate3d(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px, 0)`,
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        >
          {/* SVG for connections */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            data-testid="connection-svg"
            style={{ willChange: 'contents' }}
          >
            {/* Source-to-hub connections using memoized components */}
            {sourceToHubPaths.map(({ id, path, testId }) => (
              <MemoizedConnection
                key={testId}
                path={path}
                isHighlighted={hoveredNode === id || hoveredNode === 'hub'}
                testId={testId}
              />
            ))}
            
            {/* Hub-to-destination connections */}
            {hubToDestPaths.map(({ id, path, testId }) => {
              // Check if any hovered source connects to this destination
              const hoveredSource = hoveredNode && hoveredNode !== 'hub' && hoveredNode !== 'expand' 
                ? visibleSources.find(s => s.id === hoveredNode)
                : null;
              const sourceConnectsToThisDestination = hoveredSource?.destinations?.includes(id) || false;
              
              return (
                <MemoizedConnection
                  key={testId}
                  path={path}
                  isHighlighted={hoveredNode === 'hub' || hoveredNode === id || sourceConnectsToThisDestination}
                  testId={testId}
                />
              );
            })}
          </svg>
          
          {/* All nodes using memoized components */}
          <div className="relative z-10" style={{ willChange: 'contents' }}>
            {/* Source nodes */}
            {visibleSources.map(node => (
              <MemoizedNode
                key={node.id}
                node={node}
                position={nodePositions.get(node.id) || { x: 0, y: 0 }}
                isHovered={hoveredNode === node.id}
                isConnected={hoveredNode === 'hub'}
                onMouseEnter={() => handleNodeMouseEnter(node.id)}
                onMouseLeave={handleNodeMouseLeave}
              />
            ))}
            
            {/* Hub node */}
            <MemoizedHubNode
              position={nodePositions.get('hub') || { x: 0, y: 0 }}
              isHovered={hoveredNode === 'hub'}
              isConnected={hoveredNode !== null && hoveredNode !== 'hub' && hoveredNode !== 'expand'}
              onMouseEnter={() => handleNodeMouseEnter('hub')}
              onMouseLeave={handleNodeMouseLeave}
              hubData={hub}
            />
            
            {/* Expand node with hover list */}
            {expandNode && (
              <div
                key="expand-node"
                className="absolute z-10"
                style={{
                  left: expandNode.position.x,
                  top: expandNode.position.y
                }}
                onMouseEnter={handleExpandHover}
                onMouseLeave={handleExpandLeave}
              >
                <div className={`
                  w-[200px] h-[60px] rounded-lg border-2 transition-all duration-300 
                  flex items-center justify-center cursor-help
                  ${showExpandedList
                    ? 'bg-purple-50 border-purple-300 shadow-lg shadow-purple-100' 
                    : 'bg-purple-25 border-purple-200 border-dashed hover:border-purple-300'
                  }
                `}>
                  <div className={`
                    text-xs font-medium transition-all duration-300 text-center
                    ${showExpandedList ? 'text-purple-700' : 'text-purple-600'}
                  `}>
                    <div>+{hiddenSourcesCount} others</div>
                    <div className="text-xs opacity-75">Hover to see list</div>
                  </div>
                </div>
                
                {/* Hover list */}
                {showExpandedList && (
                  <div 
                    className="absolute top-0 left-full ml-4 bg-white border border-slate-200 rounded-lg shadow-lg p-3 w-80 max-h-96 overflow-y-auto z-30"
                    onMouseEnter={handleExpandHover}
                    onMouseLeave={handleExpandLeave}
                    onWheel={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="text-xs font-semibold text-slate-700 mb-2">Additional Sources:</div>
                    <div className="space-y-1">
                      {remainingSources.map((source, index) => (
                        <div key={source.id} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-50">
                          <source.icon className="w-3 h-3 text-slate-500" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-slate-700 truncate">{source.label}</div>
                            <div className="text-xs text-slate-500">{source.volume}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Destination nodes */}
            {destinations.map(node => {
              // Check if any hovered source connects to this destination
              const hoveredSource = hoveredNode && hoveredNode !== 'hub' && hoveredNode !== 'expand' 
                ? visibleSources.find(s => s.id === hoveredNode)
                : null;
              const sourceConnectsToThisDestination = hoveredSource?.destinations?.includes(node.id) || false;
              
              return (
                <MemoizedNode
                  key={node.id}
                  node={node}
                  position={nodePositions.get(node.id) || { x: 0, y: 0 }}
                  isHovered={hoveredNode === node.id}
                  isConnected={hoveredNode === 'hub' || sourceConnectsToThisDestination}
                  onMouseEnter={() => handleNodeMouseEnter(node.id)}
                  onMouseLeave={handleNodeMouseLeave}
                />
              );
            })}
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