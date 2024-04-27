import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private idUsuarioActual: number | undefined;

  constructor() {}

  setIdUsuarioActual(id: number) {
    this.idUsuarioActual = id;
    console.log('ID de usuario establecido en el servicio:', id);
  }

  getIdUsuarioActual(): number | undefined {
    return this.idUsuarioActual;
  }

}
