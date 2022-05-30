import { Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import { NotFoundPage } from './pages/404';
import { Customers } from './pages/Customers';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
// import PrivateRoute from './components/common/PrivateRoute';
// import DashboardLayout from './components/DashboardLayout';
// import MainLayout from './components/MainLayout';
// import Account from './pages/Account';
// import CustomerList from './pages/CustomerList';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import NotFound from './pages/NotFound';
// import ProductList from './pages/ProductList';
// import Register from './pages/Register';
// import Settings from './pages/Settings';

const routes = [
  { path: '/', element: <Login /> },
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/app",
        element: <Dashboard />,
      },
      {
        path: "/app/customers",
        element: <Customers />,
      },
      // { path: "tasks", element: <DashboardTasks /> },
    ],
  },
  { path: '/404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to="/404" /> },
];

export default routes;
