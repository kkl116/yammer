import * as React from 'react';
import { Outlet, Navigate, useLocation, useParams } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useSession } from '../SessionContext';
import { useActivePage } from "@toolpad/core";
import { useFetchProductName } from "./dashboard.hooks";

export default function Layout() {
  const { session } = useSession();
  const location = useLocation();
  const { productId } = useParams();
  const activePage = useActivePage();
  
  if (!session) {
    // Add the `callbackUrl` search parameter
    const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={redirectTo} replace />;
  }

  //create custom bread crumbs productId is present
  const productName = useFetchProductName(productId);

  const breadcrumbs = activePage && productName
      ? [...activePage.breadcrumbs, { title: productName, path: `${activePage.path}/${productName}`}]
      : undefined;

  return (
    <DashboardLayout>
      <PageContainer title={productName} breadcrumbs={breadcrumbs}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
