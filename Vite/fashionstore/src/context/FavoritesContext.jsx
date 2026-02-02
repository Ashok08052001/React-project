import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('favorites');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (product) => {
        setFavorites((prev) => {
            if (!prev.find(item => item.id === product.id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromFavorites = (productId) => {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
    };

    const toggleFavorite = (product) => {
        if (favorites.find(item => item.id === product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
