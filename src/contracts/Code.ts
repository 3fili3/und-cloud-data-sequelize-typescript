// Este archivo Hash tiene como objetivo contratar
// Un servicio para tener diferentes methods 
// en cuanto el manejo de generador de Códigos

export class Code {

    public generated(numberFor?: number): string {
        const data = "abcdefghijklmnopqrsxyz123456789"
        let numberMax = 4
        if(numberFor != undefined) {
            numberMax = numberFor
        }
         let code = ""
        for (let index = 0; index < numberMax; index++) {
            code = code+""+data[Math.floor(Math.random() * (data.length - 1))]
        }
        return code
    }
}
