
import React from 'react';
import type { Area } from '../types';
import ActivityRow from './ActivityRow';

interface TabContentProps {
    area: Area;
    valores: { [actividadId: string]: { meses: number[]; observaciones: string } };
    meses: string[];
    onValueChange: (areaId: string, actividadId: string, monthIndex: number | null, value: string | number) => void;
}

const TabContent: React.FC<TabContentProps> = ({ area, valores, meses, onValueChange }) => {
    return (
        <div className="space-y-4">
            {area.actividades.map((actividad, index) => {
                const actividadId = `act-${area.id}-${index}`;
                return (
                    <ActivityRow
                        key={actividadId}
                        areaId={area.id}
                        actividad={actividad}
                        actividadId={actividadId}
                        actividadIndex={index}
                        valores={valores[actividadId]}
                        meses={meses}
                        onValueChange={onValueChange}
                    />
                );
            })}
        </div>
    );
};

export default TabContent;
