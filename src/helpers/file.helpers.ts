import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface LinkData {
	destination: string;
	filename: string;
}

type GetLink = (data: LinkData) => string;

@Injectable()
export class File {
	public static getLink: GetLink = data => {
		const config = new ConfigService();
		const host = config.get('HOST_URL');
		const { destination, filename } = data;

		return `${host}${destination.split('uploads')[1]}/${filename}`;
	};
}
