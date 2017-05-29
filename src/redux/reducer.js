import quizzes from '../challenges';

/* We're just using Redux to store all the quizzes in a globally availabe
 * way that we can easily connect to our components on demand */

export default (state = { quizzes }, action) => state
