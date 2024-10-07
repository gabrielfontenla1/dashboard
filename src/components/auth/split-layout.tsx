import * as React from 'react';
import Box from '@mui/material/Box';

export interface SplitLayoutProps {
  children: React.ReactNode;
}
//TODO update for new design
export function SplitLayout({ children }: SplitLayoutProps): React.JSX.Element {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 800px' }, minHeight: '100%' }}>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'var(--mui-palette-background-level1)',
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          p: 3,
        }}
      />
      <Box sx={{ boxShadow: 'var(--mui-shadows-8)', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: '420px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
