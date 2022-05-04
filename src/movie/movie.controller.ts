import { Body, Controller, Post } from '@nestjs/common';
import { ActorService } from '../actor/actor.service';
import { MovieCreateDto } from './dto/movie-create.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
	constructor(
		private readonly movieService: MovieService,
		private readonly actorService: ActorService,
	) {}

	@Post('create')
	async createUser(@Body() dto: MovieCreateDto) {
		//TODO CREATE MoviesAndActors SERVICE

		const { title, description, releaseDate, actors } = dto;
		const date = new Date(releaseDate);
		const movie = await this.movieService.createMovie({ title, description, releaseDate: date });

		for (const actor of actors) {
			const firstName = actor.split(' ')[0];
			const actorExist = await this.actorService.findActor(firstName);

			await this.movieService.fillMoviesAndActors({
				Movie: { connect: { id: movie.id } },
				Actor: {
					connectOrCreate: {
						where: { id: actorExist?.id || -1 },
						create: {
							firstName: firstName,
							lastName: actor.split(' ')[1],
							avatar: 'lol.jpg',
						},
					},
				},
			});
		}

		return { status: 'success', data: movie };
	}
}
