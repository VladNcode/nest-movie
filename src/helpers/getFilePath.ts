export const getFilePath = (host: string, destination: string, filename: string) =>
	`http://${host}${destination.split('uploads')[1]}/${filename}`;
