import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-historial.page',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historialReservas: any[]; 
  userId: string; 
  constructor(
    private firebaseSvc: FirebaseService,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the current user's ID
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.firebaseSvc.getAllReservasByUserId(this.userId).subscribe((reservas) => {
          this.historialReservas = reservas;
     
        });
      }
    });
  }

  goBackToHome() {
    this.router.navigate(['/home']);
  }
}
