
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
	title: `System Design`,
	category: `System Design`,
	challenges: [
		{
			title: `A system designed with several different services that are all isolated and managed independently is referred to as`,
			subtitle: `Architecture Design`,
			choices: [
				`A microservices architecture.`,
				`A monolithic architecture.`,
				`A dynamic architecture.`,
				`A component architecture.`
			],
			solution: `0`,
			explanation: `Microservices are commonly contrasted with the so-called monolithic
				architecture. In the former, different tasks or services are broken up into
				independent, isolated services, all of which interact with each other. In the other
				approach, everything involved in an application is consolidated into one architecture.
				Both approaches have their own advantages and disadvantages.`
		},
		{
			title: `What problem does a load balancer solve?`,
			subtitle: `Understanding Load Balancing`,
			choices: [
				`Load balancers can distribute incoming traffic to one of many servers, allowing one
					to scale a server architecture to support a high volume of traffic.`,
				`If traffic reaches a certain level load balancers will start throttling traffic to
					prevent servers from crashing.`,
				`A load balancer determines how to route requests between clients and servers.`,
				`None of these are correct.`
			],
			solution: `0`,
			explanation: `Load balancers optimize resource use by distributing requests
				or traffic evenly among many computers. This is commonly used in serving
				web traffic to a number of servers after the point where a single server
				is unable to handle the amount of incoming traffic. The load balancer acts
				as an intermediary which distributes incoming requests to one of many servers,
				and in this way is an important scaleability tool.`
	  },
		{
			title: `When scaling a server architecture, it is important to use redundancy to
				protect against: `,
			subtitle: `Scaling Server Architecture`,
			choices: [
				`Single points of failture`,
				`System fragility`,
				`Security exploits`,
				`Network vulnerabilities`
			],
			solution: `0`,
			explanation: `Introducing a load balancer, for instance, creates a single point
				that, if compromised, could compromise the entire system. Because of this, it
				is important to use redundancy to guard against these single points of failure.
				Now, if one of these components fails the backup system could be transitioned
				in through a process known as "failover".`
		},
		{
			title: `Caching is an important method to improve web application performance. Which of the
				following are popular caching technologies that exist at the server/database interface?`,
			subtitle: `Caching Server Resources`,
			choices: [
				`Redis and Memcached`,
				`Elasticsearch`,
				`Kubernetes`,
				`Docker`,
				`CDNs`
			],
			solution: `0`,
			explanation: `Redis and Memcached are two of the most common caching solutions for
				database queries. They are key-value pair in-memory datastores that allow you to
				cache the results of database queries to prevent subsequent requests from performing
				the same database query again. The use of these technologies can often offer sizable
				performance improvements to database heavy web applications.`
		},
		{
			title: `What is continuous integration?`,
			subtitle: `Understanding Continuous Integration`,
			choices: [
				`Continuous integration is a software development practice that involves frequent incorporation
					of code changes to a shared repository, and usually involves an automated build and testing process.`,
				`Continuous integration is a process where tests are written for a project and all subsequent code is
					written in order to pass the tests.`,
				`Continuous integration is the agile methodology practice of deploying production code frequently,
					usually at least once per sprint.`,
				`None of these are correct.`
			],
			solution: `0`,
			explanation: `Continuous integration (CI) is the practice of frequently integrating local code
				changes with a shared code repository. The main idea is to speed up the development/release
				lifecycle and improve the ability of developers to identify and address bugs. CI is often
				associated with an automated build and testing process, which additionally helps to catch
				bugs quickly and earlier.`
			},
	]
};
