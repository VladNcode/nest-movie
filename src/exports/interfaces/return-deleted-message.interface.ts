export interface ReturnDeletedMessage<K extends string, T> {
	status: string;
	data: { [key in K]: T };
}
