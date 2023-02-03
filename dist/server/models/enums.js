export var ConnectorType;
(function (ConnectorType) {
    ConnectorType[ConnectorType["trs_m"] = 0] = "trs_m";
    ConnectorType[ConnectorType["ts_m"] = 1] = "ts_m";
    ConnectorType[ConnectorType["xlr_m"] = 2] = "xlr_m";
    ConnectorType[ConnectorType["rca_m"] = 3] = "rca_m";
    ConnectorType[ConnectorType["trs_f"] = 4] = "trs_f";
    ConnectorType[ConnectorType["ts_f"] = 5] = "ts_f";
    ConnectorType[ConnectorType["xlr_f"] = 6] = "xlr_f";
    ConnectorType[ConnectorType["rca_f"] = 7] = "rca_f";
    ConnectorType[ConnectorType["bnc"] = 8] = "bnc";
})(ConnectorType || (ConnectorType = {}));
export var CoreNumber;
(function (CoreNumber) {
    CoreNumber[CoreNumber["one_ground"] = 0] = "one_ground";
    CoreNumber[CoreNumber["two_ground"] = 1] = "two_ground";
    CoreNumber[CoreNumber["three_ground"] = 2] = "three_ground";
    CoreNumber[CoreNumber["four_ground"] = 3] = "four_ground";
    CoreNumber[CoreNumber["five_ground"] = 4] = "five_ground";
    CoreNumber[CoreNumber["four_by_two_ground"] = 5] = "four_by_two_ground";
    CoreNumber[CoreNumber["eight_by_two_ground"] = 6] = "eight_by_two_ground";
})(CoreNumber || (CoreNumber = {}));
export var WireType;
(function (WireType) {
    WireType[WireType["audio"] = 0] = "audio";
    WireType[WireType["video"] = 1] = "video";
})(WireType || (WireType = {}));
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["under_consideration"] = 0] = "under_consideration";
    OrderStatus[OrderStatus["agree"] = 1] = "agree";
    OrderStatus[OrderStatus["done"] = 2] = "done";
    OrderStatus[OrderStatus["canceled"] = 3] = "canceled";
})(OrderStatus || (OrderStatus = {}));
//# sourceMappingURL=enums.js.map