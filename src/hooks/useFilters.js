import { useMemo } from 'react';

export default function useFilters(filtersValues, data) {
  const filteredData = useMemo(() => {
    return [...data].filter((item) => {
      for (let filter in filtersValues) {
        if (filtersValues[filter] && item[filter] !== filtersValues[filter])
          return false;
      }

      return true;
    });
  }, [filtersValues]);

  return filteredData;
}
