import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function margeValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if (ctrl.value) {
            return null;
        } else {
            return {
                margeValidator: ctrl.value
            };
        }
    };
}
