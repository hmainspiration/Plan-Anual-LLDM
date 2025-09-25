
import React, { useState, useCallback, useMemo } from 'react';
import { INITIAL_PLAN_DATA, TAB_COLOR_SCHEMES } from './constants';
import type { PlanData, Valores, Area } from './types';
import Header from './components/Header';
import Tabs from './components/Tabs';
import TabContent from './components/TabContent';
import Footer from './components/Footer';

// Declare XLSX to be available globally from the script tag in index.html
declare const XLSX: any;

const App: React.FC = () => {
    const [planData, setPlanData] = useState<PlanData>(INITIAL_PLAN_DATA);
    const [churchName, setChurchName] = useState<string>('NOMBRE DE IGLESIA');
    const [activeTabId, setActiveTabId] = useState<string>(INITIAL_PLAN_DATA.areas[0].id);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const handleChurchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChurchName(e.target.value);
    };

    const handleValueChange = useCallback((areaId: string, actividadId: string, monthIndex: number | null, value: string | number) => {
        setPlanData(prevData => {
            const newData = { ...prevData };
            const newValores = { ...newData.valores };
            const areaValores = { ...newValores[areaId] };
            const actividadValores = { ...areaValores[actividadId] };

            if (monthIndex !== null) {
                const newMeses = [...actividadValores.meses];
                newMeses[monthIndex] = Math.max(0, Number(value) || 0);
                actividadValores.meses = newMeses;
            } else {
                actividadValores.observaciones = String(value);
            }

            areaValores[actividadId] = actividadValores;
            newValores[areaId] = areaValores;
            newData.valores = newValores;

            return newData;
        });
    }, []);

    const generateExcel = () => {
        setIsGenerating(true);
        // Short delay to allow UI to update to loading state
        setTimeout(() => {
            try {
                const name = churchName.toUpperCase().trim() || "IGLESIA SIN NOMBRE";
                const wb = XLSX.utils.book_new();
                const ws_data: (string | number)[][] = [];
        
                const monthsHeaders = ["ACTIVIDAD", "Sep-25", "Oct-25", "Nov-25", "Dic-25", "Ene-26", "Feb-26", "Mar-26", "Abr-26", "May-26", "Jun-26", "Jul-26", "Ago-26", "TOTAL ANUAL", "OBSERVACIONES Y COMENTARIOS"];
        
                planData.areas.forEach(area => {
                    ws_data.push([`${name}`, `${area.nombre.toUpperCase()}: ${area.objetivo}`]);
                    ws_data.push(monthsHeaders);
        
                    area.actividades.forEach((actividad, actIndex) => {
                        const actividadId = `act-${area.id}-${actIndex}`;
                        const valores = planData.valores[area.id][actividadId];
                        const total = valores.meses.reduce((a, b) => a + b, 0);
                        const row = [
                            `${actIndex + 1}. ${actividad}`,
                            ...valores.meses,
                            total,
                            valores.observaciones
                        ];
                        ws_data.push(row);
                    });
                    
                    ws_data.push([]); // Empty row for spacing
                    ws_data.push([]); // Empty row for spacing
                });
        
                const ws = XLSX.utils.aoa_to_sheet(ws_data);

                // Auto-fit columns
                const colWidths = [
                    { wch: 60 }, // Actividad
                    ...Array(12).fill({ wch: 10 }), // Meses
                    { wch: 15 }, // Total
                    { wch: 50 }  // Observaciones
                ];
                ws['!cols'] = colWidths;
        
                XLSX.utils.book_append_sheet(wb, ws, 'Plan de Trabajo');
                XLSX.writeFile(wb, `PLAN DE TRABAJO ANUAL ${name}.xlsx`);

            } catch(error) {
                console.error("Error generating Excel file:", error);
                alert("Hubo un error al generar el archivo Excel. Revisa la consola para más detalles.");
            } finally {
                setIsGenerating(false);
            }
        }, 50);
    };
    
    const activeArea = useMemo(() => planData.areas.find(area => area.id === activeTabId) as Area, [activeTabId, planData.areas]);

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
            <Header churchName={churchName} onChurchNameChange={handleChurchNameChange} />
            <main className="bg-white shadow-xl rounded-lg">
                <Tabs 
                  areas={planData.areas}
                  activeTabId={activeTabId}
                  onTabClick={setActiveTabId}
                  colorSchemes={TAB_COLOR_SCHEMES}
                />
                <div className="p-4 sm:p-6">
                    <TabContent 
                        key={activeArea.id}
                        area={activeArea} 
                        valores={planData.valores[activeArea.id]}
                        meses={planData.meses}
                        onValueChange={handleValueChange}
                    />
                </div>
                <Footer isGenerating={isGenerating} onGenerateExcel={generateExcel} />
            </main>
        </div>
    );
};

export default App;
