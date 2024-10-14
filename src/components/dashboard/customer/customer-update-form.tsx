'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import type { CustomerDto, CustomersDataResponse } from '@/types/customer';
import { customersClient } from '@/lib/customers/client';
import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

const schema = zod.object({
  id: zod.number().min(1, 'Id is required').max(255),
  name: zod.string().min(1, 'Name is required').max(255),
  email: zod.string().email('Must be a valid email').min(1, 'Email is required').max(255),
  phone: zod.string().min(1, 'Phone is required').max(15),
});

type Values = zod.infer<typeof schema>;

/**
 * Customer update form
 *
 * @param open - boolean to open the dialog
 * @param onClose - function to close the dialog
 * @param customer - customer data to update
 */
export function CustomerUpdateForm({
  open,
  onClose,
  customer,
}: Readonly<{
  open: boolean;
  onClose: () => void;
  customer: CustomersDataResponse;
}>): React.JSX.Element {
  const defaultValues = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phoneId,
  } as Values;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (_: Values): Promise<void> => {
    try {
      await customersClient.updateCustomer(_ as unknown as CustomerDto);
      toast.success('Customer updated');
    } catch (err) {
      logger.error(err);
      toast.error('Something went wrong!');
    }
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', paddingTop: '24px' }}>
        Update data for {customer.name}
      </DialogTitle>
      <DialogContent sx={{ padding: '32px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardContent>
              <Stack divider={<Divider />} spacing={3}>
                <Stack spacing={3}>
                  <Typography variant="h6">Account information</Typography>
                  <Grid container spacing={4}>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="id"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.id)} fullWidth>
                            <InputLabel>Id</InputLabel>
                            <OutlinedInput {...field} readOnly />
                            {errors.id ? <FormHelperText>{errors.id.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.name)} fullWidth>
                            <InputLabel required>Name</InputLabel>
                            <OutlinedInput {...field} />
                            {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.email)} fullWidth>
                            <InputLabel required>Email address</InputLabel>
                            <OutlinedInput {...field} type="email" />
                            {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.phone)} fullWidth>
                            <InputLabel required>Phone number</InputLabel>
                            <OutlinedInput {...field} />
                            {errors.phone ? <FormHelperText>{errors.phone.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="end">
                    <Grid md={6} xs={12}>
                      <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        sx={{
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
