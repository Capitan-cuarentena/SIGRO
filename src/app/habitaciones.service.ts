// habitaciones.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { Observable } from 'rxjs';

export interface Habitacion {
    habitacionId: string;
    nombre: string;
    descripcion: string;
    disponible: boolean;
    precio: number;
}

@Injectable({
    providedIn: 'root'
})
export class HabitacionesService {

    constructor(private db: AngularFireDatabase) { }

    getHabitaciones(): Observable<Habitacion[]> {
        return this.db.list<Habitacion>('habitaciones').valueChanges();
    }
}
