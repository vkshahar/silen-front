"use client";

import { 
  Palette, 
  Type, 
  Layout, 
  BarChart3, 
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { IngressEgressChart } from '@/components/ui/ingress-egress-chart';
import { QuickActionsDropdown, UserProfileDropdown, ActionsDropdown, SimpleDropdown, DropdownItem } from '@/components/ui/dropdown-menu-demo';

// Sample data for charts
const lineData = [
  { name: '1 Jul', value: 65 },
  { name: '8 Jul', value: 70 },
  { name: '15 Jul', value: 55 },
  { name: '22 Jul', value: 85 },
  { name: '29 Jul', value: 75 },
];

const areaData = [
  { name: 'Jan', ingress: 400, egress: 240 },
  { name: 'Feb', ingress: 300, egress: 180 },
  { name: 'Mar', ingress: 200, egress: 350 },
  { name: 'Apr', ingress: 278, egress: 280 },
  { name: 'May', ingress: 350, egress: 480 },
  { name: 'Jun', ingress: 420, egress: 380 },
];

const dashboardData = [
  { name: 'Day 1', value: 920 },
  { name: 'Day 2', value: 650 },
  { name: 'Day 4', value: 580 },
  { name: 'Day 5', value: 800 },
  { name: 'Day 7', value: 570 },
  { name: 'Day 8', value: 580 },
  { name: 'Day 10', value: 750 },
  { name: 'Day 11', value: 720 },
  { name: 'Day 13', value: 680 },
  { name: 'Day 14', value: 900 },
  { name: 'Day 16', value: 590 },
  { name: 'Day 17', value: 790 },
  { name: 'Day 19', value: 820 },
  { name: 'Day 20', value: 610 },
  { name: 'Day 22', value: 630 },
  { name: 'Day 23', value: 610 },
  { name: 'Day 25', value: 890 },
  { name: 'Day 26', value: 600 },
  { name: 'Day 28', value: 950 },
  { name: 'Day 29', value: 880 },
  { name: 'Day 30', value: 870 },
];

const pieData = [
  { name: 'Critical', value: 16, color: '#dc2626' },
  { name: 'High', value: 8, color: '#ea580c' },
  { name: 'Medium', value: 32, color: '#ca8a04' },
  { name: 'Low', value: 44, color: '#16a34a' },
];

// Component Sections
const ColorSection = () => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      <Palette className="w-6 h-6 text-brand-primary" />
      <h2 className="text-heading-xl font-semibold text-slate-900">Colors</h2>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      {/* Primary Purple */}
      <div>
        <h3 className="text-heading-md font-medium mb-4 text-slate-800">Primary Purple</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-brand-primary rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#9D4EDD</div>
              <div className="text-body-sm text-slate-600">Primary Brand</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-brand-light rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#C77DFF</div>
              <div className="text-body-sm text-slate-600">Light Accent</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-brand-dark rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#7B2CBF</div>
              <div className="text-body-sm text-slate-600">Dark Accent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Colors */}
      <div>
        <h3 className="text-heading-md font-medium mb-4 text-slate-800">Status Colors</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-status-critical rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#DC2626</div>
              <div className="text-body-sm text-slate-600">Critical</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-status-high rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#EA580C</div>
              <div className="text-body-sm text-slate-600">High</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-status-medium rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#CA8A04</div>
              <div className="text-body-sm text-slate-600">Medium</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-status-low rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#16A34A</div>
              <div className="text-body-sm text-slate-600">Low</div>
            </div>
          </div>
        </div>
      </div>

      {/* Surface Colors */}
      <div>
        <h3 className="text-heading-md font-medium mb-4 text-slate-800">Surface Colors</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-surface-primary rounded-lg shadow-sm border border-slate-200"></div>
            <div>
              <div className="font-medium text-slate-900">#FFFFFF</div>
              <div className="text-body-sm text-slate-600">Primary Surface</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-surface-secondary rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#F8FAFC</div>
              <div className="text-body-sm text-slate-600">Secondary Surface</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-surface-border">
            <div className="w-12 h-12 bg-surface-tertiary rounded-lg shadow-sm"></div>
            <div>
              <div className="font-medium text-slate-900">#F1F5F9</div>
              <div className="text-body-sm text-slate-600">Tertiary Surface</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TypographySection = () => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      <Type className="w-6 h-6 text-brand-primary" />
      <h2 className="text-heading-xl font-semibold text-slate-900">Typography</h2>
    </div>
    
    <div className="bg-white rounded-xl border border-surface-border p-8">
      <p className="text-body-md text-slate-600 mb-8">Clean, professional typography system with clear hierarchy inspired by modern dashboard interfaces</p>
      
      <div className="space-y-8">
        {/* Display Text */}
        <div>
          <h3 className="text-heading-md font-medium mb-4 text-slate-800">Display Text</h3>
          <div className="space-y-4">
            <div>
              <div className="text-display-sm font-bold text-slate-900 mb-1">Display Large</div>
              <div className="text-body-sm text-slate-500">48px / Bold / -0.02em</div>
            </div>
            <div>
              <div className="text-display-md font-bold text-slate-900 mb-1">Display Medium</div>
              <div className="text-body-sm text-slate-500">36px / Bold / -0.02em</div>
            </div>
          </div>
        </div>

        {/* Headings */}
        <div>
          <h3 className="text-heading-md font-medium mb-4 text-slate-800">Headings</h3>
          <div className="space-y-4">
            <div>
              <div className="text-heading-xl font-semibold text-slate-900 mb-1">Heading XL</div>
              <div className="text-body-sm text-slate-500">30px / Semibold / -0.01em</div>
            </div>
            <div>
              <div className="text-heading-lg font-semibold text-slate-900 mb-1">Heading Large</div>
              <div className="text-body-sm text-slate-500">24px / Semibold / -0.01em</div>
            </div>
            <div>
              <div className="text-heading-md font-medium text-slate-900 mb-1">Heading Medium</div>
              <div className="text-body-sm text-slate-500">20px / Medium / -0.01em</div>
            </div>
            <div>
              <div className="text-heading-sm font-medium text-slate-900 mb-1">Heading Small</div>
              <div className="text-body-sm text-slate-500">18px / Medium / -0.01em</div>
            </div>
          </div>
        </div>

        {/* Body Text */}
        <div>
          <h3 className="text-heading-md font-medium mb-4 text-slate-800">Body Text</h3>
          <div className="space-y-4">
            <div>
              <div className="text-body-lg text-slate-900 mb-1">Body Large - Used for important descriptions and key information that needs emphasis</div>
              <div className="text-body-sm text-slate-500">18px / Regular / 1.6</div>
            </div>
            <div>
              <div className="text-body-md text-slate-900 mb-1">Body Medium - The standard body text used throughout the interface for most content</div>
              <div className="text-body-sm text-slate-500">16px / Regular / 1.6</div>
            </div>
            <div>
              <div className="text-body-sm text-slate-600 mb-1">Body Small - Used for secondary information, labels, and supporting details</div>
              <div className="text-body-sm text-slate-500">14px / Regular / 1.5</div>
            </div>
            <div>
              <div className="text-caption text-slate-500 mb-1">Caption - For timestamps, metadata, and minimal supporting text</div>
              <div className="text-body-sm text-slate-500">12px / Regular / 1.4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ComponentsSection = () => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      <Layout className="w-6 h-6 text-brand-primary" />
      <h2 className="text-heading-xl font-semibold text-slate-900">Components</h2>
    </div>
    
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Metric Cards */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Metric Cards</h3>
        <div className="space-y-4">
          <div className="bg-surface-secondary p-4 rounded-lg border border-surface-border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-body-sm font-medium text-slate-600">Total Issues</div>
              <ArrowUpRight className="w-4 h-4 text-status-critical" />
            </div>
            <div className="text-display-md font-bold text-slate-900 mb-1">127</div>
            <div className="flex items-center gap-2 text-body-sm">
              <span className="text-status-critical">+12%</span>
              <span className="text-slate-500">from last month</span>
            </div>
          </div>
          
          <div className="bg-surface-secondary p-4 rounded-lg border border-surface-border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-body-sm font-medium text-slate-600">Cost Savings</div>
              <ArrowDownRight className="w-4 h-4 text-status-low" />
            </div>
            <div className="text-display-md font-bold text-brand-primary mb-1">$6,286</div>
            <div className="flex items-center gap-2 text-body-sm">
              <span className="text-status-low">-8%</span>
              <span className="text-slate-500">30 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Status Indicators</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="w-5 h-5 text-status-critical" />
            <div>
              <div className="font-medium text-slate-900">Critical Alert</div>
              <div className="text-body-sm text-slate-600">Requires immediate attention</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-status-high" />
            <div>
              <div className="font-medium text-slate-900">High Priority</div>
              <div className="text-body-sm text-slate-600">Should be addressed soon</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-status-low" />
            <div>
              <div className="font-medium text-slate-900">Resolved</div>
              <div className="text-body-sm text-slate-600">Issue has been fixed</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Info className="w-5 h-5 text-status-info" />
            <div>
              <div className="font-medium text-slate-900">Information</div>
              <div className="text-body-sm text-slate-600">For your awareness</div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Buttons</h3>
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-brand-primary text-white rounded-button font-medium hover:bg-brand-dark transition-colors">
              Primary
            </button>
            <button className="px-4 py-2 border border-surface-border bg-white text-slate-700 rounded-button font-medium hover:bg-surface-secondary transition-colors">
              Secondary
            </button>
            <button className="px-4 py-2 bg-surface-secondary text-slate-700 rounded-button font-medium hover:bg-surface-tertiary transition-colors">
              Tertiary
            </button>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-status-critical text-white rounded-button font-medium hover:bg-red-700 transition-colors">
              Danger
            </button>
            <button className="px-4 py-2 bg-status-low text-white rounded-button font-medium hover:bg-green-700 transition-colors">
              Success
            </button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button className="px-3 py-1.5 text-body-sm bg-brand-primary text-white rounded font-medium hover:bg-brand-dark transition-colors">
              Small
            </button>
            <button className="px-6 py-3 text-body-lg bg-brand-primary text-white rounded-button font-medium hover:bg-brand-dark transition-colors">
              Large
            </button>
          </div>
        </div>
      </div>

      {/* Form Elements */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Form Elements</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-body-sm font-medium text-slate-700 mb-2">
              Text Input
            </label>
            <input 
              type="text" 
              placeholder="Enter text here..."
              className="w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-body-sm font-medium text-slate-700 mb-2">
              Select Dropdown
            </label>
            <select className="w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent">
              <option>Select an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="checkbox"
              className="w-4 h-4 text-brand-primary bg-white border-2 border-surface-border rounded focus:ring-brand-primary focus:ring-2"
            />
            <label htmlFor="checkbox" className="text-body-sm text-slate-700">
              Checkbox option
            </label>
          </div>
        </div>
      </div>

      {/* Modals */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Modals & Overlays</h3>
        <div className="space-y-4">
          {/* Modal Preview */}
          <div className="relative bg-slate-100 rounded-lg p-8 min-h-96">
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-elevated border border-surface-border p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-heading-lg font-semibold text-slate-900">Select Your Focus</h4>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-body-md text-slate-600 mb-6">Align the portal with your area of responsibility</p>
                
                {/* Radio Options */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 border-2 border-brand-primary bg-purple-50 rounded-lg">
                    <div className="w-4 h-4 rounded-full border-2 border-brand-primary bg-brand-primary flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-brand-primary rounded flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-body-md font-medium text-slate-900">Log Management</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-surface-border hover:border-slate-300 rounded-lg transition-colors">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                        <AlertTriangle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-body-md text-slate-700">Security Analysis</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-surface-border hover:border-slate-300 rounded-lg transition-colors">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                        <Info className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-body-md text-slate-700">Data Security</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 border border-surface-border bg-white text-slate-700 rounded-button font-medium hover:bg-surface-secondary transition-colors">
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-brand-primary text-white rounded-button font-medium hover:bg-brand-dark transition-colors">
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-body-sm text-slate-600">
            Clean modal design with proper overlay, rounded corners, and clear call-to-action buttons
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Tags & Labels</h3>
        <div className="space-y-6">
          {/* Status Tags */}
          <div>
            <h4 className="text-heading-sm font-medium mb-3 text-slate-800">Status Tags</h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-body-sm font-medium rounded-full border border-red-200">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Critical
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 text-body-sm font-medium rounded-full border border-orange-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                High
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 text-body-sm font-medium rounded-full border border-yellow-200">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Medium
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-body-sm font-medium rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Low
              </span>
            </div>
          </div>

          {/* Category Tags */}
          <div>
            <h4 className="text-heading-sm font-medium mb-3 text-slate-800">Category Tags</h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-brand-primary text-body-sm font-medium rounded-full border border-purple-200">
                Log Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-body-sm font-medium rounded-full border border-blue-200">
                Data Source
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 text-cyan-700 text-body-sm font-medium rounded-full border border-cyan-200">
                Volume
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 text-body-sm font-medium rounded-full border border-slate-200">
                Attributes
              </span>
            </div>
          </div>

          {/* Interactive Tags */}
          <div>
            <h4 className="text-heading-sm font-medium mb-3 text-slate-800">Interactive Tags</h4>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 text-body-sm font-medium rounded-full border border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-colors">
                <span>AWS Logs</span>
                <XCircle className="w-3 h-3" />
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 text-body-sm font-medium rounded-full border border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-colors">
                <span>Windows Events</span>
                <XCircle className="w-3 h-3" />
              </button>
              <button className="inline-flex items-center gap-1.5 px-2 py-1.5 bg-slate-100 text-slate-600 text-body-sm rounded-full border border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-colors">
                <span>+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ChartsSection = () => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      <BarChart3 className="w-6 h-6 text-brand-primary" />
      <h2 className="text-heading-xl font-semibold text-slate-900">Data Visualization</h2>
    </div>
    
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Line Chart */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-4 text-slate-800">Trends Over Time</h3>
        <p className="text-body-sm text-slate-600 mb-6">Smooth line charts for showing data trends and patterns</p>
        <div className="h-64 bg-slate-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" strokeOpacity={0.5} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#9D4EDD" 
                strokeWidth={3}
                dot={{ fill: '#9D4EDD', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#9D4EDD', strokeWidth: 2, fill: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ingress/Egress Chart with shadcn */}
      <div>
        <h3 className="text-heading-md font-medium mb-4 text-slate-800">Network Traffic Chart</h3>
        <p className="text-body-sm text-slate-600 mb-6">Interactive area chart with hover tooltips, time range selector, and soft red/green colors for ingress/egress data</p>
        <IngressEgressChart />
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-4 text-slate-800">Issue Distribution</h3>
        <p className="text-body-sm text-slate-600 mb-6">Pie charts for showing proportional data</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-body-sm text-slate-600">{item.name}</span>
              <span className="text-body-sm font-medium text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tables */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Data Tables</h3>
        <p className="text-body-sm text-slate-600 mb-6">Clean, readable tables with proper contrast and hover states</p>
        <div className="border border-surface-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="text-body-sm font-semibold text-slate-900">Source Name</div>
            <div className="text-body-sm font-semibold text-slate-900">Daily Volume</div>
            <div className="text-body-sm font-semibold text-slate-900">Monthly Cost</div>
            <div className="text-body-sm font-semibold text-slate-900">Reduction</div>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
              <div className="text-body-sm text-slate-900 font-medium">Windows Event Logs</div>
              <div className="text-body-sm text-slate-700">12.3 GB</div>
              <div className="text-body-sm text-red-600 font-medium">$1,845</div>
              <div className="text-body-sm text-brand-primary font-semibold">65%</div>
            </div>
            <div className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
              <div className="text-body-sm text-slate-900 font-medium">Linux Syslog Logs</div>
              <div className="text-body-sm text-slate-700">10.8 GB</div>
              <div className="text-body-sm text-red-600 font-medium">$1,620</div>
              <div className="text-body-sm text-brand-primary font-semibold">68%</div>
            </div>
            <div className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
              <div className="text-body-sm text-slate-900 font-medium">AWS Logs</div>
              <div className="text-body-sm text-slate-700">15.2 GB</div>
              <div className="text-body-sm text-red-600 font-medium">$2,280</div>
              <div className="text-body-sm text-brand-primary font-semibold">60%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Layout Preview */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-4 text-slate-800">Dashboard Layout</h3>
        <p className="text-body-sm text-slate-600 mb-6">Example dashboard layout with proper spacing and hierarchy</p>
        <div className="bg-surface-secondary p-4 rounded-lg space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="text-heading-sm font-medium text-slate-900">Log Sources Overview</h4>
            <div className="text-caption text-slate-500">Last 30 days</div>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded border border-surface-border">
              <div className="text-caption text-slate-600">Critical</div>
              <div className="text-heading-md font-bold text-status-critical">16</div>
              <div className="text-caption text-status-critical">↑6%</div>
            </div>
            <div className="bg-white p-3 rounded border border-surface-border">
              <div className="text-caption text-slate-600">High</div>
              <div className="text-heading-md font-bold text-status-high">8</div>
              <div className="text-caption text-status-high">↑15%</div>
            </div>
            <div className="bg-white p-3 rounded border border-surface-border">
              <div className="text-caption text-slate-600">Medium</div>
              <div className="text-heading-md font-bold text-status-medium">32</div>
              <div className="text-caption text-status-low">↓8%</div>
            </div>
          </div>
          
          {/* Mock Table */}
          <div className="bg-white rounded-lg border border-surface-border overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="text-body-sm font-semibold text-slate-900">Source</div>
              <div className="text-body-sm font-semibold text-slate-900">Volume</div>
              <div className="text-body-sm font-semibold text-slate-900">Cost</div>
              <div className="text-body-sm font-semibold text-slate-900">Status</div>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                <div className="text-body-sm text-slate-900 font-medium">Windows Logs</div>
                <div className="text-body-sm text-slate-700">12.3 GB</div>
                <div className="text-body-sm text-red-600 font-medium">$1,845</div>
                <div className="text-body-sm text-brand-primary font-semibold">65%</div>
              </div>
              <div className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                <div className="text-body-sm text-slate-900 font-medium">AWS Logs</div>
                <div className="text-body-sm text-slate-700">15.2 GB</div>
                <div className="text-body-sm text-red-600 font-medium">$2,280</div>
                <div className="text-body-sm text-brand-primary font-semibold">60%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DashboardStatsSection = () => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      <BarChart3 className="w-6 h-6 text-brand-primary" />
      <h2 className="text-heading-xl font-semibold text-slate-900">Dashboard Stats Layout</h2>
    </div>
    
    <div className="bg-white rounded-xl border border-surface-border p-8">
      <h3 className="text-heading-md font-medium mb-6 text-slate-800">Stats with Chart Layout</h3>
      <p className="text-body-sm text-slate-600 mb-8">Beautiful dashboard layout with key metrics above a smooth area chart</p>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-brand-primary rounded-sm"></div>
            <span className="text-caption text-slate-600 uppercase tracking-wide font-medium">VOLUME</span>
          </div>
          <div className="text-display-sm font-bold text-slate-900 mb-1">1,729.1 MB</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-caption text-slate-600 uppercase tracking-wide font-medium">MESSAGES</span>
          </div>
          <div className="text-display-sm font-bold text-slate-900 mb-1">7,009,455</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-caption text-slate-600 uppercase tracking-wide font-medium">DATA SOURCE</span>
          </div>
          <div className="text-display-sm font-bold text-slate-900 mb-1">251</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
            <span className="text-caption text-slate-600 uppercase tracking-wide font-medium">ATTRIBUTES</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </div>
          <div className="text-display-sm font-bold text-slate-900 mb-1">24</div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-80 bg-slate-50 rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dashboardData}>
            <defs>
              <linearGradient id="dashboardGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9D4EDD" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9D4EDD" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 1" stroke="#e2e8f0" strokeOpacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
              domain={['dataMin - 50', 'dataMax + 50']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#9D4EDD" 
              strokeWidth={2}
              fill="url(#dashboardGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-body-sm text-slate-600 mt-6">
        Smooth area chart with gradient fill, matching the elegant Wiz dashboard aesthetic with clean stats above
      </p>
    </div>
  </section>
);

const DropdownsSection = () => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      <Info className="w-6 h-6 text-brand-primary" />
      <h2 className="text-heading-xl font-semibold text-slate-900">Dropdowns & Menus</h2>
    </div>
    
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Simple Dropdown */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Simple Dropdown</h3>
        <p className="text-body-sm text-slate-600 mb-6">Clean dropdown with smooth animations and proper hover states</p>
        
        <div className="flex gap-4 mb-6">
          <UserProfileDropdown />
          <ActionsDropdown />
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-slate-900 mb-2">Usage</h4>
          <pre className="text-xs text-slate-600 overflow-x-auto">
{`<SimpleDropdown trigger={<span>Actions</span>}>
  <DropdownItem onClick={() => {}}>Edit</DropdownItem>
  <DropdownItem onClick={() => {}}>Delete</DropdownItem>
</SimpleDropdown>`}
          </pre>
        </div>
      </div>

      {/* Quick Actions Menu */}
      <div className="bg-white rounded-xl border border-surface-border p-6 relative">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Quick Actions Menu</h3>
        <p className="text-body-sm text-slate-600 mb-6">Simple 3-dots menu for card actions with clean dropdown</p>
        
        <div className="relative h-32 bg-slate-50 rounded-lg mb-6 overflow-hidden flex items-center justify-center">
          <div className="relative bg-white rounded-lg border border-slate-200 p-4">
            <QuickActionsDropdown />
            <div className="text-sm text-slate-600 mt-8">Card with quick actions</div>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-slate-900 mb-2">Features</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• Minimal 3-dots trigger button</li>
            <li>• Positioned in top-right corner</li>
            <li>• Check Alerts and Check History actions</li>
            <li>• Clean hover states and transitions</li>
          </ul>
        </div>
      </div>

      {/* Dropdown Variants */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Dropdown Variants</h3>
        <p className="text-body-sm text-slate-600 mb-6">Different styles and configurations for various use cases</p>
        
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">User Profile</h4>
            <UserProfileDropdown />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">Actions Menu</h4>
            <ActionsDropdown />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">Custom Trigger</h4>
            <SimpleDropdown 
              trigger={
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Status: Active</span>
                </div>
              }
            >
              <DropdownItem>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Pending
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Inactive
                </div>
              </DropdownItem>
            </SimpleDropdown>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-slate-900 mb-2">Best Practices</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• Use consistent spacing (py-2 px-4 for items)</li>
            <li>• Add separators for grouping related actions</li>
            <li>• Use red colors for destructive actions</li>
            <li>• Include icons for better visual hierarchy</li>
          </ul>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-white rounded-xl border border-surface-border p-6">
        <h3 className="text-heading-md font-medium mb-6 text-slate-800">Implementation</h3>
        <p className="text-body-sm text-slate-600 mb-6">How to use dropdown components in your application</p>
        
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-900 mb-2">Basic Setup</h4>
            <pre className="text-xs text-slate-600 overflow-x-auto">
{`import { SimpleDropdown, DropdownItem, QuickActionsDropdown } from '@/components/ui/dropdown-menu-demo'`}
            </pre>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-900 mb-2">Styling</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Dropdowns use white background with slate borders</li>
              <li>• Hover states use slate-50 background</li>
              <li>• Shadow-lg for elevation</li>
              <li>• Rounded-lg corners for consistency</li>
            </ul>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-900 mb-2">Accessibility</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Keyboard navigation support</li>
              <li>• Focus management</li>
              <li>• ARIA labels and roles</li>
              <li>• Screen reader compatibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <header className="bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-dark rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-display-md font-bold text-slate-900">Silen Design System</h1>
              <p className="text-body-lg text-slate-600">Professional dashboard design inspired by Wiz security platform</p>
            </div>
          </div>
          <div className="flex gap-2 text-body-sm">
            <span className="px-3 py-1 bg-brand-primary text-white rounded-full">v1.0</span>
            <span className="px-3 py-1 bg-surface-tertiary text-slate-700 rounded-full">React + Next.js</span>
            <span className="px-3 py-1 bg-surface-tertiary text-slate-700 rounded-full">Tailwind CSS</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="prose prose-slate max-w-none">
          <div className="mb-12">
            <h2 className="text-heading-xl font-semibold text-slate-900 mb-4">Overview</h2>
            <p className="text-body-lg text-slate-700 leading-relaxed">
              This design system combines the clean, professional aesthetics of the Wiz security platform 
              with Silen&apos;s purple brand identity. It provides a comprehensive set of components, colors, 
              typography, and data visualization patterns specifically designed for security and log management dashboards.
            </p>
          </div>

          <ColorSection />
          <TypographySection />
          <ComponentsSection />
          <ChartsSection />
          <DashboardStatsSection />
          <DropdownsSection />

          {/* Implementation Notes */}
          <section className="mb-16">
            <h2 className="text-heading-xl font-semibold text-slate-900 mb-8">Implementation Guidelines</h2>
            <div className="bg-white rounded-xl border border-surface-border p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-heading-md font-medium mb-4 text-slate-800">Design Principles</h3>
                  <ul className="space-y-2 text-body-md text-slate-700">
                    <li>• <strong>Clean & Minimal:</strong> Embrace whitespace and reduce visual clutter</li>
                    <li>• <strong>Consistent:</strong> Use the same patterns across all interfaces</li>
                    <li>• <strong>Data-Focused:</strong> Prioritize clear data visualization and metrics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-heading-md font-medium mb-4 text-slate-800">Technical Stack</h3>
                  <ul className="space-y-2 text-body-md text-slate-700">
                    <li>• <strong>Framework:</strong> Next.js 14+ with App Router</li>
                    <li>• <strong>Styling:</strong> Tailwind CSS with custom design tokens</li>
                    <li>• <strong>Charts:</strong> Recharts for data visualization</li>
                    <li>• <strong>Icons:</strong> Lucide React for consistent iconography</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">🎨 Color Usage</h4>
                <p className="text-body-sm text-slate-700">
                  Always use the purple brand colors (#9D4EDD) for primary actions and highlights. 
                  Reserve status colors (red, orange, yellow, green) strictly for indicating severity levels 
                  and system states. Use surface colors to create proper visual hierarchy and depth.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-body-sm text-slate-600">
              Built with Next.js, Tailwind CSS, and Recharts
            </div>
            <div className="flex items-center gap-4">
              <span className="text-body-sm text-slate-500">Silen Design System</span>
              <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}