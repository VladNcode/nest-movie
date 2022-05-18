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
	Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Actor } from '@prisma/client';

import { ACTOR_DELETED_SUCCESFULLY, ACTOR_NOT_FOUND } from './actor.constants';
import { ActorService } from './actor.service';
import { File, Formatted } from '../helpers';

import { ActorCreateDto, FindActorDto, UpdateActorDto } from 'src/exports/dto';
import { ReturnDeletedMessage, ReturnManyRecords, ReturnSingleRecord } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

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

	@Get('/:id')
	async getActor(@Param('id', ParseIntPipe) id: Actor['id']): Promise<ReturnSingleRecord<'actor', Actor>> {
		const actor = await this.actorService.getActor(id);

		if (!actor) {
			throw new NotFoundException(ACTOR_NOT_FOUND);
		}

		return Formatted.response({ actor });
	}

	@Post('/')
	async createActor(@Body() dto: ActorCreateDto): Promise<ReturnSingleRecord<'actor', Actor>> {
		const actor = await this.actorService.createActor(dto);
		return Formatted.response({ actor });
	}

	@UseInterceptors(FileInterceptor('file'))
	@Post('/:id/photo')
	async uploadPhoto(
		@Param('id', ParseIntPipe) id: Actor['id'],
		@UploadedFile() { destination, filename }: Express.Multer.File,
		@Headers('host') host: string,
	): Promise<ReturnSingleRecord<'actor', Actor>> {
		const photo = File.getLink({ host, destination, filename });
		const updatedActor = await this.actorService.updateActor({ id, body: { photo } });

		return Formatted.response({ actor: updatedActor });
	}

	@Patch('/:id')
	async updateActor(
		@Param('id', ParseIntPipe) id: Actor['id'],
		@Body() dto: UpdateActorDto,
	): Promise<ReturnSingleRecord<'actor', Actor>> {
		const updatedActor = await this.actorService.updateActor({ id, body: dto });
		return Formatted.response({ actor: updatedActor });
	}

	@Delete('/:id')
	async deleteActor(@Param('id', ParseIntPipe) id: Actor['id']): Promise<ReturnDeletedMessage<'message', string>> {
		await this.actorService.deleteActor(id);
		return Formatted.response({ message: ACTOR_DELETED_SUCCESFULLY });
	}
}
