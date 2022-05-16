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
import { getFilePath } from '../helpers/getFilePath';
import { ACTOR_NOT_FOUND } from './actor.constants';
import { ActorService } from './actor.service';
import { ActorCreateDto } from './dto/create-actor.dto';
import { FindActorDto } from './dto/find-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get('/')
	async getActors(@Query() query: FindActorDto) {
		const { skip, take, firstName, lastName, id, order } = query;

		const actors = await this.actorService.getActors({
			skip: skip || 0,
			take: take || 100,
			where: { id, firstName, lastName },
			orderBy: { id: order },
		});

		return {
			status: 'success',
			data: { results: actors.length, actors },
		};
	}

	@Get('/:id')
	async getActor(@Param('id', ParseIntPipe) id: number) {
		const actor = await this.actorService.getActor(id);

		if (!actor) {
			throw new NotFoundException(ACTOR_NOT_FOUND);
		}

		return { status: 'success', actor };
	}

	@Post('/')
	async createActor(@Body() dto: ActorCreateDto) {
		const actor = await this.actorService.createActor(dto);
		return { status: 'success', data: actor };
	}

	@UseInterceptors(FileInterceptor('file'))
	@Post('/:id/photo')
	async uploadPhoto(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFile() { destination, filename }: Express.Multer.File,
		@Headers('host') host: string,
	) {
		const photo = getFilePath(host, destination, filename);
		const updatedActor = await this.actorService.updateActor(id, { photo });

		return { status: 'success', actor: updatedActor };
	}

	@Patch('/:id')
	async updateActor(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateActorDto) {
		const updatedActor = await this.actorService.updateActor(id, dto);
		return { status: 'success', data: updatedActor };
	}

	@Delete('/:id')
	async deleteActor(@Param('id', ParseIntPipe) id: number) {
		const deletedActor = await this.actorService.deleteActor(id);
		return { status: 'success', data: deletedActor };
	}
}
