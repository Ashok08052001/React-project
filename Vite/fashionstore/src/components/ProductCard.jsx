import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const liked = isFavorite(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({ ...product, quantity: 1 });
    };

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
    };

    return (
        <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 lg:aspect-none lg:h-80 relative">
                    {/* Placeholder Image Logic */}
                    <div className="h-full w-full object-cover object-center lg:h-full lg:w-full bg-gray-100 flex items-center justify-center text-gray-400">
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                            <span>No Image</span>
                        )}
                    </div>

                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-50 focus:outline-none"
                    >
                        <Heart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </button>

                    {/* Quick Add Button */}
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-900 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white focus:outline-none z-10"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
                <div className="mt-4 px-4 pb-4">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        <div className="flex space-x-1">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;