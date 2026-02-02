import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    // Initial data from Shop.jsx
    const initialProducts = [
        // Women
        { id: 4, name: 'Summer Dress', price: 49, color: 'Red', category: 'Women', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1946&auto=format&fit=crop' },
        { id: 14, name: 'Floral Blouse', price: 39, color: 'Pink', category: 'Women', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1887&auto=format&fit=crop' },
        { id: 15, name: 'Maxi Skirt', price: 55, color: 'Black', category: 'Women', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1964&auto=format&fit=crop' },
        { id: 16, name: 'Denim Shorts', price: 35, color: 'Blue', category: 'Women', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop' },
        { id: 17, name: 'Evening Gown', price: 129, color: 'Emerald', category: 'Women', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1948&auto=format&fit=crop' },
        { id: 18, name: 'Cropped Top', price: 25, color: 'White', category: 'Women', image: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?q=80&w=1887&auto=format&fit=crop' },
        { id: 19, name: 'Cardigan', price: 45, color: 'Beige', category: 'Women', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop' },
        { id: 20, name: 'Jumpsuit', price: 65, color: 'Navy', category: 'Women', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop' },

        // Men
        { id: 2, name: 'Slim Fit Jeans', price: 59, color: 'Blue', category: 'Men', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop' },
        { id: 4, name: 'Leather Jacket', price: 199, color: 'Black', category: 'Men', image: 'https://images.unsplash.com/photo-1551028919-ac7bcb7d01cd?q=80&w=2070&auto=format&fit=crop' },
        { id: 5, name: 'Classic White T-Shirt', price: 29, color: 'White', category: 'Men', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop' },
        { id: 9, name: 'Casual Chinos', price: 45, color: 'Beige', category: 'Men', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1897&auto=format&fit=crop' },
        { id: 10, name: 'Denim Jacket', price: 89, color: 'Blue', category: 'Men', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1887&auto=format&fit=crop' },
        { id: 11, name: 'Oxford Shirt', price: 55, color: 'Light Blue', category: 'Men', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop' },
        { id: 12, name: 'Bomber Jacket', price: 79, color: 'Green', category: 'Men', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop' },
        { id: 13, name: 'Polo Shirt', price: 35, color: 'Navy', category: 'Men', image: 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=2070&auto=format&fit=crop' },

        // Accessories
        { id: 101, name: 'Classic Watch', price: 129, color: 'Silver', category: 'Accessories', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop' },
        { id: 102, name: 'Leather Belt', price: 45, color: 'Brown', category: 'Accessories', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=2070&auto=format&fit=crop' },
        { id: 103, name: 'Sunglasses', price: 89, color: 'Black', category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop' },
        { id: 104, name: 'Backpack', price: 79, color: 'Grey', category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop' }
    ];

    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (newProduct) => {
        setProducts(prev => {
            // Generate a simple numeric ID if not provided, ensuring uniqueness
            const nextId = prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1;
            return [...prev, { ...newProduct, id: nextId }];
        });
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
