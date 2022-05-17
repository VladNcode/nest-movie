import { Actor } from '@prisma/client';

export interface ActorsFirstAndLastName {
	actors: Pick<Actor, 'firstName' | 'lastName'>[];
}
