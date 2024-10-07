'use client';

import React, {createContext, useState, type ReactNode, type JSX, useCallback, useEffect} from 'react';

import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/custom/client';
import { logger } from '@/lib/default-logger';

import type { UserContextValue } from '../types';

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [state, setState] = useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();
      // TO-DO: This force to relogin if token is expired, then fix with a better solution

      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        return;
      }

      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
