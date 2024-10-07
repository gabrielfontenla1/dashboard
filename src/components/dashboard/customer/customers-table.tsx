'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CustomersDataResponse, CustomersDataTable } from '@/types/customer';
import { customersClient } from '@/lib/customers/client';
import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { ActionsColumn } from '@/components/dashboard/customer/actions-column';
import { CustomerUpdateForm } from '@/components/dashboard/customer/customer-update-form';
import { EmailColumn } from '@/components/dashboard/customer/email-column';
import { ModalPrompt } from '@/components/dashboard/customer/modal-prompt';
import { ModalRAG } from '@/components/dashboard/customer/modal-rag';

export function CustomersTable(): React.JSX.Element {
  const [customers, setCustomers] = React.useState<CustomersDataResponse[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [promptModalOpen, setPromptModalOpen] = React.useState(false);
  const [ragModalOpen, setRagModalOpen] = React.useState(false);
  const [updateCustomerModalOpen, setUpdateCustomerRagModalOpen] = React.useState(false);
  const [modalClient, setModalClient] = React.useState<CustomersDataResponse>();

  const columns = React.useMemo(
    () =>
      [
        { field: 'id', name: 'ID', width: '20px' },
        {
          formatter: EmailColumn,
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
          formatter: ActionsColumn,
          name: 'Actions',
          hideName: true,
          width: '250px',
          align: 'right',
        },
      ] satisfies ColumnDef<CustomersDataTable>[],
    []
  );

  const ModalPromptMemo = React.memo(ModalPrompt);
  const ModalRAGMemo = React.memo(ModalRAG);
  const CustomerUpdateFormMemo = React.memo(CustomerUpdateForm);

  const generateCustomersInfoAndActions = (customer: CustomersDataResponse): CustomersDataTable => {
    return {
      ...customer,
      onUploadPrompt: () => {
        setPromptModalOpen(true);
        setModalClient(customer);
      },
      onUploadRAG: () => {
        setRagModalOpen(true);
        setModalClient(customer);
      },
      onEdit: () => {
        setUpdateCustomerRagModalOpen(true);
        setModalClient(customer);
      },
    };
  };

  React.useEffect(() => {
    const fetchCustomers = async (): Promise<void> => {
      try {
        const response = await customersClient.getCustomers();
        if (response.error) {
          setError(response.error);
        } else {
          const _customers = response.data?.map(generateCustomersInfoAndActions);
          setCustomers(_customers || null);
        }
      } catch (err) {
        setError('Error al obtener los customers.');
      }
    };

    void fetchCustomers();
  }, []);

  const handleClosePrompt = React.useCallback((): void => {
    setPromptModalOpen(false);
  }, []);

  const handleCloseRAG = React.useCallback((): void => {
    setRagModalOpen(false);
  }, []);

  const handleCloseUpdateCustomer = React.useCallback((): void => {
    setUpdateCustomerRagModalOpen(false);
  }, []);

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
      {modalClient ? (
        <>
          {promptModalOpen ? (
            <ModalPromptMemo open={promptModalOpen} onClose={handleClosePrompt} customer={modalClient} />
          ) : null}
          {ragModalOpen ? <ModalRAGMemo open={ragModalOpen} onClose={handleCloseRAG} customer={modalClient} /> : null}
          {updateCustomerModalOpen ? (
            <CustomerUpdateFormMemo
              open={updateCustomerModalOpen}
              onClose={handleCloseUpdateCustomer}
              customer={modalClient}
            />
          ) : null}
        </>
      ) : null}
    </React.Fragment>
  );
}
