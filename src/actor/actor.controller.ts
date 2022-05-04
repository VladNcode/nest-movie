import { Body, Controller, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorCreateDto } from './dto/actor-create.dto';

@Controller('actor')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Post('create')
	async createUser(@Body() dto: ActorCreateDto) {
		const actor = await this.actorService.createActor(dto);
		return { status: 'success', data: actor };
	}
}
