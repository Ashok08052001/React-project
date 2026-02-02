import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Men = () => {
    const { products } = useProducts();
    const menProducts = products.filter(p => p.category === 'Men');

    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Men's Collection</h1>
                        <p className="mt-2 text-gray-500">Essentials for the modern man.</p>
                    </div>

                    {/* Filter/Sort Placeholders could go here */}
                    <div className="mt-4 md:mt-0">
                        <span className="text-sm text-gray-500">Showing {menProducts.length} items</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {menProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Men;
