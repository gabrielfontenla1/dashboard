import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function EmailColumn(row: { name: string; email: string }): React.JSX.Element {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <div>
        {row.name}
        <Typography color="text.secondary" variant="body2">
          {row.email}
        </Typography>
      </div>
    </Stack>
  );
}
