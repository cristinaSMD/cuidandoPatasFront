// src/app/shared/models/mascota.model.ts


export interface Mascota {
    id: string;
    type?: string;     ///Pongo ? para que sea opcional   
    breed: string;      
    petName: string;   
    dateBirth?: string;  
    chip: string;      
    foto?: string;      
  }
 

  export const _MascotaModule = true;