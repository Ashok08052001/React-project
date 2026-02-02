import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import Mfashion from '../assets/images/Mfashion.png';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="bg-black text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <img src={Mfashion} alt="FASHION.STORE" className="h-12 mb-4" />
                        <p className="text-gray-400 max-w-sm">
                            Premium fashion for the modern individual. Quality, style, and sustainability in every stitch.
                        </p>
                    </div>

                    {/* Newsletter Section */}
                    <div className="col-span-1 md:col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        {subscribed ? (
                            <p className="text-green-500 text-sm font-medium">Thank you for subscribing!</p>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-800 rounded py-2 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-white"
                                        required
                                    />
                                    <button type="submit" className="absolute right-1 top-1 p-1 text-gray-400 hover:text-white">
                                        <Mail className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Men</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Women</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Help</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Customer Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Fashion Store. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Twitter className="h-5 w-5" />
                        </a>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Payment Methods" className="h-8" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
