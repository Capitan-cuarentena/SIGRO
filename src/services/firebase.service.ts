import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, query, collectionData } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from "firebase/storage";
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';


interface UserData {
  uid: string;
  email: string;
  password: string;
  name: string;
  admin: boolean; 
}


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private utilSvc: UtilsService,
    private storage: AngularFirestore,
  ) { }

async isUserAdmin(uid: string): Promise<boolean> {
  try {
    const docRef = doc(getFirestore(), 'users', uid); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData && userData['admin'] === true;
    } else {
      console.log('El documento del usuario no existe.');
      return false;
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return false;
  }
}




  
  
  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  singOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilSvc.routerLink('/auth');
  }


  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }


  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })

  }


getCollectionData (path: string, collectionQuery?: any) {
const ref = collection (getFirestore(), path);
return collectionData (query(ref, collectionQuery), {idField:'id'})
}
getAllReservas(): Observable<any[]> {
  const ref = collection(getFirestore(), 'reservas');
  return collectionData(ref);
}


guardarReserva(productoId: string, fechaInicio: string, fechaFin: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    this.firestore.collection('reservas').add({
      productoId: productoId,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    })
    .then(() => {
      resolve();
    })
    .catch(error => {
      reject(error);
    });
  });
}




// Método para obtener las reservas por ID de usuario
getAllReservasByUserId(userId: string): Observable<any[]> {
  return this.firestore.collection('reservas', ref => ref.where('userId', '==', userId)).valueChanges({ idField: 'id' });
}



}