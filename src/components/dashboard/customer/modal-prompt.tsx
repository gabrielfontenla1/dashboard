'use client';

import * as React from 'react';
import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import type { CustomersDataResponse } from '@/types/customer';
import { customersClient } from '@/lib/customers/client';

export function ModalPrompt({
  open,
  onClose,
  customer,
}: Readonly<{
  open: boolean;
  onClose: () => void;
  customer: CustomersDataResponse;
}>): React.JSX.Element {
  const [text, setText] = React.useState<string>(customer.prompt);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(false);
  }, [open]);

  const uploadPrompt = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await customersClient.updatePrompt(customer.id, text);
      if (response.error) {
        setError(response.error);
      } else {
        onClose();
      }
    } catch (err) {
      setError('Error al actualizar el prompt.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', paddingTop: '24px' }}>
        Upload Prompt for {customer.name}
      </DialogTitle>
      <DialogContent sx={{ padding: '32px' }}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={12}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          sx={{ marginTop: '16px' }}
          placeholder="Escribe aquí..."
        />
      </DialogContent>
      <DialogActions sx={{ padding: '24px 32px' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            void uploadPrompt();
          }}
          disabled={isLoading}
          variant="contained"
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
