import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ErrorPage from "../pages/error-page";
import DashboardView from "../pages/dashboard/dashboardView";
import LoginView from "../pages/auth/Login";
import ProfileView from "../pages/myProfile/Index";
import AuthLayout from "../layouts/AuthLayout";
import { useToken } from "../hooks/token";
import ListAdminView from "../pages/admins/listAdminView";
import CreateAdminView from "../pages/admins/createAdminView";
import EditAdminView from "../pages/admins/editAdminView";
import EditProfileView from "../pages/myProfile/EditProfileView";
import ListDeviceView from "../pages/device/ListDeviceView";
import CreateDeiceView from "../pages/device/CreateDeviceView";
import EditDeviceView from "../pages/device/EditDeviceView";
import DetailDeviceView from "../pages/device/DetailDeviceView";
import ListLogsView from "../pages/logs/ListLogsView";
import PerformanceView from "../pages/performances/PerformanceView";
import LocationView from "../pages/location/LocationView";

const getProtectedRouters = (role: string) => {
  const mainRouters: { path: string; element: JSX.Element }[] = [];

  const adminRouter = [
    ...[
      {
        path: "/",
        element: <DashboardView />,
      },

      //my profile routers
      {
        path: "/my-profile",
        element: <ProfileView />,
      },
      {
        path: "/my-profile/edit/:userId",
        element: <EditProfileView />,
      },
    ],
  ];

  const superAdminRouter = [
    {
      path: "/",
      element: <DashboardView />,
    },
    //my profile routers
    {
      path: "/my-profile",
      element: <ProfileView />,
    },
    {
      path: "/my-profile/edit/:userId",
      element: <EditProfileView />,
    },

    // module router
    {
      path: "/performances",
      element: <PerformanceView />,
    },

    // module router
    {
      path: "/locations",
      element: <LocationView />,
    },
    // module router
    {
      path: "/devices",
      element: <ListDeviceView />,
    },
    {
      path: "/devices/create",
      element: <CreateDeiceView />,
    },
    {
      path: "/devices/edit/:deviceId",
      element: <EditDeviceView />,
    },
    {
      path: "/devices/detail/:deviceId",
      element: <DetailDeviceView />,
    },

    // logs router
    {
      path: "/logs",
      element: <ListLogsView />,
    },

    // admin router
    {
      path: "/admins",
      element: <ListAdminView />,
    },
    {
      path: "/admins/create",
      element: <CreateAdminView />,
    },
    {
      path: "/admins/edit/:adminId",
      element: <EditAdminView />,
    },
  ];

  switch (role) {
    case "ADMIN":
      mainRouters.push(...adminRouter);
      break;
    case "SUPERADMIN":
      mainRouters.push(...superAdminRouter);
      break;
    default:
      break;
  }

  return mainRouters;
};

const authRouters: { path: string; element: JSX.Element }[] = [
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
];

export default function AppRouters() {
  const { getDecodeUserToken } = useToken();
  const user = getDecodeUserToken();

  const routers: { path: string; element: JSX.Element }[] = [];

  if (user) {
    const protectedRouters = getProtectedRouters(
      user.userRole?.toLocaleUpperCase()
    );
    routers.push(...protectedRouters);
  } else {
    routers.push(...authRouters);
  }

  const appRouters = createBrowserRouter([
    {
      path: "/",
      element: user ? <AppLayout /> : <AuthLayout />,
      errorElement: <ErrorPage />,
      children: routers,
    },
  ]);

  return <RouterProvider router={appRouters} />;
}
