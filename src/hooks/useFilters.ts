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
  [key: string]: any; // Replace 'any' with the actual type of your item properties
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
    return [...data].filter((item) => {
      // Iterate over each filter in activeFilters.
      for (let filter in activeFilters) {
        // If a filter value is set and doesn't match the item's value,
        // the item is not included in the filtered results.
        if (activeFilters[filter] && item[filter] !== activeFilters[filter]) {
          return false;
        }
      }
      // If an item passes all filters, it's included in the filtered results.
      return true;
    });
  }, [activeFilters, data]);

  return filteredData;
}
