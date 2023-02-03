import { IItem } from "./IItem.js";

export class Buy {

    constructor(
        public name: string,
        public description: string,
        public cost: number,
        public item: string,
        public count: number) { }

}
