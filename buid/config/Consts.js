"use strict";
// Archvio CONST para controlar ciertas constantes de clicko
Object.defineProperty(exports, "__esModule", { value: true });
exports.Const = exports.actionsPermiss = void 0;
var actionsPermiss;
(function (actionsPermiss) {
    actionsPermiss["LEER"] = "LEER";
    actionsPermiss["LEER Y EDITAR"] = "LEER Y EDITAR";
})(actionsPermiss || (exports.actionsPermiss = actionsPermiss = {}));
const status = new Map();
const actions = new Map();
// Objeto con las propiedas de constantes
exports.Const = {
    permiss: (permissParams) => {
        if (actions.size === 0) {
            actions.set('LEER', ['GET']);
            actions.set('LEER Y EDITAR', ['GET', 'PUT', 'DELETE', 'POST']);
        }
        const getPermissTemp = actions.get(permissParams.toUpperCase());
        if (getPermissTemp === undefined || getPermissTemp === null)
            throw ({ message: 'El permiso no existe', status: 401 });
        return getPermissTemp;
    },
    // Estatus 
    status: (statusParams = "actived", leguage) => {
        if (status.size === 0) {
            status.set('actived'.toUpperCase(), { english: 'Actived', spanish: 'Activo' });
            status.set('process'.toUpperCase(), { english: 'Process', spanish: 'En Proceso' });
            status.set('completed'.toUpperCase(), { english: 'Completed', spanish: 'Completado' });
            status.set('request'.toUpperCase(), { english: 'Request', spanish: 'Solicitado' });
            status.set('cancel'.toUpperCase(), { english: 'Cancel', spanish: 'Cancelado' });
        }
        const statusTemp = status.get(statusParams.toUpperCase());
        return statusTemp[leguage];
    },
};
