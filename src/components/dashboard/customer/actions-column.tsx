'use client';

import * as React from 'react';
import { Button, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { PencilSimple } from '@phosphor-icons/react';

import type { CustomersDataTable } from '@/types/customer';

export function ActionsColumn(row: CustomersDataTable): React.JSX.Element {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            row.onUploadPrompt && row.onUploadPrompt();
          }}
        >
          Upload Prompt
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            row.onUploadRAG && row.onUploadRAG();
          }}
        >
          Upload RAG
        </Button>
      </Grid>
      <Grid item>
        <IconButton
          style={{
            backgroundColor: 'var(--mui-palette-info-main)',
            color: 'white',
            width: 60,
            height: 35,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            row.onEdit && row.onEdit();
          }}
        >
          <PencilSimple fontSize="var(--icon-fontSize-md)" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
