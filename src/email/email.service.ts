import { Injectable, Logger, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as pug from 'pug';

@Injectable()
export class EmailService {
	senderEmailAddress: string;

	constructor(private readonly configService: ConfigService) {
		const SEND_GRID_KEY = this.configService.get<string>('SEND_GRID_KEY');
		const SEND_GRID_SENDER_EMAIL = this.configService.get<string>('SEND_GRID_SENDER_EMAIL');

		if (!SEND_GRID_KEY || !SEND_GRID_SENDER_EMAIL) {
			throw new Error('SEND_GRID_KEY or SEND_GRID_SENDER_EMAIL is missing!');
		}

		this.senderEmailAddress = SEND_GRID_SENDER_EMAIL;

		SendGrid.setApiKey(SEND_GRID_KEY);
	}

	async send(mail: SendGrid.MailDataRequired) {
		const transport = await SendGrid.send(mail);
		Logger.log(`E-Mail sent to ${mail.to}`);
		return transport;
	}

	@Render('email-templates/passwordReset')
	async sendPasswordReset({ to, url }: { to: string; url: string }) {
		const subject = 'Your password reset token (valid only for 10 minutes)';

		const html = pug.renderFile(`${__dirname}/../views/email-templates/passwordReset.pug`, {
			firstName: 'User',
			url,
			subject,
		});

		const mail = {
			to,
			subject,
			from: this.senderEmailAddress,
			text: url,
			html,
		};

		const transport = await SendGrid.send(mail);
		return transport;
	}
}
