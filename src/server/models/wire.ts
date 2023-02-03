import { Coil } from './coil.js';
import { IItem } from './IItem.js';

export class Wire {

    constructor(
        public name: string,
        public firstconn: string,
        public secondconn: string,
        public length: number,
        public coil: string) { }

}