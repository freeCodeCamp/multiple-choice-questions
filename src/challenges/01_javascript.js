
/***********************************
 * Create Code Snippets
 *********************************** */



/***********************************
 * Export Challenge Array
 *********************************** */

export default {
	title: "JavaScript Quiz",
	category: "JavaScript",
	challenges: [
		{
			title: "Is JavaScript single-threaded or multi-threaded?",
			choices: [
				"JavaScript is single-threaded.",
				"JavaScript is multi-threaded.",
				"Threading only applies in staticly typed languages.",
				"Threading only applies to compiled languages."
			],
			solution: "0",
			explanation: "JavaScript runs on a single thread."
		},
		{
			title: "Which of the following is a feature provided by ES6 arrow functions?",
			choices: [
				"They allow for functional composition.",
				"They are prone to fewer memory leaks.",
				"Arrow functions implicitly bind <code>this</code> to the context where the function is written.",
				"The only advantage is shorter syntax."
			],
			solution: "2",
			explanation: ""
		},
		{
			title: "The use of <code>const</code> prevents the modification of arrays and objects.",
			choices: [
				"True, these are now constant values.",
				"False, they are only references. The actual values in the array of object can still be mutated."
			],
			solution: "1",
			explanation: ""
		}
	]
};
