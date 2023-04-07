import { IItem } from "./IItem.js";
import { Image } from "./image.js";

export class Buy {

    constructor(
        public name: string,
        public description: string,
        public cost: number,
        public item: string,
		public itemid:string,
        public count: number,
        public image: Image | null,
        public custom:boolean) { }

}
