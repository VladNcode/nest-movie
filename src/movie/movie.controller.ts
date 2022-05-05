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
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ActorService } from '../actor/actor.service';
import { MoviesAndActorsService } from '../movies-and-actors/movies-and-actors.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FindMovieDto } from './dto/find-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('movies')
export class MovieController {
	constructor(
		private readonly movieService: MovieService,
		private readonly actorService: ActorService,
		private readonly movieAndActorService: MoviesAndActorsService,
	) {}

	@Get('/')
	async getMovies(@Query() query: FindMovieDto) {
		const { skip, take, title, id, order } = query;

		return this.movieService.getMovies({
			skip: +skip || 0,
			take: +take || 100,
			where: {
				id: id > 1000000000000000000 ? undefined : id || undefined,
				title: title,
			},
			orderBy: { id: order },
		});
	}

	@Get('/:id')
	async getMovie(@Param('id', ParseIntPipe) id: number) {
		const movie = await this.movieService.getMovie(id);

		if (!movie) {
			throw new NotFoundException('Movie with this ID not found');
		}

		const actors = await this.movieAndActorService.findActorsInMovie(id);
		const actorsArray = [];

		for (const {
			Actor: { firstName, lastName },
		} of actors) {
			actorsArray.push(`${firstName} ${lastName}`);
		}

		return { status: 200, data: { ...movie, actors: actorsArray } };
	}

	@Post('/')
	async createMovie(@Body() dto: CreateMovieDto) {
		const { title, description, releaseDate, actors } = dto;
		const date = new Date(releaseDate);
		const movie = await this.movieService.createMovie({ title, description, releaseDate: date });

		for (const actor of actors) {
			const firstName = actor.split(' ')[0];
			const actorExist = await this.actorService.findActor(firstName);

			await this.movieAndActorService.fillMoviesAndActors({
				Movie: { connect: { id: movie.id } },
				Actor: {
					connectOrCreate: {
						where: { id: actorExist?.id || -1 },
						create: {
							firstName,
							lastName: actor.split(' ')[1],
							photo: 'lol.jpg',
						},
					},
				},
			});
		}

		return { status: 'success', data: movie };
	}

	@Patch('/:id')
	async updateMovie(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
		const updatedMovie = await this.movieService.updateMovie(id, dto);
		return { status: 'success', data: updatedMovie };
	}

	@Delete('/:id')
	async deleteMovie(@Param('id', ParseIntPipe) id: number) {
		await this.movieAndActorService.cleanUpMoviesAndActors(id);
		const deletedMovie = await this.movieService.deleteMovie(id);
		return { status: 'success', data: deletedMovie };
	}
}
