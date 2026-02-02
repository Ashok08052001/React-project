import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        title: "Summer Collection 2026",
        subtitle: "Discover the latest trends in fashion. Meticulously crafted for style and comfort.",
        cta: "Shop Collection",
        link: "/shop",
        align: "left"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop",
        title: "New Arrivals",
        subtitle: "Elevate your wardrobe with our newest pieces. Premium quality for the modern individual.",
        cta: "View New In",
        link: "/shop?category=new",
        align: "center"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
        title: "Exclusive Deals",
        subtitle: "Limited time offers on selected items. Don't miss out on these seasonal favorites.",
        cta: "Shop Sale",
        link: "/shop?category=sale",
        align: "right"
    }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [current]);

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 flex ${slide.align === 'left' ? 'justify-start' :
                                slide.align === 'right' ? 'justify-end' : 'justify-center'
                            }`}>
                            <div className={`max-w-xl text-white ${slide.align === 'center' ? 'text-center' : 'text-left'
                                }`}>
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-in-up delay-100">
                                    {slide.subtitle}
                                </p>
                                <Link
                                    to={slide.link}
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-all animate-fade-in-up delay-200"
                                >
                                    {slide.cta} <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-8 w-8" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                onClick={nextSlide}
            >
                <ChevronRight className="h-8 w-8" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
