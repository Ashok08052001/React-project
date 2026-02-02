import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const { products } = useProducts();

    const [selectedCategory, setSelectedCategory] = useState('All');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const categories = ['All', 'Men', 'Women', 'Accessories'];

    const filteredProducts = useMemo(() => {
        let items = products;

        if (selectedCategory !== 'All') {
            items = items.filter(p => p.category === selectedCategory);
        }

        if (searchQuery) {
            items = items.filter(p =>
                p.name.toLowerCase().includes(searchQuery) ||
                p.color.toLowerCase().includes(searchQuery)
            );
        }

        return items;
    }, [searchQuery, selectedCategory]);

    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Shop All'}
                </h1>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found for "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
