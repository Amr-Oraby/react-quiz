import Header from "./Header";
import Main from "./Main";
import Start from "./Start";
import Error from "./Error";
import Loader from "./Loader";
import Question from "./Question";
import NextBtn from "./NextBtn";
import Results from "./Results";
import Progress from "./Progress";
import ResetBtn from "./ResetBtn";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../context/QuizContext";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        <>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <Start />}
          {status === "active" && (
            <>
              <Progress />
              <Question />
              <NextBtn />
              <Footer>
                <Timer />
              </Footer>
            </>
          )}
          {status === "finish" && (
            <>
              <Results />
              <ResetBtn />
            </>
          )}
        </>
      </Main>
    </div>
  );
}

export default App;
