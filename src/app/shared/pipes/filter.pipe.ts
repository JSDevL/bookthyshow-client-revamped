import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(collection: any, key: string, value: any): any {
        return _.filter(collection, item => item[key] === value);
    }

}
