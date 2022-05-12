import { LikeType } from '@prisma/client';

export interface createFindUpdateLike {
	likeType: LikeType;
	typeId: number;
	userId: number;
}
