import * as nodemailer from 'nodemailer'
import { OrderStatus } from './enums.js';
import { Order } from './order.js';


export class MailSender {

    constructor(private readonly user: string, private readonly password: string, private readonly order: Order) { }

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