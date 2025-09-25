
import React from 'react';
import type { ActividadValores } from '../types';

interface ActivityRowProps {
    areaId: string;
    actividad: string;
    actividadId: string;
    actividadIndex: number;
    valores: ActividadValores;
    meses: string[];
    onValueChange: (areaId: string, actividadId: string, monthIndex: number | null, value: string | number) => void;
}

const ActivityRow: React.FC<ActivityRowProps> = ({
    areaId,
    actividad,
    actividadId,
    actividadIndex,
    valores,
    meses,
    onValueChange,
}) => {
    const totalAnual = valores.meses.reduce((sum, current) => sum + current, 0);

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4 transition-shadow hover:shadow-md">
            <h3 className="font-semibold text-gray-800">{actividadIndex + 1}. {actividad}</h3>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-3">
                {meses.map((mes, mesIndex) => (
                    <div key={mesIndex} className="relative flex-1 min-w-[70px]">
                        <label className="block text-xs font-medium text-gray-500 mb-1">{mes}</label>
                        <input
                            type="number"
                            min="0"
                            value={valores.meses[mesIndex] === 0 ? '' : valores.meses[mesIndex]}
                            placeholder="0"
                            onChange={(e) => onValueChange(areaId, actividadId, mesIndex, e.target.value)}
                            className="w-full text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4 pt-2">
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-700">Total Anual:</span>
                    <span className="font-bold text-lg text-blue-600 w-12 text-center">{totalAnual}</span>
                </div>
                <div className="flex-grow">
                    <label htmlFor={`obs-${actividadId}`} className="sr-only">Observaciones</label>
                    <input
                        type="text"
                        id={`obs-${actividadId}`}
                        value={valores.observaciones}
                        onChange={(e) => onValueChange(areaId, actividadId, null, e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Observaciones y comentarios..."
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityRow;
