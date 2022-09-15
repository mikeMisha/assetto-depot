import { useMemo } from 'react';

export default function useFilters(filtersValues, tracks) {
  const filteredData = useMemo(() => {
    return [...tracks].filter((item) => {
      for (let filter in filtersValues) {
        if (filtersValues[filter] && item[filter] !== filtersValues[filter])
          return false;
      }

      return true;
    });
  }, [filtersValues]);

  return filteredData;
}
