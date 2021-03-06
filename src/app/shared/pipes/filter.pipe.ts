import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(collection: any, key: string, value: any): any {
        const allKeys = key.split('.');

        return _.filter(collection, item => {
            let toCheck = Object.create(item);
            _.each(allKeys, (k) => {
                toCheck = toCheck[k];
            });
            return toCheck === value;
        });
    }

}
