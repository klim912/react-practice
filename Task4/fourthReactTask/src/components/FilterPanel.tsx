import React from "react";
import { motion } from "framer-motion";

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string, isChecked: boolean) => void;
}

const FilterPanel: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg border-l border-gray-200 flex flex-col p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Фільтри</h2>
      <div className="space-y-3">
        {categories.map((category) => (
          <motion.label
            key={category}
            className="flex items-center p-2 rounded-lg cursor-pointer transition-all hover:bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={(e) => onCategoryChange(category, e.target.checked)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-md transition-all ${
                selectedCategories.includes(category)
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {selectedCategories.includes(category) && "✓"}
            </span>
            <span className="ml-3 text-gray-700">{category}</span>
          </motion.label>
        ))}
      </div>
    </aside>
  );
};

export default FilterPanel;
