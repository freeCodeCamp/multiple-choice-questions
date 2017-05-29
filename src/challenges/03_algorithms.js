
const complexityQuestion = `<pre>
function(array, target) { <br>
	for (var i = 0; i < array.length; i++) { <br>
		if (array[i] === target) { <br>
			return array[i]; <br>
		} <br>
	} <br>
	return null; <br>
}</pre>`;

export default {
	title: "Algorithms",
	category: "Algorithms",
	challenges: [
		{
			title: `
				What is the time complexity of the following algorithm? ${complexityQuestion}`,
			choices: [
				"<code>O(1)</code>",
				"<code>O(n)</code>",
				"<code>O(n^2)</code>",
				"<code>O(log(n))</code>",
				"<code>O(n*log(n))</code>"
			],
			solution: "1",
			explanation: ""
		}
	]
};
