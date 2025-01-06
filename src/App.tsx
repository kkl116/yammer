import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import { AppProvider } from '@toolpad/core/react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import type { Navigation, Session } from '@toolpad/core';
import { SessionContext } from './SessionContext';

const NAVIGATION: Navigation = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <InventoryIcon />,
    pattern: 'products/:productId'
  },
];

const BRANDING = {
  title: `Gubu Accounting App`,
};

export default function App() {

  const DUMMY_SESSION: Session = {
    user: {
      name: 'Gubu Admin',
      email: 'some email',
    }
  };


  const [session, setSession] = React.useState<Session | null>(DUMMY_SESSION);
  const navigate = useNavigate();

  const signIn = React.useCallback(() => {
    navigate('/sign-in');
  }, [navigate]);

  const signOut = React.useCallback(() => {
    setSession(null);
    navigate('/sign-in');
  }, [navigate]);

  const sessionContextValue = React.useMemo(
      () => ({ session, setSession }), [session, setSession]
  );

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <AppProvider
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={{ signIn, signOut }}
      >
        <Outlet />
      </AppProvider>
    </SessionContext.Provider>
  );
}
