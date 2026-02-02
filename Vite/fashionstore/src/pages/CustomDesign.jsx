import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomDesign = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productType: 'Dress',
        customColor: '',
        chest: '',
        waist: '',
        length: '',
        notes: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend
        // console.log('Custom Design Request:', formData);
        setSubmitted(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h2>
                    <p className="text-gray-600 mb-4">We've received your custom design request. Our team will contact you shortly to confirm details.</p>
                    <p className="text-sm text-gray-500">Redirecting to Home...</p>
                </div>
            </div>
        );
    }

    const getPreviewPath = () => {
        switch (formData.productType) {
            case 'Dress':
                return "M12 2C9 2 7 5 7 7c0 1.5 1 2.5 2 3l-2 10h10l-2-10c1-.5 2-1.5 2-3 0-2-2-5-5-5zm0 14c-1.5 0-3 1.5-3 4h6c0-2.5-1.5-4-3-4z M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"; // Simplified Dress shape
            case 'Shirt':
                return "M12 3a4 4 0 0 0-4 4v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7a4 4 0 0 0-4-4zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"; // Shirt
            default:
                return "M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6zm2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm6 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"; // Generic
        }
    };

    const getPreviewColor = () => {
        if (!formData.customColor) return '#e5e7eb'; // Gray-200
        // Simple validation check, otherwise fallback
        return formData.customColor;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-black px-6 py-4 rounded-t-lg">
                    <h1 className="text-2xl font-bold text-white">Design Your Own</h1>
                    <p className="text-gray-300 text-sm mt-1">Create a unique piece tailored just for you.</p>
                </div>

                <div className="bg-white rounded-b-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    {/* Visual Preview Section */}
                    <div className="bg-gray-100 p-8 flex flex-col items-center justify-center border-r border-gray-200">
                        <h3 className="text-lg font-medium text-gray-500 mb-6">Live Preview</h3>
                        <div className="w-64 h-64 relative bg-white rounded-xl shadow-inner flex items-center justify-center p-4">
                            {/* Garment Preview */}
                            <svg
                                viewBox="0 0 24 24"
                                className="w-full h-full drop-shadow-lg transition-colors duration-300"
                                style={{ fill: getPreviewColor() }}
                            >
                                {/* Simple Dress/Shirt Path based on selection */}
                                {formData.productType === 'Dress' ? (
                                    <path d="M12 2c-1.657 0-3 1.343-3 3v2h-2v2l2 12h8l2-12v-2h-2v-2c0-1.657-1.343-3-3-3h-2z" />
                                ) : (
                                    <path d="M16 2h-8C6.343 2 5 3.343 5 5v14c0 1.657 1.343 3 3 3h8c1.657 0 3-1.343 3-3V5c0-1.657-1.343-3-3-3zM8 4h8v2H8V4z" />
                                )}
                            </svg>
                        </div>
                        <p className="mt-6 text-sm text-gray-400 font-mono">
                            {formData.productType} • {formData.customColor || 'No Color Selected'}
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Product Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                            <select
                                name="productType"
                                value={formData.productType}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black p-2 border"
                            >
                                <option value="Dress">Dress</option>
                                <option value="Shirt">Shirt</option>
                                <option value="Pants">Pants</option>
                                <option value="Jacket">Jacket</option>
                            </select>
                        </div>

                        {/* Custom Color */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Custom Color (Hex Code or Name)</label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    name="customColor"
                                    value={formData.customColor}
                                    onChange={handleChange}
                                    placeholder="e.g. #FF5733 or Midnight Blue"
                                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black p-2 border"
                                    required
                                />
                                <input
                                    type="color"
                                    value={formData.customColor.startsWith('#') ? formData.customColor : '#000000'}
                                    onChange={(e) => setFormData(prev => ({ ...prev, customColor: e.target.value }))}
                                    className="h-10 w-10 p-1 rounded border border-gray-300 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Measurements */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3 border-b pb-1">Measurements (in inches)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chest/Bust</label>
                                    <input
                                        type="number"
                                        name="chest"
                                        value={formData.chest}
                                        onChange={handleChange}
                                        placeholder="e.g. 36"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black p-2 border"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Waist</label>
                                    <input
                                        type="number"
                                        name="waist"
                                        value={formData.waist}
                                        onChange={handleChange}
                                        placeholder="e.g. 30"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black p-2 border"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                                    <input
                                        type="number"
                                        name="length"
                                        value={formData.length}
                                        onChange={handleChange}
                                        placeholder="e.g. 40"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black p-2 border"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Describe any specific details, fabric preferences, or style inspirations..."
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black p-2 border"
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Submit Design Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomDesign;
