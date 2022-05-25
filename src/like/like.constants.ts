export const ITEM_NOT_FOUND = (likeType: string): string =>
	`${
		likeType === 'CommentResponse' ? 'Comment' : likeType[0].toUpperCase() + likeType.slice(1)
	} with this id was not found!`;

export const LIKE_DELETED_SUCCESSFULLY = 'Like was deleted successfully!';
export const NOT_LIKED = 'User have not liked this record!';
