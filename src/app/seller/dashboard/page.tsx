"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSeller } from "@/lib/seller-context";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function SellerDashboardPage() {
  const router = useRouter();
  const { seller, sellerListings, isLoggedIn, deleteListing } = useSeller();

  if (!isLoggedIn) {
    router.push("/seller/signup");
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Seller Dashboard</h1>
          <p className="text-sm text-gray-500">
            {seller?.companyName} &middot; {seller?.location}
          </p>
        </div>
        <Link
          href="/seller/listings/new"
          className="rounded-md bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 sm:w-auto"
        >
          + New Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {[
          {
            value: sellerListings.length.toString(),
            label: "Active Listings",
            color: "border-fab/30 bg-fab-light/30",
          },
          {
            value:
              sellerListings.length > 0
                ? formatPrice(
                    sellerListings.reduce((sum, l) => sum + (l.priceMin + l.priceMax) / 2, 0) /
                      sellerListings.length
                  )
                : "$0",
            label: "Avg. Listing Price",
            color: "border-asm/30 bg-asm-light/30",
          },
          {
            value: formatPrice(
              sellerListings.reduce((sum, l) => sum + l.priceMax, 0)
            ),
            label: "Total Inventory Value",
            color: "border-cross/30 bg-cross-light/30",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-lg border p-4 ${stat.color}`}
          >
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Listings */}
      {sellerListings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
          <svg className="mx-auto mb-3 h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <p className="mb-1 text-gray-500">You have no listings yet.</p>
          <Link
            href="/seller/listings/new"
            className="text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            Create your first listing
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile card layout */}
          <div className="space-y-3 sm:hidden">
            {sellerListings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-1 font-medium text-gray-900">{listing.title}</div>
                <div className="mb-2 text-xs text-gray-500">
                  {listing.brand} {listing.model} &middot; {listing.category}
                </div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{listing.priceMin === listing.priceMax ? formatPrice(listing.priceMin) : `${formatPrice(listing.priceMin)} – ${formatPrice(listing.priceMax)}`}</span>
                  <span className="text-xs text-gray-500">{listing.condition}</span>
                </div>
                <div className="flex gap-3 border-t border-gray-100 pt-3">
                  <Link
                    href={`/seller/listings/${listing.id}/edit`}
                    className="text-sm font-medium text-brand-600 hover:text-brand-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Delete this listing?")) {
                        deleteListing(listing.id);
                      }
                    }}
                    className="text-sm font-medium text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm sm:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Listing</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Price Range</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Condition</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Created</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sellerListings.map((listing) => (
                  <tr key={listing.id} className="transition-colors hover:bg-brand-50/30">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{listing.title}</div>
                      <div className="text-xs text-gray-500">{listing.brand} {listing.model}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{listing.category}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">{listing.priceMin === listing.priceMax ? formatPrice(listing.priceMin) : `${formatPrice(listing.priceMin)} – ${formatPrice(listing.priceMax)}`}</td>
                    <td className="px-4 py-3 text-gray-600">{listing.condition}</td>
                    <td className="px-4 py-3 text-gray-500">{listing.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link
                          href={`/seller/listings/${listing.id}/edit`}
                          className="text-sm font-medium text-brand-600 hover:text-brand-800"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm("Delete this listing?")) {
                              deleteListing(listing.id);
                            }
                          }}
                          className="text-sm font-medium text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
