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
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Actor } from '@prisma/client';

import { ACTOR_DELETED_SUCCESFULLY, ACTOR_NOT_FOUND, YOU_NEED_TO_UPLOAD_A_FILE } from './actor.constants';
import { ActorService } from './actor.service';
import { File, Formatted } from '../helpers';
import { SwaggerFileDecorator } from '../decorators/swagger-file-upload.decorator';
import { ActorSwaggerDoc } from '../swagger/actor/actor.interface';

import { RecordToUpdateNotFound, RecordToDeleteNotFound, FileUploadError } from 'src/exports/swagger-errors';
import { ActorCreateDto, FindActorDto, UpdateActorDto } from 'src/exports/dto';
import { ReturnDeletedMessage, ReturnManyRecords, ReturnSingleRecord } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Actors')
@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get('/')
	@ApiOkResponse({ description: 'Returns actors array', content: ActorSwaggerDoc.getActors() })
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
	@ApiOkResponse({ description: 'Returns an actor', content: ActorSwaggerDoc.getActor() })
	@ApiNotFoundResponse({ description: 'Not Found', content: ActorSwaggerDoc.actorNotFound() })
	async getActor(@Param('id', ParseIntPipe) id: number): Promise<ReturnSingleRecord<'actor', Actor>> {
		const actor = await this.actorService.getActor(id);

		if (!actor) {
			throw new NotFoundException(ACTOR_NOT_FOUND);
		}

		return Formatted.response({ actor });
	}

	@Post('/')
	@ApiCreatedResponse({ description: 'Creates an actor', content: ActorSwaggerDoc.getActor() })
	@ApiBadRequestResponse({ description: 'Bad Request', content: ActorSwaggerDoc.createActorBadRequest() })
	async createActor(@Body() dto: ActorCreateDto): Promise<ReturnSingleRecord<'actor', Actor>> {
		const actor = await this.actorService.createActor(dto);

		return Formatted.response({ actor });
	}

	@Patch('/:id/photo')
	@UseInterceptors(FileInterceptor('file'))
	@SwaggerFileDecorator()
	@ApiOkResponse({ description: 'Returns updated actor', content: ActorSwaggerDoc.getActor() })
	@ApiNotFoundResponse({ description: 'Not Found', type: FileUploadError })
	async uploadPhoto(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFile() file: Express.Multer.File,
	): Promise<ReturnSingleRecord<'actor', Actor>> {
		if (!file) {
			throw new BadRequestException(YOU_NEED_TO_UPLOAD_A_FILE);
		}

		const { destination, filename } = file;

		const photo = File.getLink({ destination, filename });

		const updatedActor = await this.actorService.updateActor({ id, body: { photo } });

		return Formatted.response({ actor: updatedActor });
	}

	@Patch('/:id')
	@ApiOkResponse({ description: 'Returns updated actor', content: ActorSwaggerDoc.getActor() })
	@ApiNotFoundResponse({ status: 404, description: 'Not Found', type: RecordToUpdateNotFound })
	async updateActor(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateActorDto,
	): Promise<ReturnSingleRecord<'actor', Actor>> {
		const updatedActor = await this.actorService.updateActor({ id, body: dto });

		return Formatted.response({ actor: updatedActor });
	}

	@Delete('/:id')
	@ApiOkResponse({ description: 'Deletes actor record', content: ActorSwaggerDoc.getActorDeletedMessage() })
	@ApiNotFoundResponse({ status: 404, description: 'Not Found', type: RecordToDeleteNotFound })
	async deleteActor(@Param('id', ParseIntPipe) id: number): Promise<ReturnDeletedMessage<'message', string>> {
		await this.actorService.deleteActor(id);

		return Formatted.response({ message: ACTOR_DELETED_SUCCESFULLY });
	}
}
