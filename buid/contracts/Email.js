"use strict";
// Este archivo Hash tiene como objetivo contratar
// Un servicio para enviar notificaciones
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    constructor() {
        this.auth = {
            user: '', pass: ''
        };
        this.Transporter = nodemailer_1.default.createTransport({
            host: "smtp.ethereal.email", port: 587, secure: false, auth: this.auth
        });
    }
    sendEmail(to, title, templete) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield this.Transporter.sendMail({
                from: this.auth.user, to,
                subject: title, html: templete
            });
        });
    }
}
exports.Email = Email;
