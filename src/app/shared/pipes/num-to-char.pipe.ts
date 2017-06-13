import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'numToChar'
})
export class NumToCharPipe implements PipeTransform {

    transform(value: number): string {
        return String.fromCharCode(65 + value);
    }

}
