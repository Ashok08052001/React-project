import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="bg-white min-h-screen py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>
                    <p className="text-lg text-gray-500 mb-8">Your cart is currently empty.</p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">

                    {/* Cart Items */}
                    <section className="lg:col-span-7">
                        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex py-6">
                                    <div className="flex-shrink-0">
                                        <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <Link to={`/product/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <div className="mt-1 flex text-sm">
                                                    <p className="text-gray-500">{item.color}</p>
                                                    {item.size && (
                                                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{item.size}</p>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 rounded-md hover:bg-gray-100"
                                                    >
                                                        <Minus className="h-4 w-4 text-gray-500" />
                                                    </button>
                                                    <span className="mx-2 text-gray-700">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 rounded-md hover:bg-gray-100"
                                                    >
                                                        <Plus className="h-4 w-4 text-gray-500" />
                                                    </button>
                                                </div>

                                                <div className="absolute top-0 right-0">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        type="button"
                                                        className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order Summary */}
                    <section className="lg:col-span-5 mt-16 lg:mt-0 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Link
                                to="/checkout"
                                className="w-full bg-black border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-black flex justify-center items-center"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Cart;
