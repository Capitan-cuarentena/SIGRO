import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {}
  signOut() {
    this.firebaseSvc.singOut();
  }
}
