"use strict";
// Archivo para contratar el manejo de tiempo
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
class Time {
    constructor() {
        this.Mounth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    }
    // Calculamos la fecha al restarle una fecha pasada por string y la fecha actual
    calculeDate(days) {
        // Obtenemos la fecha actual
        const date = new Date();
        // Obtenemos el tiempo de los dias
        const timeDays = this.calculedTime({ date: 'days', time: days });
        // restamos el tiempo actual con el de los dias
        const fullTimesDate = date.getTime() - timeDays;
        // retornamos nueva objeto de fecha con el tiempo restado
        return new Date(fullTimesDate);
    }
    getRemainingDaysPerMonth() {
        const date = new Date();
        const dateRemainingDaysPerMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const daysRemainingDaysPerMont = dateRemainingDaysPerMonth.getDate() - date.getDate();
        return daysRemainingDaysPerMont;
    }
    // Obtenemos la fecha en formato string
    // Çon parametro de separación
    getDate(sep) {
        // Evaluamos para dejar un valor por defecto
        if (sep === undefined) {
            sep = '-';
        }
        const date = new Date();
        // creamos un objeto con la fecha actual
        // retamos la fecha en formato string
        return `${date.getFullYear()}${sep}${this.autoCompleted(date.getMonth())}${sep}${this.autoCompleted(date.getDate())}`;
    }
    // Metodo para colcoar ceros a las los dias o meses que tenga solo
    // un número
    autoCompleted(data) {
        // Evaluamos si el numero cuanta con 2 o mas digitos
        if (data.toString().length >= 2) {
            return data;
        }
        // de no ser hacer solo agregamos un cero y retornamos
        return `0${data}`;
    }
    getMilisecondsByDate(date) {
        if (typeof date === 'string') {
            const dateTemp = new Date(date);
            return dateTemp.getTime();
        }
        return date.getTime();
    }
    calculedTime(data) {
        // Obtenemos el tiempo en cada etapa
        const miliseconds = 1000;
        const seconds = miliseconds;
        const minuts = 60 * seconds;
        const hours = 60 * minuts;
        const day = 24 * hours;
        let time = 0;
        // Evualamos si queremos obtener el tiempo en
        // Años, Meses,Dias, Horas, Minutos o Segundos
        switch (data.date) {
            case 'days':
                // Multiplicamos el tiempo por dias
                time = data.time * day;
                break;
            case 'hours':
                time = data.time * hours;
                break;
            case 'minutes':
                time = data.time * minuts;
                break;
            case 'seconds':
                time = data.time * seconds;
                break;
            default:
                break;
        }
        // Retornamos el tiempo
        return time;
    }
    // Metodo para obtener la fecha
    // Día Mes completo y Año
    getCompletedDate(dateString) {
        let dateTemp = dateString;
        if (typeof dateString === 'string') {
            dateTemp = new Date(dateString);
        }
        const date = dateTemp;
        return `${date.getDate()} de ${this.Mounth[date.getMonth()]} del ${date.getFullYear()}`;
    }
    getDaysInMount(date) {
        let dateTemp = {};
        if (typeof date === 'string') {
            dateTemp = new Date(date);
        }
        else {
            dateTemp = date;
        }
        return (new Date(dateTemp.getFullYear(), dateTemp.getMonth(), 0)).getDate();
    }
    getInitAndLastDate() {
        const date = new Date();
        const response = { end: new Date(date.getFullYear(), date.getMonth() + 1, 0), init: new Date(date.getFullYear(), date.getMonth(), 1) };
        return response;
    }
}
exports.Time = Time;