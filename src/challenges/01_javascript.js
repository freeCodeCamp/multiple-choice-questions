import {wrapSnippit} from '../utils/helpers';

/* HTML markup for beginning and end of code snippets */

/***********************************
* Challenge Seed Templates
***********************************

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
	title: `JavaScript Quiz`,
	category: `JavaScript`,
	challenges: [
    {
    	title: `Which of the following statements is true of JavaScript?`,
    	subtitle: `JavaScript Programming Styles`,
    	choices: [
    		`JavaScript supports object-oriented programming`,
    		`JavaScript supports functional programming`,
    		`JavaScript supports imperative programming`,
    		`All of these choices are correct`
    	],
    	solution: `3`,
    	explanation: `
        As a prototype-based language, with first-class functions, JavaScript is a mult-paradigm
        language which supports object-oriented, imperative, and functional programming styles.`
    },
    {
    	title: `What will the following code log to the console? ${wrapSnippit(`
console.log(false == 0);
console.log(false === 0);
      `)}`,
    	subtitle: `Equality in JavaScript 2`,
    	choices: wrapSnippit(
        `true\ntrue`,
        `true\nfalse`,
        `false\ntrue`,
        `false\nfalse`
      ),
    	solution: `1`,
    	explanation: `
        The first expression will evaluate to <code>true</code> since the <code>==</code> operator
        performs a non-strict comparison, meaning that if the 2 values are not of the same type,
        JavaScript will attempt to coerce the values into comparable types. In this case, JavaScript
        will coerce <code>0</code> into to a boolean, and since <code>0</code> is falsy in JavaScript,
        it will coerce to <code>false</code>.<br /><br />

        The <code>===</code> operator, on the other hand, represents strict equality, meaning that
        no type coercion will take place. To evaluate to <code>true</code>, the values on either side
        of this symbol must be of the same type and value. This means that the second expression evaluates
        to <code>false</code> &mdash; since <code>false</code> and <code>0</code> are not of the same type,
        no further comparison is necessary.<br /><br />

        Note that these principles hold true for JavaScript's inequality operators as well, non-strict:
        <code>!=</code>, strict: <code>!==</code>.`
    },
    {
    	title: `Which of the following choices will empty the array <code>foo</code> as well
              as all references to <code>foo</code> (such as <code>bar</code>)? ${wrapSnippit(`
var foo =  [1, 2, 3, 4, 5, 6, 7];
var bar = foo;
      `)}`,
    	subtitle: `Emptying an array`,
    	choices: wrapSnippit(
        `foo.splice(0, foo.length);`,
        `foo.slice(0, foo.length);`,
        `foo = [];`,
        `foo.empty();`
      ),
    	solution: `0`,
    	explanation: `
        JavaScript's native <code>splice</code> method modifies a referenced array in place by removing
        and (optionally) adding elements. <code>splice</code>'s first parameter indicates the index at
        which to begin removing elements, the second indicates how many elements to remove, while the
        third can be any number of elements to add to the array in their place. So by invoking <code>
        splice</code> with <code>0</code> and <code>Array.length</code>, and by omitting the 3rd,
        parameter we can reliably empty an array of any length. Another method of emptying an array
        that works just as well, is to explicitly set the length of the array to <code>0</code>, i.e.
        <code>foo.length = 0;</code>.<br /><br />

        The <code>foo = [];</code> method would not truly empty the array. Instead, it would have only
        reassigned the variable <code>foo</code> to a new array object. The original array that <code>
        foo</code> used to point to would still exist in memory, and any other references to that array,
        such as <code>bar</code> in this case, would be unaffected.<br /><br />

        <code>slice</code> is better suited to copying arrays, and is not appropriate for this use case.
        <code>Array.empty()</code> is not a native JavaScript method, so this solution would fail.`
    },
		{
			title: `What will the following code log to the console? ${wrapSnippit(`
var x;
console.log(x);
      `)}`,
			subtitle: `not defined vs. undefined`,
			choices: wrapSnippit(
        'ReferenceError: x is not defined',
        'undefined',
        'TypeError: x is not defined',
        'ReferenceError: x is undefined'
      ),
			solution: `1`,
			explanation: `
				<code>undefined</code> refers to a variable that has been declared but not yet assigned
				a value. <code>not defined</code> is a <code>ReferenceError</code>, thrown when a variable
				is encountered that has not yet been declared.<br /><br />

				If you were to comment out the first line <code>var x;</code> and run the code
				again, <code>ReferenceError: x is not defined</code> would be thrown. `
		},
		{
			title: `This code does not work correctly, it simply prints five <code>5</code>s to the console.
							How can we use ES6 to fix this problem so that the code works as expected? ${wrapSnippit(`
for (var i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i) }, i * 1000 );
}
      `)}`,
			subtitle: `Understanding block scoping with let`,
			choices: [
				`By replacing the <code>var</code> keyword with <code>let</code>`,
				`By replacing the <code>var</code> keyword with <code>const</code>`,
				`By replacing the <code>function</code> keyword with <code>=></code> syntax`,
				`None of these answers are correct`
			],
			solution: `0`,
			explanation: `
				The major advantages of the <code>let</code> keyword introduced in the ECMAScript 2015
				specification is the ability to "block scope" a variable to a specific block, statement,
				or expression. This is unlike the <code>var</code> keyword which creates a variable that
				is scoped globally to the context it is defined in &mdash; either a function or the global
				scope. In the case of this code, replacing <code>var</code> with <code>let</code> block
				scopes <code>let</code> to the <code>for</code> loop, so that each iteration refers to a
				new instance of the variable <code>i</code>, and 0-4 is printed to the console as expected.
				<br /><br />

				Prior to ES6, the best solution for this problem was to create a local scope around or within
				the <code>setTimeout</code> function and passing in the value of <code>i</code> during each
				iteration of the loop. For example, by wrapping <code>setTimeout</code> in an IIFE and invoking
				it with <code>i</code>.`
		},
		{
			title: `What will the following code print to the console? ${wrapSnippit(`
var foo = "Hello World";
var bar = foo.split('');
var baz = bar;
baz.reverse();

console.log(bar.join(''));
      `)}`,
			subtitle: `Understanding Object References`,
			choices: wrapSnippit(
        `dlroW olleH`,
        `[ 'd', 'l', 'r', 'o', 'W', ' ', 'o', 'l', 'l', 'e', 'H' ]`,
        `[ 'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd' ]`,
        `Hello World`
      ),
			solution: `0`,
			explanation: `
				You may have expected this code to print <code>Hello World</code>
				to the console. However, when we define <code>baz</code>, we are not
				creating a new array. Rather, we are simply creating a reference to
				the array that was created during the assignment of <code>bar</code>
				(in fact, both variables are just references to the same object, which
				is stored in memory behind the scenes). Since <code>baz</code> is just
				a reference to <code>bar</code>, and not its own array, any operation
				that is performed on it, is also performed on the original array. So,
				when we join <code>bar</code> back into a string, the result is a mirror
				image of what you might have expected! And, of course, the same result
				that we would have gotten from <code>console.log(baz.join(' '));</code>.`
		},
		{
			title: `What will the following code output to the console? ${wrapSnippit(`
(function foo(a) {
  return function bar(b) {
    console.log(a);
  };
})('super')('cool');
      `)}`,
			subtitle: `Understanding Scope & Closure`,
			choices: wrapSnippit(
        `super`,
        `cool`,
        `undefined`,
        `null`
      ),
			solution: `0`,
			explanation: `
				This code logs <code>super</code> to the console even though <code>a</code> is
				never defined in the inner function <code>bar</code>, becuase <code>bar</code>
				has closure over the outer function <code>foo</code>.<br /><br />

				When a function is defined inside of another function, it is said to have "closure"
				over that function, meaning that it has access to the variables defined in the
				outer function's scope. When execution reaches the <code>console.log()</code>
				statement, JavaScript searches <code>bar</code>'s scope for a variable called
				<code>a</code>. When it does not find one, it then searches the scope "bubble"
				that is the next level up, in this case, the scope created by <code>foo</code>.
				If <code>a</code> was <em>not</em> defined in <code>foo</code>, the search would
				continue, moving up to the next scope. If the outer-most, or global scope is reached
				and a variable is still not found, JavaScript will throw a <code>ReferenceError</code>.
				<br /><br />

				If the way that these functions are called tripped you up, here's the explanation:
				<code>foo</code> is an immediately invoked function expression (or IIFE), invoked
				by the parentheses that contain <code>'super'</code>. This expression resolves
				before anything else occurs, and since it resolves to the function <code>bar</code>,
				the second set of parentheses are simply invoking that function, and thus the
				<code>console.log()</code> statement is executed.`
		},
		{
			title: `When executed in a browser's console, what will the following code output? ${wrapSnippit(`
var foo = {
  baz: 'Hello',
  bar: () => {
    console.log(this);
    return this.baz;
  }
};

console.log(foo.bar());
      `)}`,
  		subtitle: `Arrow Functions as Object Methods`,
  		choices: wrapSnippit(
        `{ baz: 'Hello', bar: [Function: bar] }\nHello`,
        `{ baz: 'Hello', bar: [Function: bar] }\nHello`,
        `Window {...}\nHello`,
        `{ baz: 'Hello', bar: [Function: bar] }\nundefined`,
        `Window {...}\nundefined`
      ),
  		solution: `3`,
  		explanation: `
  			You might have expected this code to log the <code>foo</code> object along
  			with <code>Hello</code> to the console, however, arrow function expressions
  			are not ideally suited for method functions. Here's why: arrow functions do
  			not create their own <code>this</code> context, nor do they care how the
  		  function is called; rather, they inherit their <code>this</code> value from
  			the enclosing scope. So in this case, <code>this</code> still refers to the
  			global context, in which <code>baz</code> is not defined. Had <code>bar</code>
        been written with the <code>function</code> keyword, this code <em>would</em>
        have worked as expected, since typically, when a function is invoked with
        method invokation, <code>this</code> will always refer to the context,
        or object, that the function was written in.
  			<br /><br />

  			Note that in different environments, the global <code>this</code> value can
  			reference different things. Running this code in a browser's console, as in
  			this example, <code>this</code> will always refer to the global <code>Window
  			</code> object. If we ran this same code in a Node environment, however, the
  			<code>this</code> value would simply be an empty global object: <code>{}</code>.
  			<br /><br />

  			In general, there's no other reason why arrow functions are not an appropriate
  			choice for object methods. So if you use them in this way, just be careful with
  			<code>this</code>!`
		},
		{
			title: `What will the following code output to the console? ${wrapSnippit(`
console.log(1 + -"1" + "2" + "2");
console.log("2" + "2" + 1 + -"1");
      `)}`,
			subtitle: `Learn Coercion`,
			choices: wrapSnippit(
        `4\n4`,
        `022\n221-1`,
        `04\n220`,
        `022\n220`
      ),
			solution: `1`,
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
			title: `Is JavaScript single-threaded or multi-threaded?`,
			subtitle: `Threading`,
			choices: [
				`JavaScript is single-threaded.`,
				`JavaScript is multi-threaded.`,
				`Threading only applies in staticly typed languages.`,
				`Threading only applies to compiled languages.`
			],
			solution: `0`,
			explanation: `Unlike some other programming languages which have multi-threaded capabilities,
        JavaScript execution is single-threaded (at a high level). When running in a browser,
        JavaScript runs on a single event-loop. However, the browser implementation of the JavaScript
        engine may incorporate multi-threading in order to actually process execution. Despite this, the
        JavaScript programmer doesn't have the ability to actual write JavaScript in a multi-threaded
        way, with the exception of Web Workers.`
		},
		{
			title: `Which of the following is a feature provided by ES6 arrow functions?`,
			subtitle: `ES6 Arrow Functions`,
			choices: [
				`They allow for functional composition.`,
				`They are prone to fewer memory leaks.`,
				`They "inherit" <code>this</code> from the enclosing lexical context, regardless of how the function is called.`,
				`The only advantage is shorter syntax.`
			],
			solution: `2`,
			explanation: `ES6 arrow functions take <code>this</code> from the context where they are written
        and implicitly bind it to the function. Now, regardless of where that function is called it will
        retain the original <code>this</code> value. The same result could be accomplished by explicitly
        binding this (e.g. <code>.bind(this)</code>) to the function in the context you want to bind
        <code>this</code>. Otherwise, for non-arrow functions, <code>this</code> will be defined by
        the context in which a function is called.`
		},
		{
			title: `The use of <code>const</code> prevents the modification of arrays and objects.`,
			subtitle: `Constant Values`,
			choices: [
				`True, these are now constant values.`,
				`False, they are only references. The actual values in the array or object can still be mutated.`
			],
			solution: `1`,
			explanation: `The use of <code>const</code> prevents a value from being reassigned. Arrays and objects, however,
        can be modified without being reassigned. If you have a <code>const</code> object <code>dictionary</code>
        and you write <code>dictionary[freecodecamp] = true</code> this code will run without error. However,
        if you were to try to reassign this constant value by writing <code>dictionary = 5</code>, this would
        throw an error: <code>Uncaught TypeError: Assignment to constant variable</code>. This is an important
        aspect to keep in mind when working with constant values in JavaScript.`
		},
    {
    	title: `What is the difference between <code>==</code> and <code>===</code> in JavaScript?`,
    	subtitle: `Equality in JavaScript`,
    	choices: [
    		`<code>==</code> represent abstract equality and allows type coercion, whereas
          <code>===</code> uses strict equality and will not coerce its arguments.`,
    		`These operators are interchangeable and both test for equality.`,
    		`<code>===</code> can be used to test deep equality of arrays and objects, whereas
          <code>==</code> cannot.`,
    		`None of these are correct.`
    	],
    	solution: `0`,
    	explanation: `The difference between these two equality operators is that the first allows
        type coercion and the second does not. Because JavaScript is a loosely typed language,
        the abstract equality operator can establish equality between dissimilar types. For instance,
        <code>"2" == 2</code> evaluates to <code>true</code>, however, this would fail under a check
        of strict equality. Generally, strict equality is safer and preferred, but it's good to
        understand the difference between these two equality operators.`
    },
	]
};
