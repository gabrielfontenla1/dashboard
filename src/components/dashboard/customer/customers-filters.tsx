'use client';

import * as React from 'react';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';

export interface Filters {
  email?: string;
  phone?: string;
  status?: string;
}

export type SortDir = 'asc' | 'desc';

export interface CustomersFiltersProps {
  filters?: Filters;
  sortDir?: SortDir;
}

export function CustomersFilters({ filters = {}, sortDir = 'desc' }: CustomersFiltersProps): React.JSX.Element {
  const { status } = filters;

  const updateSearchParams = React.useCallback((newFilters: Filters, newSortDir: SortDir): void => {
    const searchParams = new URLSearchParams();

    if (newSortDir === 'asc') {
      searchParams.set('sortDir', newSortDir);
    }

    if (newFilters.status) {
      searchParams.set('status', newFilters.status);
    }

    if (newFilters.email) {
      searchParams.set('email', newFilters.email);
    }

    if (newFilters.phone) {
      searchParams.set('phone', newFilters.phone);
    }
  }, []);

  const handleStatusChange = React.useCallback(
    (_: React.SyntheticEvent, value: string) => {
      updateSearchParams({ ...filters, status: value }, sortDir);
    },
    [updateSearchParams, filters, sortDir]
  );

  return (
    <div>
      <Tabs onChange={handleStatusChange} sx={{ px: 3 }} value={status ?? ''} variant="scrollable"></Tabs>
      <Divider />
    </div>
  );
}
