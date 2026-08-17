"use client";

import { useState } from "react";
import Link from "next/link";
import { useSeller } from "@/lib/seller-context";

export default function Navbar() {
  const { isLoggedIn, seller, logout } = useSeller();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-brand-950 text-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-500 text-xs font-black">
            PCB
          </span>
          <span>Exchange</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/listings"
            className="text-sm text-brand-200 transition-colors hover:text-white"
          >
            Browse Equipment
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/seller/dashboard"
                className="text-sm text-brand-200 transition-colors hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/seller/listings/new"
                className="rounded-md bg-brand-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-400"
              >
                + New Listing
              </Link>
              <span className="text-sm text-brand-300">
                {seller?.companyName}
              </span>
              <button
                onClick={logout}
                className="text-sm text-brand-300 transition-colors hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/seller/signup"
              className="rounded-md bg-brand-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-400"
            >
              Sell Equipment
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-brand-200 transition-colors hover:bg-brand-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-brand-800 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/listings"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-brand-200 transition-colors hover:bg-brand-800 hover:text-white"
            >
              Browse Equipment
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/seller/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-brand-200 transition-colors hover:bg-brand-800 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/seller/listings/new"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-brand-200 transition-colors hover:bg-brand-800 hover:text-white"
                >
                  + New Listing
                </Link>
                <div className="mt-1 border-t border-brand-800 pt-2">
                  <span className="block px-3 text-xs text-brand-400">
                    {seller?.companyName}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm text-brand-300 transition-colors hover:bg-brand-800 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/seller/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-md bg-brand-500 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-brand-400"
              >
                Sell Equipment
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
