"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORY_GROUPS, BRANDS, CONDITIONS, Listing } from "@/lib/types";
import { useSeller } from "@/lib/seller-context";

interface ListingFormProps {
  initialData?: Listing;
}

export default function ListingForm({ initialData }: ListingFormProps) {
  const router = useRouter();
  const { addListing, updateListing } = useSeller();
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    equipment: initialData?.equipment ?? "",
    categoryGroup: initialData?.categoryGroup ?? "",
    category: initialData?.category ?? "",
    brand: initialData?.brand ?? "",
    model: initialData?.model ?? "",
    year: initialData?.year?.toString() ?? "",
    price: initialData?.price?.toString() ?? "",
    storageLocation: initialData?.storageLocation ?? "",
    condition: initialData?.condition ?? "",
    service: initialData?.service ?? "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedGroup = CATEGORY_GROUPS.find((g) => g.key === form.categoryGroup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: form.title,
      equipment: form.equipment,
      categoryGroup: form.categoryGroup as Listing["categoryGroup"],
      category: form.category,
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      storageLocation: form.storageLocation,
      condition: form.condition,
      service: form.service,
      pictures: initialData?.pictures ?? [],
    };

    if (isEditing && initialData) {
      updateListing(initialData.id, data);
    } else {
      addListing(data);
    }

    router.push("/seller/dashboard");
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Listing Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className={inputClass}
              placeholder='e.g. "6-Spindle CNC Drilling Machine"'
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Equipment Type *
            </label>
            <input
              type="text"
              required
              value={form.equipment}
              onChange={(e) => update("equipment", e.target.value)}
              className={inputClass}
              placeholder="e.g. CNC Drill"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Section *
            </label>
            <select
              required
              value={form.categoryGroup}
              onChange={(e) => {
                update("categoryGroup", e.target.value);
                update("category", "");
              }}
              className={inputClass}
            >
              <option value="">Select section</option>
              {CATEGORY_GROUPS.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className={inputClass}
              disabled={!selectedGroup}
            >
              <option value="">
                {selectedGroup ? "Select category" : "Select section first"}
              </option>
              {selectedGroup?.categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Brand *
            </label>
            <select
              required
              value={form.brand}
              onChange={(e) => update("brand", e.target.value)}
              className={inputClass}
            >
              <option value="">Select brand</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Model *
            </label>
            <input
              type="text"
              required
              value={form.model}
              onChange={(e) => update("model", e.target.value)}
              className={inputClass}
              placeholder="Model number"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Year *
            </label>
            <input
              type="number"
              required
              min="1990"
              max="2026"
              value={form.year}
              onChange={(e) => update("year", e.target.value)}
              className={inputClass}
              placeholder="2020"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Price (USD) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className={inputClass}
              placeholder="150000"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Storage Location *
            </label>
            <input
              type="text"
              required
              value={form.storageLocation}
              onChange={(e) => update("storageLocation", e.target.value)}
              className={inputClass}
              placeholder="City, State"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Condition *
            </label>
            <select
              required
              value={form.condition}
              onChange={(e) => update("condition", e.target.value)}
              className={inputClass}
            >
              <option value="">Select condition</option>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Service History
          </label>
          <textarea
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="Describe maintenance history, recent repairs, included accessories..."
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Pictures
          </label>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 transition-colors hover:border-brand-400">
            <div className="text-center">
              <svg className="mx-auto mb-2 h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-sm text-gray-500">
                Drag and drop images here, or click to upload
              </p>
              <p className="mt-1 text-xs text-gray-400">
                (File upload not implemented in prototype)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
          <button
            type="button"
            onClick={() => router.push("/seller/dashboard")}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            {isEditing ? "Save Changes" : "Create Listing"}
          </button>
        </div>
      </div>
    </form>
  );
}
