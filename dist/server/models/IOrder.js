var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["under_consideration"] = 0] = "under_consideration";
    OrderStatus[OrderStatus["agree"] = 1] = "agree";
    OrderStatus[OrderStatus["done"] = 2] = "done";
    OrderStatus[OrderStatus["canceled"] = 3] = "canceled";
})(OrderStatus || (OrderStatus = {}));
export class Order {
    constructor(name, date, status, listofbuys) { }
}
//# sourceMappingURL=IOrder.js.map