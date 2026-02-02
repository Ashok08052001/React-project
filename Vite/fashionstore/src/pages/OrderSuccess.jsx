import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    const location = useLocation();
    const { email, phoneNumber } = location.state || {};

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
                    <p className="text-gray-500 mb-6">
                        Thank you for your purchase. We have sent a confirmation to:
                    </p>
                    <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
                        {email && (
                            <div className="mb-2">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</span>
                                <p className="text-sm font-medium text-gray-900">{email}</p>
                            </div>
                        )}
                        {phoneNumber && (
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</span>
                                <p className="text-sm font-medium text-gray-900">{phoneNumber}</p>
                            </div>
                        )}
                    </div>
                    <Link
                        to="/"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
