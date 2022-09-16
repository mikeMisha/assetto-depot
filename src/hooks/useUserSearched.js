import { useEffect, useState } from 'react';
export default function useUserSearched(value, filters) {
  const [isValueEmpty, setIsValueEmpty] = useState(true);
  const [isFilterEmpty, setIsFilterEmpty] = useState(true);

  useEffect(() => {
    for (let filter in filters) {
      if (filters[filter] !== '') {
        setIsFilterEmpty(false);
        break;
      }
    }
  }, [isFilterEmpty]);

  useEffect(() => {
    if (value !== '') {
      setIsValueEmpty(false);
    }
  }, [isValueEmpty]);

  return !isValueEmpty || !isFilterEmpty;
}
