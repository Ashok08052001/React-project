import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Truck, CheckCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Please log in to view your profile.</p>
            </div>
        );
    }

    // Mock Order Data (Historical)
    const mockOrders = [
        {
            id: 'ORD-7782-XJ',
            date: 'Oct 24, 2023',
            total: 124.90,
            status: 'Delivered',
            items: ['Classic White T-Shirt', 'Slim Fit Jeans']
        },
        {
            id: 'ORD-9921-MC',
            date: 'Sep 12, 2023',
            total: 45.00,
            status: 'Processing',
            items: ['Leather Belt']
        },
        {
            id: 'ORD-1102-AB',
            date: 'Aug 05, 2023',
            total: 89.99,
            status: 'Delivered',
            items: ['Summer Dress']
        }
    ];

    // Get orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    // Combine saved orders with mock orders
    const orders = [...savedOrders, ...mockOrders];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'text-green-600 bg-green-100';
            case 'Processing': return 'text-blue-600 bg-blue-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-black px-6 py-8 md:flex md:items-center md:justify-between">
                        <div className="flex items-center">
                            <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-white uppercase">
                                {user.name ? user.name.charAt(0) : 'U'}
                            </div>
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold text-white">{user.name || 'User Name'}</h1>
                                <p className="text-gray-400">{user.email || 'user@example.com'}</p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="px-6 py-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">Order History</h2>
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-wrap items-center justify-between mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Order ID</p>
                                            <p className="font-medium text-gray-900">{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Date</p>
                                            <p className="font-medium text-gray-900">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status === 'Delivered' && <CheckCircle className="mr-1 h-3 w-3" />}
                                                {order.status === 'Processing' && <Truck className="mr-1 h-3 w-3" />}
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Items:</span> {order.items.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
