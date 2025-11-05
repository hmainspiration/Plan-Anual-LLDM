
import React from 'react';

interface HeaderProps {
    churchName: string;
    onChurchNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ churchName, onChurchNameChange }) => {
    return (
        <header className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Plan de Trabajo Anual 2025-2026</h1>
            <p className="text-gray-600 mt-1">Ingresa los datos del plan de trabajo de una forma más intuitiva.</p>
            <div className="mt-4">
                <label htmlFor="churchName" className="block text-sm font-medium text-gray-700">Nombre de la Iglesia:</label>
                <input
                    type="text"
                    id="churchName"
                    value={churchName}
                    onChange={onChurchNameChange}
                    className="mt-1 block w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
        </header>
    );
};

export default Header;
