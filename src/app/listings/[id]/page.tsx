import { getListingById, getSellerById } from "@/lib/mock-data";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function GroupLabel({ group }: { group: string }) {
  const style =
    group === "PCB Fabrication"
      ? "bg-fab-light text-fab"
      : group === "PCB Assembly (PCBA)"
        ? "bg-asm-light text-asm"
        : "bg-cross-light text-cross";
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${style}`}>
      {group}
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
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
      {condition}
    </span>
  );
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const seller = getSellerById(listing.sellerId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      <Link
        href="/listings"
        className="mb-4 inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-800"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to listings
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Image area */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {listing.pictures.length > 0 ? (
              <img
                src={listing.pictures[0]}
                alt={listing.title}
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-gray-100 text-sm text-gray-400">
                No image available
              </div>
            )}
            {listing.pictures.length > 1 && (
              <div className="flex gap-1 border-t border-gray-200 p-2">
                {listing.pictures.slice(1, 5).map((pic, i) => (
                  <img
                    key={i}
                    src={pic}
                    alt=""
                    className="h-14 w-14 rounded object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile price + condition (shown above details on small screens) */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:hidden">
            <div className="text-2xl font-bold text-brand-700">
              {listing.priceMin === listing.priceMax
                ? formatPrice(listing.priceMin)
                : `${formatPrice(listing.priceMin)} – ${formatPrice(listing.priceMax)}`}
            </div>
            <ConditionBadge condition={listing.condition} />
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <GroupLabel group={listing.categoryGroup} />
              <span className="text-sm text-gray-500">{listing.category}</span>
            </div>

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {listing.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {listing.brand} {listing.model} &middot; {listing.year}
                </p>
              </div>
              {/* Desktop price + condition */}
              <div className="hidden text-right lg:block">
                <div className="text-2xl font-bold text-brand-700">
                  {listing.priceMin === listing.priceMax
                ? formatPrice(listing.priceMin)
                : `${formatPrice(listing.priceMin)} – ${formatPrice(listing.priceMax)}`}
                </div>
                <div className="mt-1">
                  <ConditionBadge condition={listing.condition} />
                </div>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 rounded-lg bg-surface-alt p-4 text-sm sm:grid-cols-2">
              {[
                ["Equipment", listing.equipment],
                ["Category", listing.category],
                ["Brand", listing.brand],
                ["Model", listing.model],
                ["Year", listing.year],
                ["Location", listing.storageLocation],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <span className="font-medium text-gray-500">{label as string}:</span>{" "}
                  <span className="text-gray-900">{value as string}</span>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Service History
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                {listing.service}
              </p>
            </div>

            {seller && (
              <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">
                  Seller
                </h2>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{seller.companyName}</p>
                  <p className="text-gray-600">{seller.contactName} &middot; {seller.location}</p>
                  <p className="mt-1 text-gray-600">{seller.description}</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <a
                      href={`mailto:${seller.email}`}
                      className="rounded-md bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-brand-700"
                    >
                      Contact Seller
                    </a>
                    <a
                      href={`tel:${seller.phone}`}
                      className="rounded-md border border-brand-300 bg-white px-4 py-2 text-center text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50"
                    >
                      {seller.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
