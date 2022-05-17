import { Injectable } from '@nestjs/common';
import { Actor, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActorService {
	constructor(private prisma: PrismaService) {}

	async getActor(id: Actor['id']): Promise<Actor | null> {
		return this.prisma.actor.findUnique({ where: { id } });
	}

	async getActors(params: Prisma.ActorFindManyArgs): Promise<Actor[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.actor.findMany({ skip, take, cursor, where, orderBy });
	}

	async createActor(data: Prisma.ActorCreateInput): Promise<Actor> {
		return this.prisma.actor.create({ data });
	}

	async updateActor(data: { id: Actor['id']; body: Prisma.ActorUpdateInput }): Promise<Actor> {
		const { id, body } = data;
		return this.prisma.actor.update({ where: { id }, data: body });
	}

	/**
	 * Since our database uses ENUMs and has no direct refs, run a transaction
	 * to delete: likes, rating and comments which are related to the actor
	 * @param id - the actor id
	 * @returns deleted actor
	 */
	async deleteActor(id: Actor['id']): Promise<Actor> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'actor' }, { typeId: id }] },
		});

		const deletedRatings = this.prisma.rating.deleteMany({
			where: { AND: [{ ratingType: 'actor' }, { typeId: id }] },
		});

		const deleteComments = this.prisma.comment.deleteMany({
			where: { AND: [{ commentType: 'actor' }, { typeId: id }] },
		});

		const deletedActor = this.prisma.actor.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedRatings, deleteComments, deletedActor]);

		return deletedActor;
	}
}
