export const ITEM_NOT_FOUND = (likeType: string) =>
	`${
		likeType === 'CommentResponse' ? 'Comment' : likeType[0].toUpperCase() + likeType.slice(1)
	} with this id was not found!`;

export const LIKE_DELETED_SUCCESSFULLY = 'Like was deleted successfully!';
export const COULD_NOT_COUNT_LIKES = 'Could not count likes!';
