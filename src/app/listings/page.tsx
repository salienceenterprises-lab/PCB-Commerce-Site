"use client";

import { useState, useRef, useEffect } from "react";
import { listings } from "@/lib/mock-data";
import { EMPTY_FILTERS, FilterState } from "@/lib/types";
import { applyFilters } from "@/lib/filters";
import FilterPanel from "@/components/FilterPanel";
import ListingsTable from "@/components/ListingsTable";

export default function ListingsPage() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const filtered = applyFilters(listings, filters);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterHeight, setFilterHeight] = useState(0);

  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setFilterHeight(el.offsetHeight);
    });
    observer.observe(el);
    setFilterHeight(el.offsetHeight);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div ref={filterRef} className="sticky top-0 z-20">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />
      </div>
      <div className="mx-auto max-w-[1400px] px-4 py-4">
        <ListingsTable listings={filtered} stickyTop={filterHeight} />
      </div>
    </div>
  );
}
