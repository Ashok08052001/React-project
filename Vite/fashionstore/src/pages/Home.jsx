import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
    return (
        <div className="bg-white">
            <HeroSlider />

            {/* Featured Categories Preview */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Men', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2148&auto=format&fit=crop' },
                            { name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Accessories', image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2070&auto=format&fit=crop' }
                        ].map((cat) => (
                            <div key={cat.name} className="group relative h-64 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                                <Link to={`/${cat.name.toLowerCase()}`}>
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                                    <div className="absolute bottom-6 left-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                                        <span className="text-white/90 text-sm font-medium flex items-center">
                                            Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
