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
            }


        ]
    }
])