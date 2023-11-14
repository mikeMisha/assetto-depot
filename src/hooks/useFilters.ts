import { useMemo } from 'react';
import type { TrackSearchState } from '../store/slices/trackSearchSlice';
import type { CarSearchState } from '../store/slices/carSearchSlice';

type FiltersFromState<T> = T extends { filters: infer Filters }
  ? Filters
  : never;

export type TrackOrCarFilters = FiltersFromState<
  TrackSearchState | CarSearchState
>;

interface DataItem {
  [key: string]: any;
}

// The useFilters hook takes an object containing the current filter values
// and an array of data items to filter.
export default function useFilters<FiltersType extends TrackOrCarFilters>(
  activeFilters: FiltersType,
  data: DataItem[]
) {
  // useMemo is used to memoize the filtered data array.
  // This computation will only be re-executed when activeFilters or data changes.
  const filteredData = useMemo(() => {
    // Check if any filter is set
    const isAnyFilterActive = Object.values(activeFilters).some(
      (filterValue) => filterValue
    );

    // If no filters are active, return all data
    if (!isAnyFilterActive) {
      return [...data];
    }

    // If filters are active, return filtered data
    return [...data].filter((item) => {
      for (let filter in activeFilters) {
        if (activeFilters[filter] && item[filter] !== activeFilters[filter]) {
          return false;
        }
      }
      return true;
    });
  }, [activeFilters, data]);

  return filteredData;
}
