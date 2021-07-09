import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  id: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id = +params['id'];
        if(this.id) {
          console.log('In Edit Mode');
        } else {
          console.log('New Recipe Mode');
        }
      }
    )
  }
}
