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
	UploadedFiles,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Movie } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';

import { FileService, Formatted } from '../helpers/';
import { MOVIE_DELETED_SUCCESFULLY, MOVIE_NOT_FOUND } from './movie.constants';
import { MovieService } from './movie.service';

import { CreateMovieDto, FindMovieDto, UpdateMovieDto } from 'src/exports/dto';
import { ReturnDeletedMessage, ReturnManyRecords, ReturnSingleRecord } from '../exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService, private readonly fileService: FileService) {}

	@Get('/')
	async getMovies(@Query() query: FindMovieDto): Promise<ReturnManyRecords<'movies', Movie[]>> {
		const { skip, take, title, id, order } = query;

		const movies = await this.movieService.getMovies({
			skip: skip || 0,
			take: take || 100,
			where: { id, title },
			orderBy: { id: order },
		});

		return Formatted.response({ results: movies.length, movies });
	}

	@Get('/:id')
	async getMovie(@Param('id', ParseIntPipe) id: number): Promise<ReturnSingleRecord<'movie', Movie>> {
		const movie = await this.movieService.getMovie(id);

		if (!movie) {
			throw new NotFoundException(MOVIE_NOT_FOUND);
		}

		const { actors, ...noActorsMovie } = movie;

		const actorsArray = [];

		for (const { firstName, lastName } of actors) {
			actorsArray.push(`${firstName} ${lastName}`);
		}

		return Formatted.response({ movie: { ...noActorsMovie, actors: actorsArray } });
	}

	@Post('/:id/uploadposters/')
	@UseInterceptors(FilesInterceptor('files'))
	async uploadPosters(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFiles() files: Express.Multer.File[],
	): Promise<ReturnSingleRecord<'movie', Movie>> {
		const posters: string[] = [];
		files.forEach(({ destination, filename }) => {
			posters.push(this.fileService.getLink({ destination, filename }));
		});

		const updatedMovie = await this.movieService.updateMovie({ id, body: { posters } });

		return Formatted.response({ movie: updatedMovie });
	}

	@Post('/')
	async createMovie(@Body() dto: CreateMovieDto): Promise<ReturnSingleRecord<'movie', Movie>> {
		const { title, description, releaseDate, actors } = dto;
		const date = new Date(releaseDate);
		const movie = await this.movieService.createMovie({ title, description, releaseDate: date }, actors);

		return Formatted.response({ movie });
	}

	@Patch('/:id')
	async updateMovie(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateMovieDto,
	): Promise<ReturnSingleRecord<'movie', Movie>> {
		const updatedMovie = await this.movieService.updateMovie({ id, body: dto });
		return Formatted.response({ movie: updatedMovie });
	}

	@Delete('/:id')
	async deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<ReturnDeletedMessage<'message', string>> {
		await this.movieService.deleteMovie(id);
		return Formatted.response({ message: MOVIE_DELETED_SUCCESFULLY });
	}
}
