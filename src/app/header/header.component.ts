import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  saveRecipeData() {
    this.dataStorageService.saveRecipes();
  }

  fetchRecipeData() {
    this.dataStorageService.fetchRecipes();
  }
}
