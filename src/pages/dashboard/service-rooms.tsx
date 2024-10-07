import * as React from 'react';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import ServiceRoomsView from '@/components/dashboard/service-rooms/service-rooms-view';

const metadata = { title: `Service rooms | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
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
        <ServiceRoomsView />
      </Box>
    </React.Fragment>
  );
}
