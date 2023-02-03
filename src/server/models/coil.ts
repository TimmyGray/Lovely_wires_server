import { IItem } from "./IItem";

export class Coil implements IItem {

    constructor(
        public name: string,
        public type: string,
        public typeofsignal: string,
        public length: number,) { }


}