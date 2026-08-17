export interface Listing {
  id: string;
  title: string;
  equipment: string;
  category: string;
  categoryGroup: "PCB Fabrication" | "PCB Assembly (PCBA)" | "Cross-cutting";
  brand: string;
  model: string;
  year: number;
  priceMin: number;
  priceMax: number;
  storageLocation: string;
  condition: string;
  service: string;
  pictures: string[];
  sellerId: string;
  createdAt: string;
}

export interface Seller {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  description: string;
}

export interface CategoryGroup {
  label: string;
  key: "PCB Fabrication" | "PCB Assembly (PCBA)" | "Cross-cutting";
  categories: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    label: "A · PCB Fabrication",
    key: "PCB Fabrication",
    categories: [
      "Material & Panel Preparation",
      "Inner-Layer Imaging",
      "Develop / Etch / Strip (DES)",
      "Inner-Layer Inspection",
      "Oxide & Bonding Treatment",
      "Lay-up & Lamination",
      "Drilling",
      "Desmear & Hole Metallization",
      "Electroplating",
      "Outer-Layer Imaging & Etch",
      "Solder Mask",
      "Legend / Marking",
      "Surface Finish",
      "Profiling & Routing",
      "Bare-Board Electrical Test",
      "Final Inspection & Metrology",
      "Flex & Rigid-Flex Specific",
      "Chemistry, Water & Effluent",
    ],
  },
  {
    label: "B · PCB Assembly (PCBA)",
    key: "PCB Assembly (PCBA)",
    categories: [
      "Material Storage & Kitting",
      "Stencil Printing",
      "Solder Paste Handling",
      "Dispensing & Adhesive",
      "Component Placement",
      "Feeders, Nozzles & Tooling",
      "Reflow Soldering",
      "Inline Inspection",
      "Through-Hole Assembly",
      "Wave Soldering",
      "Selective Soldering",
      "Hand Soldering & Rework",
      "Depaneling",
      "Cleaning",
      "Conformal Coating & Potting",
      "Electrical Test",
      "Board Handling & Conveyance",
      "Marking, Labeling & Traceability",
      "Device Programming",
      "Box Build & Final Assembly",
    ],
  },
  {
    label: "C · Cross-cutting",
    key: "Cross-cutting",
    categories: [
      "Facility & Utilities",
      "Metrology & Lab",
      "ESD & Environmental",
      "Software & CAD/CAM",
      "Spares, Tooling & Consumables",
    ],
  },
];

export const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.categories);

export const CONDITIONS = [
  "New",
  "Like New",
  "Refurbished",
  "Used - Good",
  "Used - Fair",
  "For Parts",
] as const;

export const BRANDS = [
  "Fuji",
  "Panasonic",
  "Juki",
  "Yamaha",
  "Heller",
  "BTU",
  "Ersa",
  "Vitronics Soltec",
  "DEK",
  "MPM",
  "Koh Young",
  "Mirtec",
  "Nordson",
  "MYDATA",
  "Universal Instruments",
  "ASM/Siemens",
  "Speedline",
  "Viscom",
  "Schmoll",
  "Burkle",
  "Pluritec",
  "ATG Luther & Maelzer",
  "Orbotech",
  "Atotech",
  "LPKF",
  "Other",
] as const;

export interface FilterState {
  search: string;
  categoryGroup: string;
  categories: string[];
  brands: string[];
  conditions: string[];
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  location: string;
}

export const EMPTY_FILTERS: FilterState = {
  search: "",
  categoryGroup: "",
  categories: [],
  brands: [],
  conditions: [],
  yearMin: "",
  yearMax: "",
  priceMin: "",
  priceMax: "",
  location: "",
};
