const COLORS: Record<string, { bg: string; fg: string; accent: string }> = {
  "PCB Fabrication": { bg: "#0f766e", fg: "#f0fdfa", accent: "#2dd4bf" },
  "PCB Assembly (PCBA)": { bg: "#1d4ed8", fg: "#eff6ff", accent: "#60a5fa" },
  "Cross-cutting": { bg: "#7c3aed", fg: "#f5f3ff", accent: "#a78bfa" },
};

export function generatePlaceholder(
  equipment: string,
  categoryGroup: string
): string {
  const palette = COLORS[categoryGroup] ?? COLORS["Cross-cutting"];
  const label = equipment.length > 22 ? equipment.slice(0, 20) + "…" : equipment;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${palette.bg}"/>
    <rect x="40" y="40" width="320" height="220" rx="12" fill="${palette.bg}" stroke="${palette.accent}" stroke-width="1.5" opacity="0.6"/>
    <circle cx="200" cy="120" r="40" fill="none" stroke="${palette.accent}" stroke-width="2" opacity="0.5"/>
    <line x1="160" y1="120" x2="240" y2="120" stroke="${palette.accent}" stroke-width="1.5" opacity="0.4"/>
    <line x1="200" y1="80" x2="200" y2="160" stroke="${palette.accent}" stroke-width="1.5" opacity="0.4"/>
    <rect x="80" y="180" width="240" height="1" fill="${palette.accent}" opacity="0.3"/>
    <text x="200" y="215" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="${palette.fg}">${escapeXml(label)}</text>
    <text x="200" y="240" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="${palette.accent}" opacity="0.8">Equipment Photo</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
