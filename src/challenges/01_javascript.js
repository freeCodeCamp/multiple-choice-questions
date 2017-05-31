
/***********************************
 * Create Code Snippets
 *********************************** */

const coercionQuestion = [
`<pre>
console.log(1 + -"1" + "2" + "2");
console.log("2" + "2" + 1 + -"1");
</pre>`,
`<pre>
4
4
</pre>`,
`<pre>
"022"
"022-1"
</pre>`,
`<pre>
"04"
"220"
</pre>`,
`<pre>
"022"
"220"
</pre>`
];

/***********************************
* Challenge Seed Template
*********************************** */

/*
 {
  title: "",
	short: "",
  choices: [
 	 "",
 	 "",
 	 "",
 	 ""
  ],
  solution: "",
  explanation: ""
 },
*/

/***********************************
* Export Challenge Array
*********************************** */

export default {
	title: "JavaScript Quiz",
	category: "JavaScript",
	challenges: [
		{
		 title: `What will the following code output to the console? ${coercionQuestion[0]}`,
		 short: `Learn Coercion`,
		 choices: [
			`${coercionQuestion[1]}`,
			`${coercionQuestion[2]}`,
			`${coercionQuestion[3]}`,
			`${coercionQuestion[4]}`
		 ],
		 solution: "1",
		 explanation: `
		 	 What makes this code a bit tricky is the fact that JavaScript is a "weakly" or "loosely"
		 	 typed language. This means that, in part, JavaScript will allow operations to be performed
			 on values that are not of the same data types, and as a result, it will "coerce" values that
			 are not of the same type in order to accomodate the operation. This has a significant impact
			 on the above code snippets. Let's look at each example in turn.<br><br>

			 Ex: <code>console.log(1 + -"1" + "2" - "2");</code><br>
			 In JavaScript, the negation symbol, e.g. <code>-x</code>, is treated as a unary operator, and,
			 according to order of operations precedence, is evaluated before the four standard mathematical
			 operators (<code>+</code>, <code>-</code>, <code>/</code>, <code>*</code>). Thus in this snippet,
			 the first operation performed is the negation of <code>"1"</code>. Since this value is a string,
			 to accomodate this operation, <code>"1"</code> is converted to a number. From here, the expression
			 is evaluated from left to right, since all other operators are treated equally in precedence. First
			 <code>1</code> is added to <code>-1</code>, resulting in <code>0</code>, followed by <code>0  + "2"
			 </code>. However, since one of these two values is a string, the remaining value is coerced into a
			 string, and concatenation is performed rather than addition. Now we are left with <code>"02" + "2"
		 	 </code>, a simple string concatenation with no coersion necessary, giving us the final result of
			 <code>"022"</code><br><br>

			 Ex: <code>console.log("2" + "2" + 1 + -"1");</code><br>
			 This example is nearly identical. However, even though <code>"1"</code> is coerced into a number
			 before any other operations are performed, <code>-1</code> is then coerced back into a string since
			 it is a part of the final evaluation: <code>"2" + "2"</code> results in <code>"22"</code>,
			 <code>"22" + 1</code> results in <code>"221"</code>, and <code>"221" + -1</code> gives us
			 <code>"221-1"</code>.`
		},
		{
			title: "Is JavaScript single-threaded or multi-threaded?",
			short: `Threading`,
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
			short: `ES6 Arrow Functions`,
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
			short: `Constant Values`,
			choices: [
				"True, these are now constant values.",
				"False, they are only references. The actual values in the array of object can still be mutated."
			],
			solution: "1",
			explanation: ""
		}
	]
};
