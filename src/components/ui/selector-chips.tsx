"use client";
 
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
 
export type SelectorChipsProps = {
  options: string[];
  onChange?: (selected: string[]) => void;
};

const getRiskColors = (option: string, isSelected: boolean) => {
  // Extract the base risk level (remove the count in parentheses)
  const baseOption = option.replace(/\s*\(\d+\)$/, '');
  const lowerOption = baseOption.toLowerCase();
  
  if (lowerOption.includes('low')) {
    return {
      backgroundColor: isSelected ? "#22c55e" : "#f0fdf4",
      borderColor: isSelected ? "#16a34a" : "#bbf7d0", 
      color: isSelected ? "#fff" : "#15803d"
    };
  } else if (lowerOption.includes('medium')) {
    return {
      backgroundColor: isSelected ? "#f97316" : "#fff7ed",
      borderColor: isSelected ? "#ea580c" : "#fed7aa",
      color: isSelected ? "#fff" : "#c2410c"
    };
  } else if (lowerOption.includes('high')) {
    return {
      backgroundColor: isSelected ? "#ef4444" : "#fef2f2",
      borderColor: isSelected ? "#dc2626" : "#fecaca",
      color: isSelected ? "#fff" : "#dc2626"
    };
  }
  
  // Default colors
  return {
    backgroundColor: isSelected ? "#6366f1" : "#fff",
    borderColor: isSelected ? "#4f46e5" : "#d1d5db",
    color: isSelected ? "#fff" : "#1f2937"
  };
};
 
const SelectorChips: React.FC<SelectorChipsProps> = ({ options, onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleChip = (option: string) => {
    // Extract the base risk level (remove the count in parentheses)
    const baseOption = option.replace(/\s*\(\d+\)$/, '');
    
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    setSelected(updated);
    
    // Convert selected options back to base risk levels for the onChange callback
    const baseSelected = updated.map(opt => opt.replace(/\s*\(\d+\)$/, ''));
    onChange?.(baseSelected);
  };

  return (
    <div className="flex flex-wrap gap-2 max-w-xl w-full bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        const colors = getRiskColors(option, isSelected);
        
        return (
          <motion.button
            key={option}
            onClick={() => toggleChip(option)}
            initial={false}
            animate={{
              backgroundColor: colors.backgroundColor,
              borderColor: colors.borderColor,
              color: colors.color,
              width: isSelected ? 120 : 100,
              transition: {
                backgroundColor: { duration: 0.15 },
                color: { duration: 0.15 },
                borderColor: { duration: 0.15 },
                width: { type: "spring", stiffness: 400, damping: 20 },
              },
            }}
            className="flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium border transition overflow-hidden grow cursor-pointer"
            style={{ minWidth: 100 }}
          >
            <div className="flex items-center w-full justify-center relative">
              <span className="mx-auto">{option}</span>
              <motion.span
                animate={{
                  width: isSelected ? 18 : 0,
                  marginLeft: isSelected ? 8 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      key="tick"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                      style={{ pointerEvents: "none" }}
                    >
                      {/* Tickmark SVG */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <motion.path
                          d="M5 10.5L9 14.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.25 }}
                        />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
 
export { SelectorChips };