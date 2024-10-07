import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusCircle } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
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
        <Box
          sx={{
            m: 'var(--Content-margin)',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'end',
            display: 'flex',
          }}
        >
          <IconButton
            component={Link}
            href={paths.dashboard.customers.create}
            style={{
              backgroundColor: 'var(--mui-palette-info-main)',
              color: 'white',
              width: 60,
              height: 60,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlusCircle fontSize="var(--icon-fontSize-lg)" />
          </IconButton>
        </Box>
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
    email: searchParams.get('email') ?? undefined,
    phone: searchParams.get('phone') ?? undefined,
    sortDir: (searchParams.get('sortDir') ?? undefined) as 'asc' | 'desc' | undefined,
    status: searchParams.get('status') ?? undefined,
  };
}
