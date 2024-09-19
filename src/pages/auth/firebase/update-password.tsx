import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';

export function Page(): React.JSX.Element {
  const { oobCode } = useExtractSearchParams();

  if (!oobCode) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert color="error">Code is required</Alert>
      </Box>
    );
  }

  return <>Not Used (It will be deleted soon)</>;
}

function useExtractSearchParams(): { oobCode?: string } {
  const [searchParams] = useSearchParams();

  return { oobCode: searchParams.get('oobCode') || undefined };
}
