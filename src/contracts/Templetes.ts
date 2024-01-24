// Este archivo Hash tiene como objetivo contratar
// Un servicio para enviar notificaciones

export class Temples {

    public static billingClicko(vendor: { name: string }, products: {title: string, taxes: number, subPaymet: number, fullPaymet: number}[]) {
        
        let templete = ``
        let products_templete = ``

        templete = `
            <div>Se a solicitado una nueva factura de </div>
            <div>${vendor.name}</div>
        `

        products.forEach(product => {
            products_templete += `
                <div> ${product.title} IVA: ${product.taxes} subTotal: ${product.subPaymet} total: ${product.fullPaymet}</div>
            `
        })

        templete = `${templete}${products_templete}`
        return templete
    }
    
}