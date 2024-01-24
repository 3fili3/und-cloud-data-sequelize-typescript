
export class Functions {

    private static numberRounded: number = 2;

    public Money(quanty: number, rounded?: number): number {
        let newQuanty: number = quanty;
        if (rounded != undefined) {
            Functions.numberRounded = rounded;
        }
        if (quanty === 0) {
            return newQuanty;
        }
        if (typeof quanty === "string") {
            newQuanty = parseFloat(quanty);
        }

        const stringQuanty: string = quanty.toString();
        const arrayQuanty: string[] = stringQuanty.split('.');
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

    public ReduceDocument<T>(
        document: any[] | undefined,
        propiedsReduces: { [keyof in string]: string }
    ): T {

        const documentReduce: any = {} as T
        if (document === undefined || document.length === 0) {
            for (const key in propiedsReduces) {
                documentReduce[key] = ""
            }
            return documentReduce
        }

        document.forEach(value => {
            for (const key in propiedsReduces) {
                const arrayPropiedsReduce = propiedsReduces[key].split('.')
                documentReduce[key] = this.RecursivePropieds(value, 0, arrayPropiedsReduce)
            }
        })
        return documentReduce

    }

    public RecursivePropieds<T>(objectAccess: any, index: number, propieds: string[]): T {

        let valuePropiedAccess: any = {}
        if ((propieds.length) > index) {
            const namePropied = propieds[index];
            valuePropiedAccess = objectAccess[namePropied]
            return this.RecursivePropieds<T>(valuePropiedAccess, index + 1, propieds)
        }
        return objectAccess

    }

} 