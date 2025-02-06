export interface Medicacion {
    name: string;
    dose: string;
    frequency: string;
    dateStart: string; // Fecha en formato ISO
    dateEnd?: string;  // Puede ser undefined o nulo
    active: boolean;
  }
  export const _medicacionModule = true;