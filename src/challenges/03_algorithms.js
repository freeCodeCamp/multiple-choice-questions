
/***********************************
 * Create Code Snippets
 *********************************** */

const complexityQuestion = `<pre>
function findElement(array, target) { <br>
	for (var i = 0; i < array.length; i++) { <br>
		if (array[i] === target) { <br>
			return array[i]; <br>
		} <br>
	} <br>
	return null; <br>
}</pre>`;

/***********************************
 * Export Challenge Array
 *********************************** */

export default {
	title: "Algorithms",
	category: "Algorithms",
	challenges: [
		{
			title: `
				What is the time complexity of the following function? ${complexityQuestion}`,
			choices: [
				"<code>O(1)</code>",
				"<code>O(n)</code>",
				"<code>O(n^2)</code>",
				"<code>O(log(n))</code>",
				"<code>O(n*log(n))</code>"
			],
			solution: "1",
			explanation: `This function takes an array and a target element
				and searches for the element in the array. It iterates through
				the array with a for-loop, and in the worst case must visit
				every item in the array. This gives this function linear time
				complexity. That is, the time complexity will increase in a
				linear manner in relation to the size of the input.`
		}
	]
};
