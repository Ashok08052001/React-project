import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create new order object
        const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 10000)}-${Date.now().toString().slice(-4)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            total: cartTotal,
            status: 'Processing',
            items: cartItems.map(item => item.name) // Storing item names
        };

        // Save to LocalStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

        // Simulate order placement
        setTimeout(() => {
            clearCart();
            navigate('/order-success', {
                state: {
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    orderId: newOrder.id
                }
            });
        }, 1000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <button
                            onClick={() => navigate('/shop')}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">

                    {/* Checkout Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                                        <input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                                        <input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input type="tel" name="phoneNumber" id="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street address</label>
                                        <input type="text" name="address" id="address" required value={formData.address} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" name="city" id="city" required value={formData.city} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip / Postal code</label>
                                        <input type="text" name="zip" id="zip" required value={formData.zip} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Details</h2>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6">
                                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on card</label>
                                        <input type="text" name="cardName" id="cardName" required value={formData.cardName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card number</label>
                                        <input type="text" name="cardNumber" id="cardNumber" placeholder="0000 0000 0000 0000" required value={formData.cardNumber} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-3">
                                        <label htmlFor="expDate" className="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
                                        <input type="text" name="expDate" id="expDate" placeholder="MM/YY" required value={formData.expDate} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                    <div className="col-span-3">
                                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVC</label>
                                        <input type="text" name="cvv" id="cvv" required value={formData.cvv} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Place Order (${cartTotal.toFixed(2)})
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
                                <ul className="mt-4 divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="py-4 flex">
                                            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md border border-gray-200 overflow-hidden">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                                )}
                                            </div>
                                            <div className="ml-4 flex-1 flex flex-col">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>{item.name}</h3>
                                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.color} x {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 border-t border-gray-200 pt-4 flex items-center justify-between">
                                    <p className="text-base font-medium text-gray-900">Total</p>
                                    <p className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
