interface LinkData {
	host: string;
	destination: string;
	filename: string;
}

type GetLink = (data: LinkData) => string;

export class File {
	public static getLink: GetLink = data => {
		const { host, destination, filename } = data;

		return `http://${host}${destination.split('uploads')[1]}/${filename}`;
	};
}
