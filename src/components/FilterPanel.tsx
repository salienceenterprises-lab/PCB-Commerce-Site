"use client";

import { useState } from "react";
import { FilterState, CATEGORY_GROUPS, BRANDS, CONDITIONS } from "@/lib/types";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
  mobile?: boolean;
}

function CollapsibleSection({
  label,
  defaultOpen,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  return (
    <div className="border-b border-gray-200 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        {label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: readonly string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="max-h-44 space-y-0.5 overflow-y-auto">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-800"
        >
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...selected, opt]);
              } else {
                onChange(selected.filter((v) => v !== opt));
              }
            }}
            className="h-3.5 w-3.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default function FilterPanel({ filters, onChange, resultCount, mobile }: FilterPanelProps) {
  const update = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  const hasActiveFilters =
    filters.search ||
    filters.categoryGroup ||
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.conditions.length > 0 ||
    filters.yearMin ||
    filters.yearMax ||
    filters.priceMin ||
    filters.priceMax ||
    filters.location;

  const selectedGroup = CATEGORY_GROUPS.find((g) => g.key === filters.categoryGroup);

  return (
    <div className={mobile ? "w-full" : "w-60 shrink-0"}>
      <div className={mobile ? "space-y-0" : "sticky top-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"}>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">
            {resultCount} result{resultCount !== 1 ? "s" : ""}
          </span>
          {hasActiveFilters && (
            <button
              onClick={() =>
                onChange({
                  search: "",
                  categoryGroup: "",
                  categories: [],
                  brands: [],
                  conditions: [],
                  yearMin: "",
                  yearMax: "",
                  priceMin: "",
                  priceMax: "",
                  location: "",
                })
              }
              className="text-xs font-medium text-brand-600 hover:text-brand-800"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Search */}
        <div className="border-b border-gray-200 pb-3">
          <div className="relative">
            <svg
              className="absolute left-2.5 top-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
              placeholder="Search equipment..."
              className="w-full rounded-md border border-gray-300 py-1.5 pl-8 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Category Group Tabs */}
        <CollapsibleSection label="Section">
          <div className="space-y-1">
            {[
              { key: "", label: "All Sections", color: "text-gray-700" },
              { key: "PCB Fabrication", label: "A · Fabrication", color: "text-fab" },
              { key: "PCB Assembly (PCBA)", label: "B · Assembly", color: "text-asm" },
              { key: "Cross-cutting", label: "C · Cross-cutting", color: "text-cross" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => update({ categoryGroup: opt.key, categories: [] })}
                className={`block w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                  filters.categoryGroup === opt.key
                    ? "bg-brand-50 font-medium text-brand-700"
                    : `${opt.color} hover:bg-gray-50`
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </CollapsibleSection>

        {/* Sub-categories (show when group is selected) */}
        {selectedGroup && (
          <CollapsibleSection label="Category">
            <CheckboxGroup
              options={selectedGroup.categories}
              selected={filters.categories}
              onChange={(categories) => update({ categories })}
            />
          </CollapsibleSection>
        )}

        <CollapsibleSection label="Brand" defaultOpen={false}>
          <CheckboxGroup
            options={BRANDS}
            selected={filters.brands}
            onChange={(brands) => update({ brands })}
          />
        </CollapsibleSection>

        <CollapsibleSection label="Condition">
          <CheckboxGroup
            options={CONDITIONS}
            selected={filters.conditions}
            onChange={(conditions) => update({ conditions })}
          />
        </CollapsibleSection>

        <CollapsibleSection label="Year" defaultOpen={false}>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.yearMin}
              onChange={(e) => update({ yearMin: e.target.value })}
              placeholder="Min"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            <span className="text-gray-400">–</span>
            <input
              type="number"
              value={filters.yearMax}
              onChange={(e) => update({ yearMax: e.target.value })}
              placeholder="Max"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection label="Price (USD)" defaultOpen={false}>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => update({ priceMin: e.target.value })}
              placeholder="Min"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            <span className="text-gray-400">–</span>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => update({ priceMax: e.target.value })}
              placeholder="Max"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </CollapsibleSection>

        <div className="pt-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Location
          </div>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="City, state..."
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>
    </div>
  );
}
