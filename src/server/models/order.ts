import { IItem } from './IItem.js'
import { ObjectId } from 'mongodb';
import { Buy } from './buy.js';
import { Client } from './client.js';
import { OrderStatus } from './enums.js';



export class Order {

    constructor(
        //public _id: ObjectId,
        public name: string,
        public client:Client,
        public created: Date,
        public status: OrderStatus,
        public listofbuys: Array<Buy>) { }

}