import { Blob } from "buffer";
import { ObjectId } from "mongodb";

export class Image {

    constructor(
        public _id: ObjectId,
        public name: string,
        public size: number,
        public type: string) { }

}