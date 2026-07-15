/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const usePagination = (key: string, initialPage: number = 1) => {
  const storageKey = `pagination_${key}`;

  const savedPage = typeof window !== 'undefined' ? parseInt(localStorage.getItem(storageKey) ?? `${initialPage}`, 10) : initialPage;
  const [currentPage, setCurrentPage] = useState<number>(savedPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem(storageKey, page.toString());
  };

  useEffect(() => {
    setCurrentPage(savedPage);
  }, [storageKey]);

  return { currentPage, handlePageChange };
};

export default usePagination;
