import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 10;

type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type Status = "loading" | "ready" | "active" | "finish" | "error";

type State = {
  questions: Question[];
  status: Status;
  index: number;
  answer: string | null;
  points: number;
  highscore: number;
  tick: number;
};

type Action =
  | { type: "ready"; payload: Question[] }
  | { type: "error" }
  | { type: "active" }
  | { type: "newAnswer"; payload: string }
  | { type: "next" }
  | { type: "finish" }
  | { type: "reset" }
  | { type: "tick" };

const initialValues: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  tick: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ready":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        tick: state.questions?.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.options.at(question?.correctOption)
            ? state.points + question?.points
            : state.points,
      };
    }
    case "next":
      return { ...state, answer: null, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialValues,
        questions: state.questions, // no api feching
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        tick: state.tick - 1,
        status: state.tick === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("UnKnown");
  }
}

type ContextType = {
  questions: Question[];
  status: string;
  index: number;
  answer: string | null;
  points: number;
  highscore: number;
  tick: number;
  numQuestions: number;
  currQuestion: Question | undefined;
  totalPoints: number;
  dispatch: React.Dispatch<Action>;
};

// const QuizContext = createContext<ContextType | null>(null);
const QuizContext = createContext<ContextType>({} as ContextType);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    { questions, status, index, answer, points, highscore, tick },
    dispatch,
  ] = useReducer(reducer, initialValues);
  useEffect(() => {
    async function getQuestions() {
      const res = await fetch("http://localhost:8000/questions");
      const data: Question[] = await res.json();
      dispatch({ type: "ready", payload: data });
    }
    getQuestions();
  }, []);

  const numQuestions = questions.length;
  const currQuestion = questions.at(index);
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        tick,
        numQuestions,
        currQuestion,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used inside QuizProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useQuiz, QuizProvider };
