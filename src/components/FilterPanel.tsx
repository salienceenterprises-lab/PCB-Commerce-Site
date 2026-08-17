"use client";

import { useState } from "react";
import { FilterState, CATEGORY_GROUPS, BRANDS, CONDITIONS } from "@/lib/types";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
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
    <div className="flex max-h-48 flex-wrap gap-x-4 gap-y-0.5 overflow-y-auto">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-800"
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

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </div>
      {children}
    </div>
  );
}

export default function FilterPanel({ filters, onChange, resultCount }: FilterPanelProps) {
  const [open, setOpen] = useState(false);
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

  const activeCount = [
    filters.categoryGroup,
    filters.categories.length > 0,
    filters.brands.length > 0,
    filters.conditions.length > 0,
    filters.yearMin || filters.yearMax,
    filters.priceMin || filters.priceMax,
    filters.location,
  ].filter(Boolean).length;

  return (
    <div className="border-b border-gray-200 bg-white shadow-sm">
      {/* Top bar — always visible */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2.5">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
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

        {/* Filter toggle button */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
            hasActiveFilters
              ? "border-brand-300 bg-brand-50 text-brand-700"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
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

        {/* Result count + clear */}
        <span className="hidden text-sm text-gray-500 sm:inline">
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

      {/* Expandable filter body */}
      {open && (
        <div className="border-t border-gray-200 bg-gray-50/70">
          <div className="mx-auto max-w-[1400px] px-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {/* Section */}
              <FilterSection label="Section">
                <div className="flex flex-wrap gap-1">
                  {[
                    { key: "", label: "All" },
                    { key: "PCB Fabrication", label: "Fabrication" },
                    { key: "PCB Assembly (PCBA)", label: "Assembly" },
                    { key: "Cross-cutting", label: "Cross-cutting" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => update({ categoryGroup: opt.key, categories: [] })}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                        filters.categoryGroup === opt.key
                          ? "bg-brand-500 text-white"
                          : "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Sub-categories */}
              {selectedGroup && (
                <FilterSection label="Category">
                  <CheckboxGroup
                    options={selectedGroup.categories}
                    selected={filters.categories}
                    onChange={(categories) => update({ categories })}
                  />
                </FilterSection>
              )}

              {/* Brand */}
              <FilterSection label="Brand">
                <CheckboxGroup
                  options={BRANDS}
                  selected={filters.brands}
                  onChange={(brands) => update({ brands })}
                />
              </FilterSection>

              {/* Condition */}
              <FilterSection label="Condition">
                <CheckboxGroup
                  options={CONDITIONS}
                  selected={filters.conditions}
                  onChange={(conditions) => update({ conditions })}
                />
              </FilterSection>

              {/* Year */}
              <FilterSection label="Year">
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
              </FilterSection>

              {/* Price */}
              <FilterSection label="Price (USD)">
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
              </FilterSection>

              {/* Location */}
              <FilterSection label="Location">
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => update({ location: e.target.value })}
                  placeholder="City, state..."
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </FilterSection>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
