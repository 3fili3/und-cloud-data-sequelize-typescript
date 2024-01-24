// Este archivo Hash tiene como objetivo contratar
// Un servicio para enviar notificaciones

import nodemailer from 'nodemailer'

export class Email {

    private auth: { user:string, pass: string } = {
        user: '', pass: ''
    }

    private Transporter  = nodemailer.createTransport({
        host: "smtp.ethereal.email", port: 587, secure: false, auth: this.auth
    })

    public async sendEmail(to: string, title: string, templete: string) {
        const email = await this.Transporter.sendMail({
            from: this.auth.user, to,
            subject: title, html: templete
        })
    }
}