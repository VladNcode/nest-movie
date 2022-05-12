import { LikeType } from '@prisma/client';

export interface CountLikes {
	status: string;
	data?: {
		type: LikeType;
		id: number;
		likeCount: number;
	};
	message?: string;
}
