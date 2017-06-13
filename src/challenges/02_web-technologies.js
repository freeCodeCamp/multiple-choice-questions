
/***********************************
 * Create Code Snippets
 *********************************** */



 /***********************************
 * Challenge Seed Template
 *********************************** */

 /*
  {
   title: ``,
 	subtitle: ``,
   choices: [
  	 ``,
  	 ``,
  	 ``,
  	 ``
   ],
   solution: ``,
   explanation: ``
  },
 */

/***********************************
 * Export Challenge Array
 *********************************** */

export default {
	title: `Web Technologies`,
	category: `Web Technologies`,
	challenges: [
		{
			title: `How many classes of HTTP status codes are there?`,
			subtitle: `HTTP Status Codes`,
			choices: [
				`One`,
				`Two`,
				`Three`,
				`Four`,
				`Five`,
			],
			solution: `4`,
			explanation: `There are five different classes of HTTP status codes,
				represented by 100, 200, 300, 400, and 500. Each is used to specify
				a different server response to a client during use of the Hypertext
				Transfer Protocol (HTTP).
			`
		},
		{
			title: `___ is the HTTP status code for client errors, and ___ is the status code for server errors.`,
			subtitle: `Understanding HTTP Status Codes`,
			choices: [
				`200, 300`,
				`200, 400`,
				`300, 500`,
				`200, 500`,
				`400, 500`,
			],
			solution: `4`,
			explanation: `Any 400 status is used for client errors (unauthorized, bad request, not found, etc),
			 and 500 status is used for servers errors (internal server error, bad gateway, etc.).`
	  },
		{
			title: `Which HTTP status code is reserved for successful responses?`,
			subtitle: `HTTP Success Status`,
			choices: [
			 `100`,
			 `200`,
			 `300`,
			 `400`,
			 `500`
			],
			solution: `1`,
			explanation: `The 200 status codes are reserved for client requests that are
				received and successfully processed by a server.`
	  },
		{
			title: `What role does the Domain Name System play in resolving web traffic?`,
			subtitle: `Understanding the Domain Name System`,
			choices: [
				`The DNS is responsible for resolving web domain names to the actual IP addresses
					where the associated service is located.`,
				`The DNS is responsible for breaking internet traffic into small packets to be sent
					to web clients.`,
				`The DNS system is responsible for verifying SSL security certificates.`,
				`The DNS system plays an important role re-routing server traffic when a single
					server becomes over-loaded.`
			],
			solution: `0`,
			explanation: `The Domain Name System maps domain names to the underlying IP addresses
				which are responsible for actually serving web traffic. This allows web addresses to
				be represented by a single, human-readable domain (e.g. freecodecamp.com), while behind
				the scenes freeCodeCamp servers may exist at one or more IP addresses which are mapped
				to the domain name by the DNS system when a user visits freecodecamp.com.`
	  },
		{
			title: `What service to CDNs provide?`,
			subtitle: `Understanding CDNs`,
			choices: [
				`A CDN (content delivery or distribution network) is designed to provide web content
					with high availability and high performance.`,
				`A CDN makes real-time communication between web clients very efficient.`,
				`CDNs are responsible for routing web requests to destination servers.`,
				`None of these are correct.`
			],
			solution: `0`,
			explanation: `A CDN is a content delivery network primarily responsible for serving
				static web assets in a very performant manner. CDNs can reduce server traffic by handling
				specific requests and are often geographically distributed in a way to handle requests
				more efficiently. A large percentage of web traffic is served via CDNs today.`
	  },
	]
};
