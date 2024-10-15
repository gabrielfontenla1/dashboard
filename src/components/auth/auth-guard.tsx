'use client';

import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isObjectEmpty } from '@/utils/object-empty';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { AuthStrategy } from '@/lib/auth/strategy';
import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const token = useMemo(() => localStorage.getItem('accessToken'), []);

  const checkPermissions = useCallback(async (): Promise<void> => {
    if (!token) {
      setIsModalOpened(true);
    }
    const { data } = await authClient.validateToken(token);
    if (isObjectEmpty(data.tokenInfo)) {
      setIsModalOpened(true);
    }
  }, [token]);

  useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
  }, [checkPermissions]);

  const redirectToLogin = useCallback((): void => {
    logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
    switch (config.auth.strategy) {
      case AuthStrategy.CUSTOM: {
        navigate(paths.auth.custom.signIn, { replace: true });
        return;
      }
      default: {
        logger.error('[AuthGuard]: Unknown auth strategy');
      }
    }
  }, [navigate]);

  const onLogin = useCallback(async (): Promise<void> => {
    setIsPending(true);
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (!email || !password) {
      setIsPending(false);
      toast.error('email and password are incorrect! redirecting to login');
      redirectToLogin();
      return;
    }
    const loginResponse = await authClient.signInWithPassword({ email, password });
    if (loginResponse.error) {
      setIsPending(false);
      toast.error('Ups... Something went wrong!');
      redirectToLogin();
      return;
    }
    if (loginResponse.data) {
      setIsModalOpened(false);
      setIsPending(false);
    }
  }, [redirectToLogin]);

  return isModalOpened ? (
    <Dialog onClose={onLogin} maxWidth="md" fullWidth open={isModalOpened}>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', paddingTop: '24px' }}>
        Error
      </DialogTitle>
      <DialogContent sx={{ padding: '32px' }}>
        There has been a period of inactivity, do you want to stay on the page?
      </DialogContent>
      <DialogActions sx={{ padding: '24px 32px' }}>
        <Button onClick={redirectToLogin}>No</Button>
        <Button disabled={isPending} onClick={onLogin}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <>{children}</>
  );
}
