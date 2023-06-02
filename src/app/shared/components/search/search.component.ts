import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter();
  readonly searchForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.searchForm = fb.group({
      id: [],
      minRating: [, Validators.min(1)],
      maxRating: [, [Validators.min(1), Validators.max(5)]]
    }, {
      validator: [minLessThanMaxValidator]
    });
  }

  ngOnInit(): void {
  }

  onSearch(): void {    
    if (this.searchForm.valid) {
      this.search.emit();
      this.router.navigate(['/search-results'], {
        queryParams: withoutEmptyValues(this.searchForm.value)
      });
    }
  }

}

function withoutEmptyValues(object: any): any {
  return Object.keys(object).reduce((queryParams: any, key) => {
    if (object[key]) { queryParams[key] = object[key]; }
    return queryParams;
  }, {});
}

function minLessThanMaxValidator(group: FormGroup): ValidationErrors | null {
  const minRating = group.controls['minRating'].value;
  const maxRating = group.controls['maxRating'].value;
  if (minRating && maxRating) {
    return minRating <= maxRating ? null : { minLessThanMax: true };
  } else {
    return null;
  }  
}
