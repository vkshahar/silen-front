"use client";

import React, { useState } from "react";
import { ChevronDown, Settings, User, LogOut, MoreVertical, AlertCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Simple Dropdown Component
export const SimpleDropdown = ({ 
  trigger, 
  children, 
  className,
  showArrow = true 
}: { 
  trigger: React.ReactNode; 
  children: React.ReactNode; 
  className?: string;
  showArrow?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
      >
        {trigger}
        {showArrow && <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// Dropdown Item Component
export const DropdownItem = ({ 
  children, 
  onClick, 
  className 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2",
        className
      )}
    >
      {children}
    </button>
  );
};

// Quick Actions Dropdown (3 dots menu)
export const QuickActionsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-6 right-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-slate-100 rounded transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-slate-400 hover:text-slate-600" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 min-w-[160px] bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <DropdownItem onClick={() => console.log("Check alerts clicked")}>
              <AlertCircle className="w-4 h-4" />
              Check Alerts
            </DropdownItem>
            <DropdownItem onClick={() => console.log("Check history clicked")}>
              <Search className="w-4 h-4" />
              Check History
            </DropdownItem>
          </div>
        </div>
      )}
    </div>
  );
};

// User Profile Dropdown Demo
export const UserProfileDropdown = () => {
  return (
    <SimpleDropdown 
      trigger={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
          <span className="text-sm font-medium">John Doe</span>
        </div>
      }
    >
      <DropdownItem onClick={() => console.log("Profile clicked")}>
        <User className="w-4 h-4" />
        Profile
      </DropdownItem>
      <DropdownItem onClick={() => console.log("Settings clicked")}>
        <Settings className="w-4 h-4" />
        Settings
      </DropdownItem>
      <hr className="my-1 border-slate-200" />
      <DropdownItem onClick={() => console.log("Logout clicked")} className="text-red-600 hover:bg-red-50">
        <LogOut className="w-4 h-4" />
        Logout
      </DropdownItem>
    </SimpleDropdown>
  );
};

// Actions Dropdown Demo
export const ActionsDropdown = () => {
  return (
    <SimpleDropdown 
      trigger={<span className="text-sm font-medium">Actions</span>}
    >
      <DropdownItem onClick={() => console.log("Edit clicked")}>
        Edit
      </DropdownItem>
      <DropdownItem onClick={() => console.log("Duplicate clicked")}>
        Duplicate
      </DropdownItem>
      <DropdownItem onClick={() => console.log("Share clicked")}>
        Share
      </DropdownItem>
      <hr className="my-1 border-slate-200" />
      <DropdownItem onClick={() => console.log("Delete clicked")} className="text-red-600 hover:bg-red-50">
        Delete
      </DropdownItem>
    </SimpleDropdown>
  );
};