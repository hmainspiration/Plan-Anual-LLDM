
import type { PlanData, Valores, TabColorScheme } from './types';

const areas = [
    {
        id: "evangelizacion",
        nombre: "Área de Evangelización",
        objetivo: "Incrementar la membrecía de la Iglesia Local",
        actividades: [
            "REUNIONES FAMILIARES", "JORNADAS DE EVANGELIZACIÓN", "CULTOS DE VISITAS",
            "REALIZACIÓN DE BAUTISMOS EN AGUA", "RESTAURACIÓN DE HERMANOS RETIRADOS.",
            "PRESENTACIONES CORALES", "REUNIÓN CON COMISIÓN DE ESTADÍSTICAS", "REUNIÓN CON DIRECTORES DE CORO"
        ]
    },
    {
        id: "oficios-sagrados",
        nombre: "Área de Oficios Sagrados",
        objetivo: "Lograr el crecimiento espiritual de la Iglesia",
        actividades: [
            "REALIZAR AVIVAMIENTOS", "MATRIMONIOS", "PRESENTACIÓN DE NIÑOS DE 40 DÍAS", "BAUTISMOS"
        ]
    },
    {
        id: "espiritual",
        nombre: "Área Espiritual",
        objetivo: "Fortalecer la Vida espiritual de la Iglesia",
        actividades: [
            "ESTUDIOS DE JÓVENES", "ESTUDIOS DE MATRIMONIOS", "ESTUDIOS DE NIÑOS", "ESTUDIOS CON ALMAS NUEVAS",
            "ESTUDIOS HERMANOS SOLOS"
        ]
    },
    {
        id: "financiera",
        nombre: "Área Financiera",
        objetivo: "Promover el desarrollo material y financiero de la Iglesia",
        actividades: [
            "TEMAS DOCTRINALES QUE ABORDEN LA VIRTUD DE LA LIBERALIDAD",
            "ACTIVIDADES QUE GENEREN INGRESOS", "REUNIÓN CON COMISIÓN DE FINANZAS",
            "CREACIÓN DE PROYECTOS QUE GENEREN INGRESOS"
        ]
    },
    {
        id: "patrimonial",
        nombre: "Área Patrimonial",
        objetivo: "Lograr el mejoramiento patrimonial de la Iglesia Local",
        actividades: [
            "ADQUISICIÓN DE TERRENO", "LEGALIZACIÓN DE TERRENO", "CONSTRUCCIÓN O REMODELACIÓN DE CASA DE ORACIÓN",
            "CONSTRUCCIÓN O REMODELACIÓN DE CASA PASTORAL", "CONSTRUCCIÓN O REMODELACIÓN EN OBRAS", "MANTENIMIENTO DE CASA DE ORACIÓN",
            "MANTENIMIENTO DE CASA PASTORAL", "EQUIPAMIENTO DE CASA DE ORACIÓN", "EQUIPAMIENTO DE CASA PASTORAL",
            "REUNIÓN CON COMISIÓN DE PATRIMONIO Y PRO CONSTRUCCIÓN"
        ]
    },
    {
        id: "social",
        nombre: "Área Social",
        objetivo: "Lograr y promover el desarrollo socio económico de la Iglesia y sus alrededores",
        actividades: [
            "FORMULACIÓN Y GESTIÓN DE PROYECTOS PARA IGLESIA",
            "GESTIÓN DE PROYECTOS DE LA IGLESIA EN LA COMUNIDAD",
            "REALIZACIÓN DE OBRA SOCIAL EN LA COMUNIDAD"
        ]
    },
    {
        id: "cultural",
        nombre: "Área Cultural",
        objetivo: "Promover el arte, educación, vida saludable, medio ambiente, historia de la Iglesia.",
        actividades: [
            "FORMULACIÓN Y GESTIÓN DE PROYECTOS PARA IGLESIA LOCAL", "REALIZAR EVENTOS PARA RECORDAR HISTORIA DE LA IGLESIA", "CREACIÓN DE CORO DE LA IGLESIA",
            "CEREMONIA DE GRADUANDOS", "REUNIONES CON PROFESIONISTAS", "CURSOS DE CAPACITACIÓN CON INSTITUCIONES"
        ]
    }
];

const meses = ["SEP", "OCT", "NOV", "DIC", "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO"];

const generateInitialValores = (): Valores => {
    const valores: Valores = {};
    areas.forEach(area => {
        valores[area.id] = {};
        area.actividades.forEach((_, actIndex) => {
            const actividadId = `act-${area.id}-${actIndex}`;
            valores[area.id][actividadId] = {
                meses: Array(12).fill(0),
                observaciones: ''
            };
        });
    });
    return valores;
};

export const INITIAL_PLAN_DATA: PlanData = {
    areas: areas,
    meses: meses,
    valores: generateInitialValores()
};

export const TAB_COLOR_SCHEMES: TabColorScheme[] = [
    { // Blue
        active: 'bg-blue-600 text-white border-blue-600',
        inactive: 'text-blue-700 border-transparent hover:bg-blue-50 hover:text-blue-800 hover:border-blue-200'
    },
    { // Emerald
        active: 'bg-emerald-600 text-white border-emerald-600',
        inactive: 'text-emerald-700 border-transparent hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200'
    },
    { // Purple
        active: 'bg-purple-600 text-white border-purple-600',
        inactive: 'text-purple-700 border-transparent hover:bg-purple-50 hover:text-purple-800 hover:border-purple-200'
    },
    { // Amber
        active: 'bg-amber-500 text-white border-amber-500',
        inactive: 'text-amber-700 border-transparent hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200'
    },
    { // Rose
        active: 'bg-rose-600 text-white border-rose-600',
        inactive: 'text-rose-700 border-transparent hover:bg-rose-50 hover:text-rose-800 hover:border-rose-200'
    },
    { // Indigo
        active: 'bg-indigo-600 text-white border-indigo-600',
        inactive: 'text-indigo-700 border-transparent hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-200'
    },
    { // Teal
        active: 'bg-teal-600 text-white border-teal-600',
        inactive: 'text-teal-700 border-transparent hover:bg-teal-50 hover:text-teal-800 hover:border-teal-200'
    }
];
