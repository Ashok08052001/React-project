import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/Tdriven.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { favorites } = useFavorites();
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Men', path: '/men' },
        { name: 'Women', path: '/women' },
        { name: 'Accessories', path: '/accessories' },
        { name: 'Design Your Own', path: '/custom-design' },
    ];

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-bold tracking-tighter text-black">

                            <img src={logo} alt="logo" className="h-25 w-25" />
                            {/* FASHION<span className="text-indigo-600">.</span>STORE */}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Search Bar */}
                        <div className="relative">
                            {showSearch ? (
                                <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border rounded-full px-3 py-1 shadow-md w-60">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="outline-none text-sm w-full"
                                        autoFocus
                                    />
                                    <button type="button" onClick={() => setShowSearch(false)}>
                                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    </button>
                                </form>
                            ) : (
                                <button onClick={() => setShowSearch(true)} className="text-gray-500 hover:text-black transition-colors">
                                    <Search className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                        <Link to="/favorites" className="relative text-gray-500 hover:text-black transition-colors">
                            <Heart className="h-5 w-5" />
                            {favorites.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] font-bold flex items-center justify-center rounded-full bg-red-500 text-white">
                                    {favorites.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/cart" className="relative text-gray-500 hover:text-black transition-colors">
                            <ShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] font-bold flex items-center justify-center rounded-full bg-indigo-600 text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Icon */}
                        {user ? (
                            <Link to="/profile" className="text-gray-500 hover:text-black transition-colors flex items-center space-x-1">
                                <span className="text-xs font-medium hidden lg:block">{user.name || 'Account'}</span>
                                <User className="h-5 w-5" />
                            </Link>
                        ) : (
                            <Link to="/login" className="text-gray-500 hover:text-black transition-colors">
                                <User className="h-5 w-5" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-500 hover:text-black p-2 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                        ? 'bg-gray-50 text-black'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className="pt-4 flex items-center space-x-4 px-3">
                            <Link to="/favorites" className="flex items-center space-x-2 text-gray-600 font-medium" onClick={() => setIsOpen(false)}>
                                <Heart className="h-5 w-5" />
                                <span>Favorites ({favorites.length})</span>
                            </Link>
                            <Link to="/cart" className="flex items-center space-x-2 text-gray-600 font-medium" onClick={() => setIsOpen(false)}>
                                <ShoppingBag className="h-5 w-5" />
                                <span>Cart ({cartCount})</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
