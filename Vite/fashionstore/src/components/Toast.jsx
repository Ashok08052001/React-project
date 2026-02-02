import React, { useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-md shadow-lg flex items-center space-x-3 z-50 animate-fade-in-up">
            <ShoppingBag className="h-5 w-5 text-white" />
            <span className="font-medium">{message}</span>
        </div>
    );
};

export default Toast;
