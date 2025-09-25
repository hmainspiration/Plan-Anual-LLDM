
import React from 'react';
import type { Area, TabColorScheme } from '../types';

interface TabsProps {
    areas: Area[];
    activeTabId: string;
    onTabClick: (id: string) => void;
    colorSchemes: TabColorScheme[];
}

const Tabs: React.FC<TabsProps> = ({ areas, activeTabId, onTabClick, colorSchemes }) => {
    return (
        <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="-mb-px flex space-x-2 px-4" aria-label="Tabs">
                {areas.map((area, index) => {
                    const isActive = area.id === activeTabId;
                    const colorScheme = colorSchemes[index % colorSchemes.length];
                    const classes = isActive ? colorScheme.active : colorScheme.inactive;

                    return (
                        <button
                            key={area.id}
                            onClick={() => onTabClick(area.id)}
                            className={`whitespace-nowrap flex-shrink-0 py-3 px-4 border-b-4 font-medium text-sm focus:outline-none transition-colors duration-200 rounded-t-md ${classes}`}
                        >
                            {area.nombre}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Tabs;
