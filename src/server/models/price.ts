import { IItem } from "./IItem";

export class Price {

    constructor(
        public name: string,
        public cost: number,
        public itemofprice: IItem) { }

}