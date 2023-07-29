// "question" would need to be set to API response
// "correctAnswer" would need to be set to API respnse as AI ${role}
// might not need "answers" array
export const quiz =  {
  "quizTitle": "InterviewGuru Questions",
  "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
  "nrOfQuestions": "10",
  "questions": [
    {
      "question": "How can you access the state of a component from inside of a member function?",
      "questionType": "text",
      // "questionPic": "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
      "answerSelectionType": "input",
      // "answers": [
      // //   "this.getState()",
      // //   "this.prototype.stateValue",
      // //   "this.state",
      // //   "this.values"
      // ],
      "correctAnswer": "3",
      "messageForCorrectAnswer": "Correct answer. Good job.",
      "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
      "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      // "point": "20"
    }
  ]};





// import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
// import { CREATE_VOTE } from '../utils/mutations';
// import { QUERY_MATCHUPS } from '../utils/queries';

// const Vote = () => {
//   let { id } = useParams();

//   const { loading, data } = useQuery(QUERY_MATCHUPS, {
//     variables: { _id: id },
//   });

//   const matchup = data?.matchups || [];

//   const [createVote, { error }] = useMutation(CREATE_VOTE);

//   const handleVote = async (techNum) => {
//     try {
//       await createVote({
//         variables: { _id: id, techNum: techNum },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="card bg-white card-rounded w-50">
//       <div className="card-header bg-dark text-center">
//         <h1>Here is the matchup!</h1>
//       </div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="card-body text-center mt-3">
//           <h2>
//             {matchup[0].tech1} vs. {matchup[0].tech2}
//           </h2>
//           <h3>
//             {matchup[0].tech1_votes} : {matchup[0].tech2_votes}
//           </h3>
//           <button className="btn btn-info" onClick={() => handleVote(1)}>
//             Vote for {matchup[0].tech1}
//           </button>{' '}
//           <button className="btn btn-info" onClick={() => handleVote(2)}>
//             Vote for {matchup[0].tech2}
//           </button>
//           <div className="card-footer text-center m-3">
//             <br></br>
//             <Link to="/">
//               <button className="btn btn-lg btn-danger">
//                 View all matchups
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//       {error && <div>Something went wrong...</div>}
//     </div>
//   );
// };

// export default Vote;
