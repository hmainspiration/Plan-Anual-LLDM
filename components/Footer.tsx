
import React from 'react';
import ExcelIcon from './icons/ExcelIcon';
import SpinnerIcon from './icons/SpinnerIcon';

interface FooterProps {
    isGenerating: boolean;
    onGenerateExcel: () => void;
}

const Footer: React.FC<FooterProps> = ({ isGenerating, onGenerateExcel }) => {
    return (
        <footer className="p-6 bg-slate-50 rounded-b-lg flex justify-end">
            <button
                onClick={onGenerateExcel}
                disabled={isGenerating}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center disabled:cursor-not-allowed"
            >
                {isGenerating ? (
                    <>
                        <SpinnerIcon />
                        Generando...
                    </>
                ) : (
                    <>
                        <ExcelIcon />
                        Generar Archivo Excel
                    </>
                )}
            </button>
        </footer>
    );
};

export default Footer;
