import * as nodemailer from 'nodemailer';
import { OrderStatus } from './enums.js';
export class MailSender {
    constructor(user, password, order) {
        this.user = user;
        this.password = password;
        this.order = order;
    }
    async sendMail() {
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: this.user,
                pass: this.password
            }
        });
        let info = await transporter.sendMail({
            from: `"Timmy",<${this.user}>`,
            to: this.order.client.email,
            subject: "Order status changed",
            text: `Hi,${this.order.client.name}, You recieved this message cause status of your order changed on ${OrderStatus[this.order.status]}`
        });
        if (info.pending || info.rejected) {
            console.log(info.pending);
            console.log(info.rejected);
        }
    }
}
//# sourceMappingURL=mail-sender.js.map