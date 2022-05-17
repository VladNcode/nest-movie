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
	Headers,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { File } from '../helpers/file.helpers';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FindMovieDto } from './dto/find-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MOVIE_NOT_FOUND } from './movie.constants';
import { MovieService } from './movie.service';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('/')
	async getMovies(@Query() query: FindMovieDto) {
		const { skip, take, title, id, order } = query;

		const movies = await this.movieService.getMovies({
			skip: skip || 0,
			take: take || 100,
			where: { id, title },
			orderBy: { id: order },
		});

		return {
			status: 'success',
			data: {
				results: movies.length,
				movies,
			},
		};
	}

	@Get('/:id')
	async getMovie(@Param('id', ParseIntPipe) id: number) {
		const movie = await this.movieService.getMovie(id);

		if (!movie) {
			throw new NotFoundException(MOVIE_NOT_FOUND);
		}

		const { actors, ...noActorsMovie } = movie;

		const actorsArray = [];
		for (const { firstName, lastName } of actors) {
			actorsArray.push(`${firstName} ${lastName}`);
		}

		return {
			status: 'success',
			movie: { ...noActorsMovie, actors: actorsArray },
		};
	}

	@Post('/:id/uploadposters/')
	@UseInterceptors(FilesInterceptor('files'))
	async uploadPosters(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFiles() files: Express.Multer.File[],
		@Headers('host') host: string,
	) {
		const posters: string[] = [];
		files.forEach(({ destination, filename }) => {
			posters.push(File.getLink({ host, destination, filename }));
		});

		const updatedMovie = await this.movieService.updateMovie(id, { posters });
		return { status: 'success', data: updatedMovie };
	}

	@Post('/')
	async createMovie(@Body() dto: CreateMovieDto) {
		const { title, description, releaseDate, actors } = dto;

		const date = new Date(releaseDate);
		const movie = await this.movieService.createMovie(
			{ title, description, releaseDate: date },
			actors,
		);

		return { status: 'success', data: movie };
	}

	@Patch('/:id')
	async updateMovie(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
		const updatedMovie = await this.movieService.updateMovie(id, dto);
		return { status: 'success', data: updatedMovie };
	}

	@Delete('/:id')
	async deleteMovie(@Param('id', ParseIntPipe) id: number) {
		const deletedMovie = await this.movieService.deleteMovie(id);
		return { status: 'success', data: deletedMovie };
	}
}
