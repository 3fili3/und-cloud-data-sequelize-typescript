"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Functions = void 0;
class Functions {
    Money(quanty, rounded) {
        let newQuanty = quanty;
        if (rounded != undefined) {
            Functions.numberRounded = rounded;
        }
        if (quanty === 0) {
            return newQuanty;
        }
        if (typeof quanty === "string") {
            newQuanty = parseFloat(quanty);
        }
        const stringQuanty = quanty.toString();
        const arrayQuanty = stringQuanty.split('.');
        if (arrayQuanty.length >= 2) {
            const quantyTemp = parseFloat(newQuanty.toFixed(Functions.numberRounded));
            const quantyArray = (quantyTemp.toString()).split(".");
            let endElementQuanty = (quantyArray[1])[1];
            newQuanty = parseFloat(quantyArray.join('.'));
            if (endElementQuanty === undefined) {
                newQuanty = parseFloat(newQuanty.toString() + "0");
            }
        }
        return newQuanty;
    }
    ReduceDocument(document, propiedsReduces) {
        const documentReduce = {};
        if (document === undefined || document.length === 0) {
            for (const key in propiedsReduces) {
                documentReduce[key] = "";
            }
            return documentReduce;
        }
        document.forEach(value => {
            for (const key in propiedsReduces) {
                const arrayPropiedsReduce = propiedsReduces[key].split('.');
                documentReduce[key] = this.RecursivePropieds(value, 0, arrayPropiedsReduce);
            }
        });
        return documentReduce;
    }
    RecursivePropieds(objectAccess, index, propieds) {
        let valuePropiedAccess = {};
        if ((propieds.length) > index) {
            const namePropied = propieds[index];
            valuePropiedAccess = objectAccess[namePropied];
            return this.RecursivePropieds(valuePropiedAccess, index + 1, propieds);
        }
        return objectAccess;
    }
}
exports.Functions = Functions;
Functions.numberRounded = 2;
