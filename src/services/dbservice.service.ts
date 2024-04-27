import { PlatformModule } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistorialUsuario } from '../service/historial-usuario';


@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  public database!: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

//TABLA USUARIO
  tableUsuario: string = `CREATE TABLE IF NOT EXISTS usuario(
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, 
    usuario VARCHAR(40) NOT NULL UNIQUE, 
    contrasena VARCHAR(40) NOT NULL, 
    nombre VARCHAR(40) NOT NULL, 
    apellido VARCHAR(40) NOT NULL, 
    email VARCHAR(40) NOT NULL UNIQUE
  );`;
  

  viajeUsuarioHistorial = new BehaviorSubject<HistorialUsuario[]>([]);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController ) { 
    this.crearBD();
}

async presentToast(msj: string) {
  const toast = await this.toastController.create({
    message: msj,
    duration: 3000,
    icon: 'globe'
  });
  await toast.present();
}

async presentAlert(msj: string) {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: msj,
    buttons: ['OK']
  });
  await alert.present();
}

async crearBD() {
  this.platform.ready().then(() => {
    this.sqlite.create({
      name: 'bdnoticias.db',
      location: 'default'
    }).then((db: SQLiteObject) => { 
      this.database = db;
      this.crearTablas();
    }).catch(e => {
      this.presentToast("Error BD: " + e);
    });
  });
}

//CREAR LAS TABLAS NECESARIAS
async crearTablas() {
  try {
    await this.database.executeSql(`
      CREATE TABLE IF NOT EXISTS usuario(
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, 
        usuario VARCHAR(40) NOT NULL UNIQUE, 
        contrasena VARCHAR(40) NOT NULL, 
        nombre VARCHAR(40) NOT NULL, 
        apellido VARCHAR(40) NOT NULL, 
        email VARCHAR(40) NOT NULL UNIQUE
      );`, []);

    await this.database.executeSql(`
      CREATE TABLE IF NOT EXISTS viajes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER,
        partida TEXT,
        comunaInicio TEXT,
        regionInicio TEXT,
        destino TEXT,
        comunaDestino TEXT,
        regionDestino TEXT,
        fecha TEXT,
        distancia REAL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
      );`, []);

    this.isDBReady.next(true);
  } catch (e) {
    this.presentToast("Error Tablas: " + e);
  }
}


insertViaje(data: any,id_usuario: number) {
  const sql = `INSERT INTO viajes (id_usuario, partida, comunaInicio, regionInicio, destino, comunaDestino, regionDestino, fecha, distancia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    id_usuario, 
    `${data.addressPair.startAddress.street} ${data.addressPair.startAddress.home}`,
    data.addressPair.startAddress.city,
    data.addressPair.startAddress.region,
    `${data.addressPair.destinationAddress.street} ${data.addressPair.destinationAddress.home}`,
    data.addressPair.destinationAddress.city,
    data.addressPair.destinationAddress.region,
    data.viaje.fecha,
    data.distanceInKilometers
  ];

  return this.database.executeSql(sql, values);
}



loginUsuario(email: string, contrasena: string): Promise<number> {
  return this.database.executeSql('SELECT id_usuario FROM usuario WHERE email = ? AND contrasena = ?', [email, contrasena])
    .then(data => {
      if (data.rows.length > 0) {
        return data.rows.item(0).id_usuario; 
      } else {
        throw new Error('Credenciales incorrectas');
      }
    })
    .catch(e => {
      this.presentToast('Error al iniciar sesión: ' + e.message);
      return Promise.reject(e.message);
    });
}

getViajes(idUsuario: number): Promise<any[]> {
  const sql = 'SELECT * FROM viajes WHERE id_usuario = ?';
  return this.database.executeSql(sql, [idUsuario])
    .then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push(res.rows.item(i));
        }
      }
      return items;
    });
}


getUsuarioById(id: number): Promise<any> { 
  return this.database.executeSql('SELECT * FROM usuario WHERE id_usuario = ?', [id])
    .then(data => {
      if (data.rows.length > 0) {
        return data.rows.item(0);
      } else {
        throw new Error('Usuario no encontrado');
      }
    })
    .catch(e => {
      this.presentToast('Error al obtener usuario: ' + e.message);
      return Promise.reject(e.message);
    });
}



insertarUsuario(usuario: string, contrasena: string, nombre: string, apellido: string, email: string): Promise<number> {
  let data = [usuario, contrasena, nombre, apellido, email];
  return this.database.executeSql('INSERT INTO usuario (usuario, contrasena, nombre, apellido, email) VALUES (?, ?, ?, ?, ?)', data)
    .then((result) => {
      this.presentToast('Usuario insertado con éxito');
      return result.insertId; 
    })
    .catch(e => {
      let errorMessage = 'Error al insertar usuario: ';
      if (e.code === 6) {
        if (e.message.includes('usuario')) {
          errorMessage += 'El nombre de usuario ya existe.';
        } else if (e.message.includes('email')) {
          errorMessage += 'El email ya está registrado.';
        }
      } else {
        errorMessage += e.message;
      }
      this.presentToast(errorMessage);
      return Promise.reject(errorMessage);
    });
}


actualizarUsuario(id_usuario: number, usuario: string, contrasena: string, nombre: string, apellido: string, email: string): Promise<void> {
  let data = [usuario, contrasena, nombre, apellido, email, id_usuario];
  return this.database.executeSql('UPDATE usuario SET usuario = ?, contrasena = ?, nombre = ?, apellido = ?, email = ? WHERE id_usuario = ?', data)
    .then(_ => {
      this.presentToast('Usuario actualizado con éxito');
    })
}


eliminarUsuario(id_usuario: number): Promise<void> {
  return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario])
    .then(_ => {
      this.presentToast('Usuario eliminado con éxito');
    })
    .catch(e => {
      this.presentToast('Error al eliminar usuario: ' + e);
    });
}







}



