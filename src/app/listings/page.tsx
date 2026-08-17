"use client";

import { useState } from "react";
import { listings } from "@/lib/mock-data";
import { EMPTY_FILTERS, FilterState } from "@/lib/types";
import { applyFilters } from "@/lib/filters";
import FilterPanel from "@/components/FilterPanel";
import ListingsTable from "@/components/ListingsTable";

export default function ListingsPage() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const filtered = applyFilters(listings, filters);

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

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
          PCB Manufacturing Equipment
        </h1>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-500 sm:inline">
            Showing {filtered.length} of {listings.length} listings
          </span>
          <span className="text-sm text-gray-500 sm:hidden">
            {filtered.length} results
          </span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors lg:hidden ${
              hasActiveFilters
                ? "border-brand-300 bg-brand-50 text-brand-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                !
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile filter overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-gray-50 shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
              <span className="text-sm font-semibold text-gray-800">Filters</span>
              <button
                onClick={() => setShowFilters(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                resultCount={filtered.length}
                mobile
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop filter sidebar */}
        <div className="hidden lg:block">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            resultCount={filtered.length}
          />
        </div>
        <div className="min-w-0 flex-1">
          <ListingsTable listings={filtered} />
        </div>
      </div>
    </div>
  );
}
