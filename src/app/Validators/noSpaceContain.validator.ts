import { FormControl } from "@angular/forms";

export const noSpaceContain = (control: FormControl) => {
    if (control.value != null && control.value.indexOf(' ') != -1) {
        return { noSpaceContain: true };
    }
    return null;
}

// OR

export class customValidators{
    static noSpaceContain(control: FormControl){
        if (control.value != null && control.value.indexOf(' ') != -1) {
            return { noSpaceContain: true };
        }
        return null;
    }
}