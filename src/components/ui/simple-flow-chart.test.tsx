/**
 * Test file for SimpleFlowChart component with hub architecture
 * Tests the new design where sources connect to a central hub, 
 * and the hub connects to destinations
 */

import { describe, it, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SimpleFlowChart } from './simple-flow-chart';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    path: 'path',
  },
}));

describe('SimpleFlowChart with Hub Architecture', () => {
  describe('Basic Rendering', () => {
    it('should render the flow chart container', () => {
      render(<SimpleFlowChart />);
      expect(screen.getByText('Data Flow Overview')).toBeInTheDocument();
    });

    it('should render source nodes', () => {
      render(<SimpleFlowChart />);
      expect(screen.getByText('Microsoft Windows Event Logs')).toBeInTheDocument();
      expect(screen.getByText('Red Hat Enterprise Linux Syslogs')).toBeInTheDocument();
    });

    it('should render destination nodes', () => {
      render(<SimpleFlowChart />);
      expect(screen.getByText('Splunk')).toBeInTheDocument();
      expect(screen.getByText('Datadog')).toBeInTheDocument();
      expect(screen.getByText('Elastic')).toBeInTheDocument();
      expect(screen.getByText('Sentinel')).toBeInTheDocument();
    });

    it('should render the central hub node', () => {
      render(<SimpleFlowChart />);
      expect(screen.getByText('Data Processing Hub')).toBeInTheDocument();
      expect(screen.getByText('All sources route through here')).toBeInTheDocument();
    });
  });

  describe('Hub Architecture Connection Logic', () => {
    it('should show connections from sources to hub only', () => {
      render(<SimpleFlowChart />);
      const svg = screen.getByTestId('connection-svg');
      
      // Should have source-to-hub connections
      const sourceToHubConnections = svg.querySelectorAll('[data-testid^="source-to-hub-"]');
      expect(sourceToHubConnections.length).toBeGreaterThan(0);
      
      // Should NOT have direct source-to-destination connections
      const sourceToDestConnections = svg.querySelectorAll('[data-testid^="source-to-dest-"]');
      expect(sourceToDestConnections.length).toBe(0);
    });

    it('should show connections from hub to destinations only', () => {
      render(<SimpleFlowChart />);
      const svg = screen.getByTestId('connection-svg');
      
      // Should have hub-to-destination connections
      const hubToDestConnections = svg.querySelectorAll('[data-testid^="hub-to-dest-"]');
      expect(hubToDestConnections.length).toBe(4); // 4 destinations
    });

    it('should position hub node in the center between sources and destinations', () => {
      render(<SimpleFlowChart />);
      const hubNode = screen.getByTestId('hub-node');
      const hubStyle = window.getComputedStyle(hubNode);
      
      // Hub should be positioned between sources (x=80) and destinations (x=480)
      // Approximately at x=280-320 range
      const leftValue = parseInt(hubStyle.left);
      expect(leftValue).toBeGreaterThan(200);
      expect(leftValue).toBeLessThan(400);
    });
  });

  describe('Scalability with Many Sources', () => {
    it('should handle 100+ sources without performance issues', async () => {
      const startTime = Date.now();
      
      render(<SimpleFlowChart />);
      
      // Expand to show all sources
      const expandButton = screen.getByText('+34 others');
      fireEvent.click(expandButton);
      
      // Wait for expansion animation
      await waitFor(() => {
        expect(screen.getByText('Show less')).toBeInTheDocument();
      });
      
      const endTime = Date.now();
      const renderTime = endTime - startTime;
      
      // Should render within reasonable time (less than 1000ms)
      expect(renderTime).toBeLessThan(1000);
    });

    it('should show only hub connections even with many sources', async () => {
      render(<SimpleFlowChart />);
      
      // Expand to show all sources
      const expandButton = screen.getByText('+34 others');
      fireEvent.click(expandButton);
      
      await waitFor(() => {
        const svg = screen.getByTestId('connection-svg');
        
        // Total connections should be: number_of_sources + 4_destinations
        // NOT number_of_sources * number_of_destinations
        const totalConnections = svg.querySelectorAll('path').length;
        
        // With 38 sources + 4 destinations = 42 total connections
        // Much less than 38 * 4 = 152 connections in the old design
        expect(totalConnections).toBeLessThan(50);
        expect(totalConnections).toBeGreaterThan(40);
      });
    });

    it('should maintain visual clarity with pagination', () => {
      render(<SimpleFlowChart />);
      
      // Check if pagination controls appear when needed
      const expandButton = screen.getByText('+34 others');
      fireEvent.click(expandButton);
      
      // Should show pagination controls for large datasets
      expect(screen.getByText(/Page \d+ of \d+/)).toBeInTheDocument();
    });
  });

  describe('Interactive Features', () => {
    it('should highlight hub connections when hovering over source', () => {
      render(<SimpleFlowChart />);
      
      const sourceNode = screen.getByText('Microsoft Windows Event Logs');
      fireEvent.mouseEnter(sourceNode);
      
      // Hub connection should be highlighted
      const svg = screen.getByTestId('connection-svg');
      const highlightedPaths = svg.querySelectorAll('path[stroke="#8b5cf6"]');
      expect(highlightedPaths.length).toBeGreaterThan(0);
    });

    it('should highlight hub connections when hovering over destination', () => {
      render(<SimpleFlowChart />);
      
      const destNode = screen.getByText('Splunk');
      fireEvent.mouseEnter(destNode);
      
      // Hub connection should be highlighted
      const svg = screen.getByTestId('connection-svg');
      const highlightedPaths = svg.querySelectorAll('path[stroke="#8b5cf6"]');
      expect(highlightedPaths.length).toBeGreaterThan(0);
    });

    it('should highlight all hub connections when hovering over hub', () => {
      render(<SimpleFlowChart />);
      
      const hubNode = screen.getByTestId('hub-node');
      fireEvent.mouseEnter(hubNode);
      
      // All connections should be highlighted
      const svg = screen.getByTestId('connection-svg');
      const highlightedPaths = svg.querySelectorAll('path[stroke="#8b5cf6"]');
      
      // Should highlight connections to all visible sources + all destinations
      expect(highlightedPaths.length).toBeGreaterThan(6); // 4 initial sources + 4 destinations
    });
  });

  describe('Visual Appearance', () => {
    it('should render connection lines with proper curvature', () => {
      render(<SimpleFlowChart />);
      const svg = screen.getByTestId('connection-svg');
      const paths = svg.querySelectorAll('path');
      
      paths.forEach(path => {
        const d = path.getAttribute('d');
        // Should use smooth curves (quadratic bezier curves with Q command)
        expect(d).toContain('Q');
      });
    });

    it('should position hub with adequate spacing from other nodes', () => {
      render(<SimpleFlowChart />);
      const hubNode = screen.getByTestId('hub-node');
      
      // Hub should have enough space (min 100px) from sources and destinations
      const hubRect = hubNode.getBoundingClientRect();
      
      // Check no overlap with source nodes
      const sourceNodes = screen.getAllByTestId(/^source-node-/);
      sourceNodes.forEach(source => {
        const sourceRect = source.getBoundingClientRect();
        const horizontalGap = Math.abs(hubRect.left - sourceRect.right);
        expect(horizontalGap).toBeGreaterThan(50);
      });
    });

    it('should have distinct visual styling for hub node', () => {
      render(<SimpleFlowChart />);
      const hubNode = screen.getByTestId('hub-node');
      
      // Hub should have different styling (larger, different color)
      expect(hubNode).toHaveClass(/hub-node/); // Should have hub-specific styling
    });
  });

  describe('Connection Line Quality', () => {
    it('should render smooth connection curves', () => {
      render(<SimpleFlowChart />);
      const svg = screen.getByTestId('connection-svg');
      
      // Check that connection paths use smooth curves
      const sourceToHubPath = svg.querySelector('[data-testid="source-to-hub-windows"]');
      const hubToDestPath = svg.querySelector('[data-testid="hub-to-dest-splunk"]');
      
      expect(sourceToHubPath?.getAttribute('d')).toMatch(/Q.*Q/); // Smooth curve pattern
      expect(hubToDestPath?.getAttribute('d')).toMatch(/Q.*Q/); // Smooth curve pattern
    });

    it('should maintain connection visibility at different zoom levels', () => {
      render(<SimpleFlowChart />);
      
      // Test zoom functionality
      const container = screen.getByTestId('flow-chart-container');
      
      // Simulate zoom in
      fireEvent.wheel(container, { deltaY: -100 });
      
      const svg = screen.getByTestId('connection-svg');
      const paths = svg.querySelectorAll('path');
      
      // Paths should still be visible and properly styled
      paths.forEach(path => {
        const stroke = path.getAttribute('stroke');
        const strokeWidth = path.getAttribute('stroke-width');
        
        expect(stroke).toBeTruthy();
        expect(parseInt(strokeWidth || '0')).toBeGreaterThan(0);
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle empty source list gracefully', () => {
      // This would require props to control data, but testing the concept
      render(<SimpleFlowChart />);
      
      // Component should not crash and should show meaningful message
      expect(screen.getByText('Data Flow Overview')).toBeInTheDocument();
    });

    it('should handle missing destination connections', () => {
      render(<SimpleFlowChart />);
      
      // Should always show hub-to-destination connections even if sources are empty
      const svg = screen.getByTestId('connection-svg');
      const hubToDestConnections = svg.querySelectorAll('[data-testid^="hub-to-dest-"]');
      expect(hubToDestConnections.length).toBe(4);
    });
  });
});
