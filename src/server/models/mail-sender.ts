import * as nodemailer from 'nodemailer'
import { OrderStatus } from './enums.js';
import { Order } from './order.js';


export class MailSender {

    constructor(private readonly user: string, 
				private readonly password: string, 
				private readonly order: Order,
                private comment: string,
                private host: string,
                private name: string) { }

    async sendMail() {

        let transporter = nodemailer.createTransport({

            host: this.host,
            port: 465,
            secure: true,
            auth: {

                user: this.user,
                pass: this.password

            }

        });
		
		let reason = '';
		
		if(this.comment!='0'){
		
			reason= `, reason: ${this.comment}.`;
		
		}

        let info = await transporter.sendMail({

            from: `${this.name},<${this.user}>`,
            to: this.order.client.email,
            subject: "Order status changed",
            text: `Hi,${this.order.client.name}, You recieved this message cause status of your order changed on ${OrderStatus[this.order.status]}${reason}`

        });

        if (info.pending || info.rejected) {

            console.log(info.pending);
            console.log(info.rejected);

        }

    }

}