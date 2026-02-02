import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
    const { favorites } = useFavorites();
    const { addToCart } = useCart();

    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist</h1>

                {favorites.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-500 mb-8">You haven't added any favorites yet.</p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
                        >
                            Go Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {favorites.map((product) => (
                            <div key={product.id} className="flex flex-col space-y-3">
                                <ProductCard product={product} />
                                <button
                                    onClick={() => {
                                        addToCart({ ...product, quantity: 1 });
                                        // Optional: Removing from favorites after moving
                                        // removeFromFavorites(product.id); 
                                    }}
                                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center font-medium text-sm"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
