// Archvio CONST para controlar ciertas constantes de clicko

type objectStatus = {
    english: string;
    spanish: string;
}
type Permiss = string[]

export enum actionsPermiss { LEER = "LEER", 'LEER Y EDITAR' = "LEER Y EDITAR" }

const status:Map<string, objectStatus> = new Map();
const actions:Map<actionsPermiss, Permiss> = new Map();

// Objeto con las propiedas de constantes
export const Const = {

    permiss: (permissParams: actionsPermiss) => {
    if(actions.size === 0 ) {
        actions.set('LEER' as actionsPermiss, ['GET'])
        actions.set('LEER Y EDITAR' as actionsPermiss, ['GET','PUT','DELETE','POST'])
    }

    const getPermissTemp = actions.get(permissParams.toUpperCase() as actionsPermiss) 

    if(getPermissTemp === undefined || getPermissTemp === null) throw({ message:'El permiso no existe', status:401 })

    return getPermissTemp

    },
    // Estatus 
    status: (statusParams: string = "actived", leguage: string): string => {
        if(status.size === 0) {
            status.set('actived'.toUpperCase(), { english: 'Actived', spanish: 'Activo' })
            status.set('process'.toUpperCase(), { english: 'Process', spanish: 'En Proceso' })
            status.set('completed'.toUpperCase(), { english: 'Completed', spanish: 'Completado' })
            status.set('request'.toUpperCase(), { english: 'Request', spanish: 'Solicitado' })
            status.set('cancel'.toUpperCase(), { english: 'Cancel', spanish: 'Cancelado' })
        }
        const statusTemp = status.get(statusParams.toUpperCase()) as any
        return statusTemp[leguage]
    },
}
