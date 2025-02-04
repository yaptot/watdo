import { AbstractControl, FormControl } from "@angular/forms";

export class DateValidators {
    static validDate(control: AbstractControl): any | null {
        const value = control.value;
        if (!value) {
            return null;
        }

        console.log(value);
        const date = new Date(value);


        if (isNaN(date.getTime())) {
            return { invalidDate: true };
        }
        return null;
    }

    static dateBeforeToday(control: AbstractControl): any | null {
        const value = control.value;
        if (!value) {
            return null;
        }
    
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        if (date < today) {
            return { dateBeforeToday: true };
        }
    
        return null;
    }

    
}