
export interface Area {
    id: string;
    nombre: string;
    objetivo: string;
    actividades: string[];
}

export interface ActividadValores {
    meses: number[];
    observaciones: string;
}

export interface Valores {
    [areaId: string]: {
        [actividadId: string]: ActividadValores;
    };
}

export interface PlanData {
    areas: Area[];
    meses: string[];
    valores: Valores;
}

export interface TabColorScheme {
    active: string;
    inactive: string;
}
