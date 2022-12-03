import { useRouter } from 'next/router';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { setCookie } from 'cookies-next';
import { useLocalStorage } from './hooks';
import viewsConfig from 'viewsConfig';
import api from 'services';

export const AuthContext = React.createContext();
const isServer = typeof window === 'undefined';

export default function AuthProvider(props) {
  const { children } = props;
  const [data, setData] = useLocalStorage('login.data', null);
  const router = useRouter();

  useEffect(() => {
    const handler = (url) => {
      if (!data && url !== '/login') {
        router.push('/login');
      }

      if (data) {
        const view = viewsConfig.find((viewConfig) => viewConfig.route === url);

        if (
          view?.authorization.enabled &&
          !view?.authorization.roles.includes(data.role.name)
        ) {
          router.push('/');
        }
      }
    };

    router.events.on('routeChangeComplete', handler);

    return () => {
      router.events.off('routeChangeComplete', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!data) {
      router.push('/login');
    } else {
      api.defaults.headers.authorization = `Bearer ${data?.token}`;
    }

    if (router.pathname === '/login') {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.token]);

  const setLoginData = useCallback(
    (payload) => {
      setData(payload);
      setCookie('auth.token', payload.token, {
        maxAge: 60 * 24 * 3,
      });

      router.push('/');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setData]
  );

  const memoizedValue = useMemo(
    () => ({
      data,
      setLoginData,
    }),
    [data, setLoginData]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
