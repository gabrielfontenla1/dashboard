import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';

const metadata = { title: `List | Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  const { email, phone, sortDir, status } = useExtractSearchParams();

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Customers</Typography>
            </Box>
          </Stack>
          <Card>
            <CustomersFilters filters={{ email, phone, status }} sortDir={sortDir} />
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
              <CustomersTable />
            </Box>
            <Divider />
          </Card>
        </Stack>
      </Box>
    </React.Fragment>
  );
}

function useExtractSearchParams(): {
  email: string | undefined;
  phone: string | undefined;
  sortDir: 'asc' | 'desc' | undefined;
  status: string | undefined;
} {
  const [searchParams] = useSearchParams();

  return {
    email: searchParams.get('email') || undefined,
    phone: searchParams.get('phone') || undefined,
    sortDir: (searchParams.get('sortDir') || undefined) as 'asc' | 'desc' | undefined,
    status: searchParams.get('status') || undefined,
  };
}
