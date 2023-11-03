import { get_og_html_from_path } from './og';

const welcome = `<!DOCTYPE html>
<html>
  <meta charset="UTF-8" />
  <body>
    <h1>Welcome to ⏳tzwiz.io⏳!</h1>
    <p>This website gives you a simple way to get Open Graph meta data dynamically to help convert timezones within Slack messages</p>
    <p>Example message: <code>I'll be out for an appointment at http://tzwiz.io/1300-5</code></p>
  </body>
</html>`;

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === '/') {
			return new Response(welcome, { headers: { 'content-type': 'text/html' } });
		} else {
			const html = await get_og_html_from_path(url.pathname);
			return new Response(html, { headers: { 'content-type': 'text/html' } });
		}
	},
};
