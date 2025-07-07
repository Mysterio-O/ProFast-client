import { createBrowserRouter } from "react-router";
import RootLayout from '../layouts/RootLayout';
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import ForgetPassword from "../pages/Authentication/ForgetPassword/ForgetPassword";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRIder from "../pages/Dashboard/AssignRider/AssignRIder";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from '../pages/Dashboard/MyEarnings/MyEarnings';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('/serviceCenter.json')
            },
            {
                path: '/sendParcel',
                element: <PrivateRoute>
                    <SendParcel />
                </PrivateRoute>,
                loader: () => fetch('/warehouses.json')
            },
            {
                path: 'beARider',
                element: <PrivateRoute>
                    <BeARider />
                </PrivateRoute>,
                loader: () => fetch('/serviceCenter.json')
            },
            {
                path: '/forbidden',
                Component: Forbidden
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'forget-password',
                Component: ForgetPassword
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'pending-riders',
                element: <AdminRoute>
                    <PendingRiders />
                </AdminRoute>
            },

            // rider routes
            {
                path: 'pending-deliveries',
                element: <RiderRoute>
                    <PendingDeliveries />
                </RiderRoute>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoute>
                    <CompletedDeliveries />
                </RiderRoute>
            },
            {
                path: 'my-earnings',
                element: <RiderRoute>
                    <MyEarnings></MyEarnings>
                </RiderRoute>
            },

            // admin routes
            {
                path: 'active-riders',
                element: <AdminRoute>
                    <ActiveRiders />
                </AdminRoute>
            },
            {
                path: 'makeAdmin',
                element: <AdminRoute>
                    <MakeAdmin />
                </AdminRoute>
            },
            {
                path: 'assign-rider',
                element: <AdminRoute>
                    <AssignRIder />
                </AdminRoute>
            }
        ]
    }
])