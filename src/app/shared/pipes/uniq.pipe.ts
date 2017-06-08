import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'uniq'
})
export class UniqPipe implements PipeTransform {

    transform(collection: any, key: string): any {
        const allKeys = key.split('.');

        return _.uniq(collection, (item) => {
            let toCheck = Object.create(item);
            _.each(allKeys, (k) => {
                toCheck = toCheck[k];
            });
            return toCheck;
        });
    }

}
