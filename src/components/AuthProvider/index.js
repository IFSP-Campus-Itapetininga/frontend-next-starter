import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';
import { useLocalStorage } from './hooks';
import viewsConfig from 'viewsConfig';

export const AuthContext = React.createContext({
  data: null,
  setLoginData: () => {},
  logout: () => {},
});
const isServer = typeof window === 'undefined';

export default function AuthProvider(props) {
  const { children } = props;
  const [data, setData, removeValue] = useLocalStorage('login.data', null);
  const router = useRouter();

  useEffect(() => {
    const handler = (url) => {
      if (!data && url !== '/login') {
        router.push('/login');
      }

      const regex = new RegExp(/\/.*(?=\/)/);
      const regexData = regex.exec(url);

      url = regexData?.length ? regexData[0] : url;

      if (data) {
        const view = viewsConfig.find((viewConfig) => viewConfig.route === url);

        if (
          view.authorization.enabled &&
          !view.authorization.roles.includes(data.role.name)
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
    }

    if (router.pathname === '/login') {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const logout = useCallback(
    () => {
      setData('');
      removeValue();
      deleteCookie('auth.token');

      router.push('/');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setData]
  );

  const memoizedValue = useMemo(
    () => ({
      data,
      setLoginData,
      logout,
    }),
    [data, setLoginData, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
