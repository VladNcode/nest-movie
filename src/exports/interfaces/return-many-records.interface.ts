export type RecordType<K extends string, T> = {
	[key in K]: T;
};

export interface Result {
	results: number;
}

export interface ReturnManyRecords<K extends string, T> {
	status: string;
	data: RecordType<K, T> & Result;
}
