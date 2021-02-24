import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Post} from './post';

export const cleanLanguage: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const naughtyWords = ['poo', 'toilet', 'stinky'];
  let isNaughty = false;
  let i;
  for (i = 0; i < naughtyWords.length; i++) {
    if (control.value.includes(naughtyWords[i])) {
      isNaughty = true;
      break;
    }
  }
  return isNaughty ? { customError: { value: 'No explicit language allowed' } } : null;
};

export const crossFieldValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const author = control.get('author').value.toLowerCase();
  const title = control.get('title').value.toLowerCase();
  return title.includes(author) ? { crossFieldError: true } : null;
};

export function asyncValidator(http: HttpClient) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return http
      .get<Post[]>(`http://localhost:3000/posts?author_like=${control.value}`)
      .pipe(map((resp) => resp.length > 0 ? null : { asyncError: true }));
  };
}
