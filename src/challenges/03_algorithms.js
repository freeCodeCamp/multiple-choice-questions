
/* HTML markup for beginning and end of code snippets */
const start = `<pre><code class='language-javascript'>`;
const end = `</code></pre>`;

/***********************************
 * Create Code Snippets
 *********************************** */

const complexityQuestion = `
${start}function findElement(array, target) {

	for (var i = 0; i < array.length; i++) {

		if (array[i] === target) {
			return array[i];
		}

	}

	return null;

}${end}`;

const memoizeSnippet = `
${start}function createSearchFunction() {

    var cache = {};

    return function(target) {

        if (target in cache) {
            return cache[target];
        }

        /* executeSearch is complex
         * and defined elsewhere */
        var result = executeSearch(target);

        cache[target] = result;

        return result;

    }

};

var searchArchives = createSearchFunction();${end}`

const recursionSnippet = `
${start}function doesNodeExist(node, target) {

    if (node.value === target) {
        return true;
    } else if (target < node.value) {

        if (node.left !== null) {
            return doesNodeExist(node.left, target);
        } else {
            return false;
        }

    } else {

        if (node.right !== null) {
            return doesNodeExist(node.right, target);
        } else {
            return false;
        }

    }

}${end}`

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
	title: `Algorithms`,
	category: `Algorithms`,
	challenges: [
		{
			title: `
				What is the time complexity of the following function? ${complexityQuestion}`,
			subtitle: `Learn Time Complexity`,
			choices: [
				`<code>O(1)</code>`,
				`<code>O(n)</code>`,
				`<code>O(n^2)</code>`,
				`<code>O(log(n))</code>`,
				`<code>O(n*log(n))</code>`
			],
			solution: `1`,
			explanation: `This function takes an array and a target element
				and searches for the element in the array. It iterates through
				the array with a for-loop, and in the worst case must visit
				every item in the array. This gives this function linear time
				complexity. That is, the time complexity will increase in a
				linear manner in relation to the size of the input. If the
				input increases by 1000, this solution may loop 1000 times
				more — there is a linear relationship between the algorithm's
				performance and the size of the input.`
		},
		{
			title: `What is the distinguishing characteristic of a \`pure function\`?`,
			subtitle: `Learn about Pure Functions`,
			choices: [
				`A pure function directly returns a result without calling any other functions.`,
				`A function is \`pure\` if it only accepts a single argument.`,
				`A pure function has no side effects and given the same arguments always returns the same result.`,
				`A pure function is a function that modifies a global variable, and does nothing else.`,
				`None of these answers are correct.`,
			],
			solution: `2`,
			explanation: `Pure functions are crucial elements of functional
				programming. In this paradigm, a pure function is conceptually similar to a
				mathematical function. It will determine a result solely based on its input
				values, and given those same input parameters again, it will return the same
				result. This property allows a pure function to exist independently of the state
				of system surrounding it. It doesn't rely on the state of outside variables
				and it also does not directly modify any variables in its outer scope. This
				property also means the function can be <i>memoized</i>, which is a common
				method of improving performance.
			`
		},
		{
			title: `What principle does the following code demonstrate? ${memoizeSnippet}`,
			subtitle: `Algorithm Design`,
			choices: [
				`Memoization`,
				`Recursion`,
				`Object Composition`,
				`Prototypal Inheritance`
			],
			solution: `0`,
			explanation: `This code demonstrates memoization. <code>createSearchFunction</code>
				returns a new function that has closure over a <code>cache</code>, which is simply
				a fast, constant-time lookup table. The function sees if a parameter
				exists in the cache as a key, if it does it returns the associated value. If not,
				it computes the value, saves the parameter and result in the cache, and then returns
				the result. In this way, if it subsequently encounters the same parameter again, it
				can quickly return the cached result and forego the expensive computation. This pattern
				is a very useful way to improve the performance of computationally expensive functions.
			`
	  },
		{
			title: `What principle does the following function illustrate? ${recursionSnippet}`,
			subtitle: `Search for a Node`,
			choices: [
				`Recursion`,
				`Dynamic Programming`,
				`Memoization`,
				`Object-Oriented Programming`,
				`Imperative Programming`
			],
			solution: `0`,
			explanation: `This demonstrates recursion, a programming technique where a function
			calls itself. Here, we are searching through a binary tree structure looking for a node.
			At each node, if we can't find the target value and that node has child nodes, we call
			the parent function again with the appropriate child node as input. This continues until
			the function finds the target node or reaches a leaf node and terminates.`
	  },
		{
			title: `A complex problem which can be broken down into repeating sub-problems can be solved by a method known as:`,
			subtitle: `Solving Complex Problems`,
			choices: [
				`Dynamic Programming`,
				`Functional Composition`,
				`Multithreaded Programming`,
				`Recursion`
			],
			solution: `0`,
			explanation: `Some complex problems can be divded into smaller, repeating sub-problems. These
				are ideal candidates for the method of dynamic programming, in which the sub-problems are
				solved and used to dynamically build up a solution to the more complex problem. This is a more
				advanced programming method but can be very useful in solving problems which otherwise would
				not be possible by brute force approaches.`
	  },
	]
};
