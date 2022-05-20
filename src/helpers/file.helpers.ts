import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

interface LinkData {
	destination: string;
	filename: string;
}

type GetLink = (data: LinkData) => string;

@Module({
	imports: [ConfigModule],
	exports: [FileService],
})
export class FileService {
	constructor(private readonly config: ConfigService) {}

	public getLink: GetLink = data => {
		const host = this.config.get('HOST_URL');
		const { destination, filename } = data;

		return `${host}${destination.split('uploads')[1]}/${filename}`;
	};
}
