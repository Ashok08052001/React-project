import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    // Mock product data - in a real app this would fetch based on ID
    const product = {
        id: id,
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'This classic white t-shirt is a staple for any wardrobe. Made from 100% organic cotton, it offers breathable comfort and a timeless fit. Perfect for layering or wearing on its own.',
        colors: ['White', 'Black', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8,
        reviews: 124,
        image: null // Added image placeholder property compatibility
    };

    const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = React.useState(product.sizes[0]);

    const liked = isFavorite(product.id);

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center min-h-[400px]">
                        <span className="text-gray-400 text-lg">Product Image Placeholder</span>
                    </div>

                    {/* Details Section */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <div className="flex items-center mb-6">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
                        </div>

                        <p className="text-2xl font-medium text-gray-900 mb-6">${product.price}</p>

                        <p className="text-gray-500 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                            <div className="flex space-x-2">
                                {product.colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium ${selectedColor === color ? 'border-black bg-white text-black ring-1 ring-black' : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'}`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                            <div className="flex space-x-2">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-10 h-10 border rounded-md flex items-center justify-center text-sm font-medium transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-900 hover:border-black'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => addToCart({ ...product, color: selectedColor, size: selectedSize })}
                                className="flex-1 bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                                <ShoppingBag className="mr-2 h-5 w-5" />
                                Add to Cart
                            </button>
                            <button
                                onClick={() => toggleFavorite(product)}
                                className={`px-4 py-3 border rounded-md transition-colors ${liked ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 hover:bg-gray-50'}`}
                            >
                                <span className="sr-only">Like</span>
                                <Star className={`h-5 w-5 ${liked ? 'fill-current' : 'text-gray-400'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
