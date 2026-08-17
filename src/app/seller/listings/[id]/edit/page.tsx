"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSeller } from "@/lib/seller-context";
import ListingForm from "@/components/ListingForm";

export default function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { isLoggedIn, sellerListings } = useSeller();

  if (!isLoggedIn) {
    router.push("/seller/signup");
    return null;
  }

  const listing = sellerListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
        <p className="text-gray-500">Listing not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
      <Link
        href="/seller/dashboard"
        className="mb-4 inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-800"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to dashboard
      </Link>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">Edit Listing</h1>
      <p className="mb-6 text-sm text-gray-500">
        Update the details for &ldquo;{listing.title}&rdquo;.
      </p>
      <ListingForm initialData={listing} />
    </div>
  );
}
