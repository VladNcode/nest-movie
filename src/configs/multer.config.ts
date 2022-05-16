import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { format } from 'date-fns';
import { ensureDir } from 'fs-extra';
import { path } from 'app-root-path';
import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const getMulterConfig = async (configService: ConfigService): Promise<MulterOptions> => {
	const MULTER_DEST: string | undefined = configService.get('MULTER_DEST');
	if (!MULTER_DEST) {
		throw new Error('Env variable MULTER_DEST is missing!');
	}

	const dateFolder = format(new Date(), 'yyyy-MM-dd');
	const uploadFolder = `${path}/${MULTER_DEST}/${dateFolder}`;
	await ensureDir(uploadFolder);

	return {
		// dest: configService.get('MULTER_DEST'),
		storage: diskStorage({
			destination: (_, file, cb) => {
				if (!file.mimetype.includes('image')) {
					return cb(new BadRequestException('Only image files can be uploaded!'), uploadFolder);
				}

				cb(null, uploadFolder);
			},
			filename: (_, file, cb) => {
				const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
				let fileExtension = '';
				if (file.mimetype.indexOf('jpeg') > -1) {
					fileExtension = 'jpg';
				} else if (file.mimetype.indexOf('png') > -1) {
					fileExtension = 'png';
				}

				const originalName = file.originalname.split('.')[0];
				cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
			},
		}),
	};
};
