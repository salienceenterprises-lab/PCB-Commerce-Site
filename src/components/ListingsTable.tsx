"use client";

import Link from "next/link";
import { Listing } from "@/lib/types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function priceRange(listing: Listing): string {
  if (listing.priceMin === listing.priceMax) return formatPrice(listing.priceMin);
  return `${formatPrice(listing.priceMin)} – ${formatPrice(listing.priceMax)}`;
}

function GroupBadge({ group }: { group: string }) {
  const style =
    group === "PCB Fabrication"
      ? "bg-fab-light text-fab"
      : group === "PCB Assembly (PCBA)"
        ? "bg-asm-light text-asm"
        : "bg-cross-light text-cross";
  const short =
    group === "PCB Fabrication"
      ? "Fab"
      : group === "PCB Assembly (PCBA)"
        ? "Asm"
        : "Cross";
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style}`}>
      {short}
    </span>
  );
}

function ConditionBadge({ condition }: { condition: string }) {
  const style =
    condition === "New"
      ? "bg-emerald-100 text-emerald-700 ring-emerald-600/20"
      : condition === "Like New"
        ? "bg-teal-50 text-teal-700 ring-teal-600/20"
        : condition === "Refurbished"
          ? "bg-sky-50 text-sky-700 ring-sky-600/20"
          : condition === "Used - Good"
            ? "bg-amber-50 text-amber-700 ring-amber-600/20"
            : condition === "Used - Fair"
              ? "bg-orange-50 text-orange-700 ring-orange-600/20"
              : "bg-gray-100 text-gray-600 ring-gray-500/20";
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
      {condition}
    </span>
  );
}

interface ListingsTableProps {
  listings: Listing[];
  stickyTop?: number;
}

export default function ListingsTable({ listings, stickyTop = 0 }: ListingsTableProps) {
  if (listings.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-center">
        <svg className="mb-2 h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-sm text-gray-500">No equipment matches your filters.</p>
        <p className="text-xs text-gray-400">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile card layout */}
      <div className="space-y-3 md:hidden">
        {listings.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.id}`}
            className="block rounded-lg border border-gray-200 bg-white shadow-sm transition-colors hover:border-brand-200"
          >
            <div className="flex gap-3 p-3">
              {listing.pictures.length > 0 && (
                <img
                  src={listing.pictures[0]}
                  alt=""
                  className="h-20 w-24 shrink-0 rounded object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-1.5">
                  <GroupBadge group={listing.categoryGroup} />
                  <span className="truncate text-xs text-gray-500">{listing.category}</span>
                </div>
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {listing.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {listing.brand} {listing.model} &middot; {listing.year}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-sm font-bold text-brand-700">
                    {priceRange(listing)}
                  </span>
                  <ConditionBadge condition={listing.condition} />
                </div>
                <p className="mt-1 text-xs text-gray-400">{listing.storageLocation}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop table layout */}
      <div className="hidden rounded-lg border border-gray-200 bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className="border-b border-gray-200 bg-gray-50"
              style={{ position: "sticky", top: stickyTop, zIndex: 10 }}
            >
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Listing</th>
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Equipment</th>
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Category</th>
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Brand</th>
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Model</th>
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Year</th>
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Price Range</th>
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Location</th>
              <th className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Condition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listings.map((listing) => (
              <tr key={listing.id} className="transition-colors hover:bg-brand-50/40">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    {listing.pictures.length > 0 && (
                      <img
                        src={listing.pictures[0]}
                        alt=""
                        className="h-10 w-14 shrink-0 rounded object-cover"
                      />
                    )}
                    <Link
                      href={`/listings/${listing.id}`}
                      className="font-medium text-brand-700 hover:text-brand-900 hover:underline"
                    >
                      {listing.title}
                    </Link>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-gray-600">
                  {listing.equipment}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <GroupBadge group={listing.categoryGroup} />
                    <span className="text-gray-600">{listing.category}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-gray-700">
                  {listing.brand}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-gray-600">
                  {listing.model}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-gray-600">
                  {listing.year}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-semibold text-gray-900">
                  {priceRange(listing)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-gray-600">
                  {listing.storageLocation}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  <ConditionBadge condition={listing.condition} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
