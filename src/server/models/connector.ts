import { ConnectorType } from "./enums";
import { IItem } from "./IItem";

export class Connector implements IItem {

	constructor(
		public name: string,
		public type: string,
		public count: number) { }
}