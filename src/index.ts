import * as moment from 'moment-timezone';

const welcome = `<!DOCTYPE html>
<html>
  <meta charset="UTF-8" />
  <body>
    <h1>Welcome to ⏳tzwiz.io⏳!</h1>
    <p>This website gives you a simple way to get Open Graph meta data dynamically to help convert timezones within Slack messages</p>
    <p>Example message: <code>I'll be out for an appointment at tzwiz.io/pm/est/3</code></p>
  </body>
</html>`;

// function getTzfromOffset(offset: string): string {
// 	var timezones = moment.tz.names();

// 	// Filter the timezones based on the UTC offset
// 	var offset = Number(offset); // UTC offset in hours
// 	var matchingTimezones = timezones.filter((name) => {
// 		var timezoneOffset = moment.tz(name).utcOffset() / 60;
// 		return timezoneOffset === offset;
// 	});
// }

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === '/') {
			return new Response(welcome, { headers: { 'content-type': 'text/html' } });
		} else {
			const time = url.pathname.substring(1, 5);
			const offset = url.pathname.substring(5);

			// if (!ip) {
			// 	return new Response('No IP address found', { status: 400 });
			// } else {
			// 	const [minute, hour] = url.pathname.split('/', 2);
			// 	const yourTime = moment.tz({ hours: hour, minutes: minute }, timezone);
			// 	const utcTime = yourTime.utc().format('hh:mm a');
			// 	const ptTime = yourTime.tz('America/Los_Angeles').format('hh:mm a');
			// 	const etTime = yourTime.tz('America/New_York').format('hh:mm a');

			// 	const timeInfo = `Pacific ${ptTime} -8/-7.\nEastern ${etTime} -6/-5.\nUTC ${utcTime} UTC +0`;
			const timeInfo = `timezone ${request.headers.get('X-Forwarded-For')}`;
			const html = `<!DOCTYPE html>
        <html>
          <head>
            <meta property="og:description" content="${timeInfo}" />
          </head>
          <body>
            <h1>${timeInfo}</h1>
          </body>
        </html>`;

			return new Response(html, { headers: { 'content-type': 'text/html' } });
		}
	},
};
