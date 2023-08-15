import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: any = {}
  constructor(private _storageService: StorageService){}

  ngOnInit() {
    this.currentUser = JSON.parse(this._storageService.getSessionCurrentUser() || "{}")
  }

}
