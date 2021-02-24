import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PostService} from '../post.service';

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
  return isNaughty ? { explicitLanguage: { value: 'No explicit language allowed' } } : null;
};

export const crossFieldValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const author = control.get('author').value.toLowerCase();
  const title = control.get('title').value.toLowerCase();
  return title.includes(author) ? { crossFieldError: true } : null;
};

export function asyncValidator(postService: PostService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return postService.getPostsOfAuthor(control.value)
      .pipe(map((resp) => resp.length > 0 ? null : { asyncError: true }));
  };
}
