import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MenuxProvider } from './context/MenuxContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import UsersLayout from './layouts/UsersLayout';
import UsersPage from './pages/users/UsersPage';
import RolesPage from './pages/users/RolesPage';
import IntelligenceLayout from './layouts/IntelligenceLayout';
import IntelligenceOverview from './pages/intelligence/IntelligenceOverview';
import IntelligenceRecommendations from './pages/intelligence/IntelligenceRecommendations';
import IntelligenceImpact from './pages/intelligence/IntelligenceImpact';
import IntelligenceProducts from './pages/intelligence/IntelligenceProducts';
import IntelligenceAlerts from './pages/intelligence/IntelligenceAlerts';
import IntelligenceSettings from './pages/intelligence/IntelligenceSettings';
import RestaurantList from './pages/restaurants/RestaurantList';
import RestaurantForm from './pages/restaurants/RestaurantForm';
import UpsellPage from './pages/menu/UpsellPage';
import ReportsPage from './pages/reports/ReportsPage';
import CustomersLayout from './layouts/CustomersLayout';
import CustomersAnalytics from './pages/Customers/CustomersAnalytics';
import CustomersList from './pages/Customers/CustomersList';

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-sm">Carregando...</p>
                </div>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" />;
}

export default function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <MenuxProvider>
                    <BrowserRouter>
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: '#121212',
                                    color: '#fff',
                                    borderRadius: '12px',
                                },
                            }}
                        />
                        <Routes>
                            <Route path="/login" element={<Login />} />

                            <Route path="/" element={
                                <PrivateRoute>
                                    <Layout />
                                </PrivateRoute>
                            }>
                                <Route index element={<Navigate to="/dashboard" replace />} />
                                <Route path="dashboard" element={<Dashboard />} />

                                {/* Users Module Routes */}
                                <Route path="users" element={<UsersLayout />}>
                                    <Route index element={<Navigate to="list" replace />} />
                                    <Route path="list" element={<UsersPage />} />
                                    <Route path="roles" element={<RolesPage />} />
                                </Route>

                                {/* Maestro Module */}
                                <Route path="intelligence" element={<IntelligenceLayout />}>
                                    <Route index element={<Navigate to="impact" replace />} />
                                    <Route path="overview" element={<IntelligenceOverview />} />
                                    <Route path="recommendations" element={<IntelligenceRecommendations />} />
                                    <Route path="impact" element={<IntelligenceImpact />} />
                                    <Route path="products" element={<IntelligenceProducts />} />
                                    <Route path="alerts" element={<IntelligenceAlerts />} />

                                </Route>

                                {/* Customers Module */}
                                <Route path="customers" element={<CustomersLayout />}>
                                    <Route index element={<Navigate to="list" replace />} />
                                    <Route path="analytics" element={<CustomersAnalytics />} />
                                    <Route path="list" element={<CustomersList />} />
                                </Route>

                                {/* Legacy redirect */}
                                <Route path="ai/recommendations" element={<Navigate to="/intelligence/recommendations" replace />} />

                                {/* Restaurant Module Routes */}
                                <Route path="restaurants">
                                    <Route index element={<RestaurantList />} />
                                    <Route path="new" element={<RestaurantForm />} />
                                    <Route path=":id" element={<RestaurantForm />} />
                                </Route>

                                <Route path="menu/*" element={<Menu />} />
                                <Route path="menu/upsell" element={<UpsellPage />} />
                                <Route path="reports" element={<ReportsPage />} />
                                <Route path="orders" element={<Orders />} />
                                <Route path="analytics" element={<Analytics />} />
                                <Route path="settings" element={<Settings />} />
                            </Route>

                            {/* Catch-all redirect */}
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </BrowserRouter>
                </MenuxProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}
