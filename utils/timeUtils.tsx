import { getTimeZones } from "@vvo/tzdb";

// Computed once at module load (not a function call at each use site). Each
// entry carries an IANA zone name, country, and a list of representative
// "main cities" — consumed by the Nearest City search in
// components/window-contents/time-zone-selection.tsx.
export const getAvailableTimeZones = getTimeZones();
