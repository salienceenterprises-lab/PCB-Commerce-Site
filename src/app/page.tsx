import Link from "next/link";
import { CATEGORY_GROUPS } from "@/lib/types";

const GROUP_STYLES: Record<string, { border: string; hover: string; badge: string; badgeText: string }> = {
  "PCB Fabrication": {
    border: "border-fab/20",
    hover: "hover:border-fab/50 hover:bg-fab-light/40",
    badge: "bg-fab-light",
    badgeText: "text-fab",
  },
  "PCB Assembly (PCBA)": {
    border: "border-asm/20",
    hover: "hover:border-asm/50 hover:bg-asm-light/40",
    badge: "bg-asm-light",
    badgeText: "text-asm",
  },
  "Cross-cutting": {
    border: "border-cross/20",
    hover: "hover:border-cross/50 hover:bg-cross-light/40",
    badge: "bg-cross-light",
    badgeText: "text-cross",
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950 px-4 py-16 text-center sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-800/30 via-transparent to-transparent" />
        <div className="relative">
          <div className="mx-auto mb-4 inline-block rounded-full bg-brand-800/50 px-4 py-1 text-xs font-medium tracking-wide text-brand-200">
            The marketplace for PCB manufacturing equipment
          </div>
          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Buy and Sell{" "}
            <span className="bg-gradient-to-r from-brand-300 to-brand-400 bg-clip-text text-transparent">
              PCB Manufacturing
            </span>{" "}
            Equipment
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-200">
            From bare board fabrication to final assembly — drilling machines,
            plating lines, pick and place, AOI systems, and everything in between.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 px-4 sm:flex-row sm:gap-4 sm:px-0">
            <Link
              href="/listings"
              className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400 hover:shadow-brand-400/30"
            >
              Browse Equipment
            </Link>
            <Link
              href="/seller/signup"
              className="rounded-lg border border-brand-400/30 bg-brand-800/40 px-6 py-3 text-sm font-semibold text-brand-100 transition-all hover:bg-brand-700/40"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-gray-200 sm:grid-cols-4">
          {[
            { value: "45+", label: "Listings" },
            { value: "43", label: "Categories" },
            { value: "4", label: "Countries" },
            { value: "25+", label: "Brands" },
          ].map((stat) => (
            <div key={stat.label} className="py-4 text-center sm:py-5">
              <div className="text-xl font-bold text-brand-700 sm:text-2xl">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Equipment Categories
        </h2>
        <p className="mb-10 text-center text-sm text-gray-500">
          Covering every stage of the PCB manufacturing process
        </p>

        <div className="space-y-10">
          {CATEGORY_GROUPS.map((group) => {
            const s = GROUP_STYLES[group.key];
            return (
              <div key={group.key}>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                  <span className={`rounded px-2 py-0.5 ${s.badge} ${s.badgeText}`}>
                    {group.label}
                  </span>
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {group.categories.map((cat) => (
                    <Link
                      key={cat}
                      href="/listings"
                      className={`rounded-lg border ${s.border} bg-white p-3 text-sm text-gray-700 transition-all ${s.hover}`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-200 bg-white px-4 py-16">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="mb-10 text-center text-sm text-gray-500">
          Simple, direct, and transparent
        </p>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Browse & Filter",
              desc: "Search through equipment by fabrication stage, assembly process, brand, condition, and price.",
              color: "bg-fab text-white",
            },
            {
              step: "2",
              title: "Connect",
              desc: "Contact sellers directly to discuss equipment details, history, availability, and shipping.",
              color: "bg-asm text-white",
            },
            {
              step: "3",
              title: "Purchase",
              desc: "Finalize the deal with the seller and arrange delivery, installation, or pickup.",
              color: "bg-cross text-white",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${item.color}`}>
                {item.step}
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-950 px-4 py-16 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">
          Have equipment to sell?
        </h2>
        <p className="mx-auto mb-6 max-w-md text-sm text-brand-200">
          List your PCB manufacturing equipment and reach buyers worldwide. Free
          to create an account.
        </p>
        <Link
          href="/seller/signup"
          className="inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400"
        >
          Start Selling
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-8 text-center text-xs text-gray-400">
        PCB Exchange &middot; Prototype &middot; 2024
      </footer>
    </div>
  );
}
