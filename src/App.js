import { useEffect, useReducer } from "react";
import axios from "axios";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Spinner from "./components/Spinner/Spinner";
import Start from "./components/Start/Start";
import Question from "./components/Question/Question";
import Progress from "./components/Progress/Progress";
import Finish from "./components/Finish/Finish";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  time: null
};

const reducer = (state, action) => {
  const SECONDS_PER_QUESTIONS = 30;

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'startQuiz':
      const timeInSeconds = (state.questions.length * SECONDS_PER_QUESTIONS);
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds - (minutes * 60);

      return { ...state, status: 'active', time: { minutes, seconds } };
    case 'answerQuestion':
      return { ...state, answer: action.payload.index, points: state.points + action.payload.points };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return { ...initialState, questions: state.questions, points: state.points, status: 'finished', highScore: Math.max(state.highScore, state.points) }
    case 'restart':
      return { ...state, index: 0, answer: null, points: 0, status: 'ready' };
    case 'countDown':
      if (state.time.seconds === 0 && state.time.minutes === 0) {
        return { ...initialState, questions: state.questions, points: state.points, status: 'finished', highScore: Math.max(state.highScore, state.points) }
      } else if (state.time.seconds === 0) {
        return { ...state, time: { ...state.time, minutes: state.time.minutes - 1, seconds: 59 } };
      } else {
        return { ...state, time: { ...state.time, minutes: state.time.minutes, seconds: state.time.seconds - 1 } };
      }
    default:
      throw new Error('Unknown action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, highScore, time } = state;
  const numOfQuestions = questions.length;
  const totalPoints = questions?.reduce((total, current) => total += current.points, 0);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/jonasschmedtmann/ultimate-react-course/main/10-react-quiz/starter/questions.json').then(({ data }) => {
      dispatch({ type: 'dataReceived', payload: data.questions })
    }).catch((error) => {
      dispatch({ type: 'dataFailed' });
    });
  }, []);


  return (
    <div className='app vh-100 w-100 bg-info-subtle text-black d-flex flex-column align-items-center gap-3'>
      <Header />

      <Main>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <p className="py-2 px-5 rounded-pill" style={{ backgroundColor: 'skyblue' }}>⛔ Error in fetching questions </p>}
        {status === 'ready' && <Start numOfQuestions={numOfQuestions} dispatch={dispatch} />}
        {status === 'active' && <>
          <Progress numOfQuestions={numOfQuestions} index={index + (answer !== null)} points={points} totalPoints={totalPoints} />
          <Question question={questions[index]} dispatch={dispatch} answer={answer} time={time} numOfQuestions={numOfQuestions} index={index} />
        </>}
        {status === 'finished' && <Finish dispatch={dispatch} points={points} totalPoints={totalPoints} highScore={highScore} />}

      </Main>
    </div>
  );
}

export default App;
