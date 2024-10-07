'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { type CustomersDataResponse } from '@/types/customer';
import { customersClient } from '@/lib/customers/client';
import { FileDropzone } from '@/components/core/file-dropzone';

export function ModalRAG({
  open,
  onClose,
  customer,
}: Readonly<{
  open: boolean;
  onClose: () => void;
  customer: CustomersDataResponse;
}>): React.JSX.Element {
  const [base64String, setBase64String] = React.useState<string>('');
  const [caption, setCaption] = React.useState<string>('Only PDF is allowed');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(false);
  }, [open]);

  const handleUpload = (files: File[]): void => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result as string);
        setCaption(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadRAG = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await customersClient.updateRAG(customer.id, base64String);
      if (response.error) {
        setError(response.error);
      } else {
        onClose();
      }
    } catch (err) {
      setError('Error al actualizar el RAG.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', paddingTop: '24px' }}>
        Upload RAG for {customer.name}
      </DialogTitle>
      <DialogContent sx={{ padding: '32px' }}>
        <FileDropzone
          accept={{ 'application/pdf': [] }}
          caption={caption}
          multiple={false}
          onDrop={(files) => {
            handleUpload(files);
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '24px 32px' }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          disabled={Boolean(!base64String) || isLoading}
          onClick={() => {
            void uploadRAG();
          }}
          variant="contained"
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
