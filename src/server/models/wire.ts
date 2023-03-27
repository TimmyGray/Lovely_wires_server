import { Coil } from './coil.js';
import { IItem } from './IItem.js';
import {Connector} from './connector.js';

export class Wire {

    constructor(
        public name: string,
        public firstconn: Connector[],
        public secondconn: Connector[],
        public length: number,
        public coil: string,
		public numberofconnectors:number) { }

}