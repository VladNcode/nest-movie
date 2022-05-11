import { Injectable } from '@nestjs/common';
import { Actor, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetActors } from './interfaces/get-actors.interface';

@Injectable()
export class ActorService {
	constructor(private prisma: PrismaService) {}

	async getActor(id: number): Promise<Actor | null> {
		return this.prisma.actor.findUnique({ where: { id } });
	}

	async getActors(params: GetActors): Promise<Actor[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.actor.findMany({ skip, take, cursor, where, orderBy });
	}

	async createActor(data: Prisma.ActorCreateInput): Promise<Actor> {
		return this.prisma.actor.create({ data });
	}

	async updateActor(id: number, data: Prisma.ActorUpdateInput): Promise<Actor> {
		return this.prisma.actor.update({ where: { id }, data });
	}

	async deleteActor(id: number): Promise<Actor> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'actor' }, { typeId: id }] },
		});

		const deletedRatings = this.prisma.rating.deleteMany({
			where: { AND: [{ ratingType: 'actor' }, { typeId: id }] },
		});

		const deletedActor = this.prisma.actor.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedRatings, deletedActor]);

		return deletedActor;
	}
}
