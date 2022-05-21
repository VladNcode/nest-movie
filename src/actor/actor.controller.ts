import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
	BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Actor } from '@prisma/client';

import { ACTOR_DELETED_SUCCESFULLY, ACTOR_NOT_FOUND, YOU_NEED_TO_UPLOAD_A_FILE } from './actor.constants';
import { ActorService } from './actor.service';
import { FileService, Formatted } from '../helpers';
import { SwaggerDecorator } from '../decorators/swagger.decorator';
import {
	createActor,
	deleteActor,
	getActor,
	getActors,
	updateActor,
	uploadPhoto,
} from '../swagger/actor/actor.decorators';

import { ActorCreateDto, FindActorDto, UpdateActorDto } from 'src/exports/dto';
import { ReturnDeletedMessage, ReturnManyRecords, ReturnSingleRecord } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Actors')
@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService, private readonly fileService: FileService) {}

	@SwaggerDecorator(getActors)
	@Get('/')
	async getActors(@Query() query: FindActorDto): Promise<ReturnManyRecords<'actors', Actor[]>> {
		const { skip, take, firstName, lastName, id, order } = query;

		const actors = await this.actorService.getActors({
			skip: skip || 0,
			take: take || 100,
			where: { id, firstName, lastName },
			orderBy: { id: order },
		});

		return Formatted.response({ results: actors.length, actors });
	}

	@SwaggerDecorator(getActor)
	@Get('/:id')
	async getActor(@Param('id', ParseIntPipe) id: number): Promise<ReturnSingleRecord<'actor', Actor>> {
		const actor = await this.actorService.getActor(id);

		if (!actor) {
			throw new NotFoundException(ACTOR_NOT_FOUND);
		}

		return Formatted.response({ actor });
	}

	@SwaggerDecorator(createActor)
	@Post('/')
	async createActor(@Body() dto: ActorCreateDto): Promise<ReturnSingleRecord<'actor', Actor>> {
		const actor = await this.actorService.createActor(dto);

		return Formatted.response({ actor });
	}

	@SwaggerDecorator(uploadPhoto)
	@UseInterceptors(FileInterceptor('file'))
	@Patch('/:id/photo')
	async uploadPhoto(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFile() file: Express.Multer.File,
	): Promise<ReturnSingleRecord<'actor', Actor>> {
		if (!file) {
			throw new BadRequestException(YOU_NEED_TO_UPLOAD_A_FILE);
		}

		const { destination, filename } = file;

		const photo = this.fileService.getLink({ destination, filename });

		const updatedActor = await this.actorService.updateActor({ id, body: { photo } });

		return Formatted.response({ actor: updatedActor });
	}

	@SwaggerDecorator(updateActor)
	@Patch('/:id')
	async updateActor(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateActorDto,
	): Promise<ReturnSingleRecord<'actor', Actor>> {
		const updatedActor = await this.actorService.updateActor({ id, body: dto });

		return Formatted.response({ actor: updatedActor });
	}

	@SwaggerDecorator(deleteActor)
	@Delete('/:id')
	async deleteActor(@Param('id', ParseIntPipe) id: number): Promise<ReturnDeletedMessage<'message', string>> {
		await this.actorService.deleteActor(id);

		return Formatted.response({ message: ACTOR_DELETED_SUCCESFULLY });
	}
}
