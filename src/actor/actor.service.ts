import { Injectable } from '@nestjs/common';
import { Actor, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActorService {
	constructor(private prisma: PrismaService) {}

	async createActor(data: Prisma.ActorCreateInput): Promise<Actor> {
		return this.prisma.actor.create({
			data,
		});
	}

	async findActor(data: string): Promise<Actor | null> {
		return this.prisma.actor.findFirst({ where: { firstName: data } });
	}
}
