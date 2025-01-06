import * as React from 'react';
import { Outlet, Navigate, useLocation, useParams } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useSession } from '../SessionContext';
import { ActivePage, useActivePage } from "@toolpad/core";
import { Breadcrumb } from '@toolpad/core/PageContainer';

export default function Layout() {
  const { session } = useSession();
  const location = useLocation();
  const { productId } = useParams(); // Extract the 'id' parameter from the URL


  if (!session) {
    // Add the `callbackUrl` search parameter
    const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={redirectTo} replace />;
  }

  //create custom bread crumbs productId is present
  const activePage = useActivePage();
  const title = createDynamicProductIdTitle(productId)
  const breadcrumbs = createDynamicProductIdBreadCrumbs(productId, activePage);

  return (
    <DashboardLayout>
      <PageContainer title={title} breadcrumbs={breadcrumbs}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}

const createDynamicProductIdTitle = (
    productId: string | undefined
): string | undefined => {
  return productId ? `Product ${productId}` : undefined
}

const createDynamicProductIdBreadCrumbs = (
    productId: String | undefined,
    activePage: ActivePage | null
): Breadcrumb[] | undefined => {
  if (productId && activePage) {
    const title = `Product ${productId}`;
    const path = `${activePage.path}/${productId}`;
    return [...activePage.breadcrumbs, { title, path }];
  }
  return undefined
}
