import * as moment from 'moment-timezone';
export async function get_og_html_from_path(path: string): Promise<string> {
	const rawTime = path.replace(/\//, '');
	const regex = new RegExp('^([12]?[0-9])([0-5][0-9])([+-][12]?[0-9])$');

	const match = regex.exec(rawTime);

	let timeInfo = 'Invalid time format. Please use 24 hour time with a timezone offset. Example: 3:00pm EST would be 1500-5';

	if (match) {
		const hours = Number(match[1]);
		const minutes = Number(match[2]);
		const offset = Number(match[3]);

		const timezones = moment.tz.names();

		const matchingTimezones = timezones.filter((name) => {
			const timezoneOffset = moment.tz(name).utcOffset() / 60;
			return timezoneOffset === offset;
		});

		const time = moment.tz({ hours: hours, minutes: minutes }, matchingTimezones[0]);

		const ptTime = time.tz('America/Los_Angeles').format('hh:mm a z');
		const etTime = time.tz('America/New_York').format('hh:mm a z');
		const utcTime = time.utc().format('hh:mm a z');

		timeInfo = `${ptTime}\n ${etTime}\n${utcTime}`;
	}

	const html = `<!DOCTYPE html>
    <html>
    <head>
        <meta property="og:description" content="${timeInfo}" />
    </head>
    <body>
        <h1>${timeInfo}</h1>
    </body>
    </html>`;

	return html;
}
