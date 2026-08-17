import { Listing, FilterState } from "./types";

export function applyFilters(listings: Listing[], filters: FilterState): Listing[] {
  return listings.filter((listing) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const searchable = [
        listing.title,
        listing.equipment,
        listing.brand,
        listing.model,
        listing.category,
        listing.categoryGroup,
        listing.storageLocation,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    if (filters.categoryGroup && listing.categoryGroup !== filters.categoryGroup) {
      return false;
    }

    if (filters.categories.length > 0 && !filters.categories.includes(listing.category)) {
      return false;
    }

    if (filters.brands.length > 0 && !filters.brands.includes(listing.brand)) {
      return false;
    }

    if (filters.conditions.length > 0 && !filters.conditions.includes(listing.condition)) {
      return false;
    }

    if (filters.yearMin && listing.year < Number(filters.yearMin)) return false;
    if (filters.yearMax && listing.year > Number(filters.yearMax)) return false;
    if (filters.priceMin && listing.price < Number(filters.priceMin)) return false;
    if (filters.priceMax && listing.price > Number(filters.priceMax)) return false;

    if (filters.location) {
      if (!listing.storageLocation.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}
