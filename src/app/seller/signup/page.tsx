"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSeller } from "@/lib/seller-context";
import { Seller } from "@/lib/types";

const STEPS = ["Company Info", "Contact Details", "Review"] as const;

export default function SellerSignupPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useSeller();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    description: "",
  });

  if (isLoggedIn) {
    router.push("/seller/dashboard");
    return null;
  }

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canAdvance =
    step === 0
      ? form.companyName && form.location
      : step === 1
        ? form.contactName && form.email
        : true;

  const handleSubmit = () => {
    const seller: Seller = {
      id: `seller-${Date.now()}`,
      ...form,
    };
    login(seller);
    router.push("/seller/dashboard");
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:py-12">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">
          Start Selling Equipment
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Set up your seller account in a few simple steps.
        </p>

        {/* Progress */}
        <div className="mb-8 flex gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  i <= step ? "bg-brand-500" : "bg-gray-200"
                }`}
              />
              <span
                className={`mt-1.5 block text-xs ${
                  i <= step ? "font-semibold text-brand-600" : "text-gray-400"
                }`}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Your company or business name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="City, State/Country"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Company Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Brief description of your business"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Contact Name *
              </label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Primary contact person"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="(555) 555-0100"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="rounded-lg bg-surface-alt p-4 text-sm">
            <h3 className="mb-3 font-semibold text-gray-900">Review your details</h3>
            <dl className="space-y-2">
              {[
                ["Company", form.companyName],
                ["Location", form.location],
                ["Contact", form.contactName],
                ["Email", form.email],
                ...(form.phone ? [["Phone", form.phone]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-gray-500">{label}</dt>
                  <dd className="font-medium text-gray-900">{value}</dd>
                </div>
              ))}
              {form.description && (
                <div>
                  <dt className="text-gray-500">Description</dt>
                  <dd className="mt-1 text-gray-900">{form.description}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:invisible"
          >
            Back
          </button>
          {step < 2 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance}
              className="rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
