"use strict";
// Este archivo Hash tiene como objetivo contratar
// Un servicio para enviar notificaciones
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temples = void 0;
class Temples {
    static billingClicko(vendor, products) {
        let templete = ``;
        let products_templete = ``;
        templete = `
            <div>Se a solicitado una nueva factura de </div>
            <div>${vendor.name}</div>
        `;
        products.forEach(product => {
            products_templete += `
                <div> ${product.title} IVA: ${product.taxes} subTotal: ${product.subPaymet} total: ${product.fullPaymet}</div>
            `;
        });
        templete = `${templete}${products_templete}`;
        return templete;
    }
}
exports.Temples = Temples;
