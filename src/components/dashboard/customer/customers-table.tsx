'use client';

import * as React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { customersClient, type CustomersDataResponse, type CustomersDataTable } from '@/lib/customers/client';
import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { FileDropzone } from '@/components/core/file-dropzone';

export interface Customer {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone?: string;
  quota: number;
  status: 'pending' | 'active' | 'blocked';
  createdAt: Date;
}

const columns = [
  { field: 'id', name: 'ID', width: '20px' },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          {row.name}
          <Typography color="text.secondary" variant="body2">
            {row.email}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Name',
    width: '200px',
  },
  { field: 'phoneId', name: 'Phone Number', width: '150px' },
  {
    formatter(row) {
      return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
    },
    name: 'Created At',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Grid container spacing={1}>
        <Grid item>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              if (row.onUploadPrompt) row.onUploadPrompt();
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
              if (row.onUploadRAG) row.onUploadRAG();
            }}
          >
            Upload RAG
          </Button>
        </Grid>
      </Grid>
    ),
    name: 'Actions',
    hideName: true,
    width: '200px',
    align: 'right',
  },
] satisfies ColumnDef<CustomersDataTable>[];

export function CustomersTable(): React.JSX.Element {
  const [customers, setCustomers] = React.useState<CustomersDataResponse[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [promptModalOpen, setPromptModalOpen] = React.useState(false);
  const [ragModalOpen, setRagModelopen] = React.useState(false);
  const [modalClient, setModalClient] = React.useState<CustomersDataResponse>();

  React.useEffect(() => {
    const fetchCustomers = async (): Promise<void> => {
      try {
        const response = await customersClient.getCustomers();
        if (response.error) {
          setError(response.error);
        } else {
          const _customers = response.data?.map((_customer) => {
            return {
              ..._customer,
              onUploadPrompt: () => {
                setPromptModalOpen(true);
                setModalClient(_customer);
              },
              onUploadRAG: () => {
                setRagModelopen(true);
                setModalClient(_customer);
              },
            };
          });
          setCustomers(_customers || null);
        }
      } catch (err) {
        setError('Error al obtener los customers.');
      }
    };

    void fetchCustomers();
  }, []);

  const handleClosePrompt = (): void => {
    setPromptModalOpen(false);
  };

  const handleCloseRAG = (): void => {
    setRagModelopen(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <React.Fragment>
      {customers ? <DataTable<CustomersDataResponse> columns={columns} rows={customers} /> : null}
      {!customers?.length || !customers ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No customers found
          </Typography>
        </Box>
      ) : null}
      {/* Modal */}
      {modalClient ? (
        <>
          <ModalPrompt open={promptModalOpen} onClose={handleClosePrompt} customer={modalClient} />
          <ModalRAG open={ragModalOpen} onClose={handleCloseRAG} customer={modalClient} />
        </>
      ) : null}
    </React.Fragment>
  );
}

export function ModalPrompt({
  open,
  onClose,
  customer,
}: {
  open: boolean;
  onClose: () => void;
  customer: CustomersDataResponse;
}): React.JSX.Element {
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
        <Button onClick={onClose}>Cancelar</Button>
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

export function ModalRAG({
  open,
  onClose,
  customer,
}: {
  open: boolean;
  onClose: () => void;
  customer: CustomersDataResponse;
}): React.JSX.Element {
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
