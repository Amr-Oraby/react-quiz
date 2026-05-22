import Header from "./ui/Header";
import Main from "./ui/Main";
import Start from "./ui/Start";
import Error from "./ui/Error";
import Loader from "./ui/Loader";
import Question from "./ui/Question";
import NextBtn from "./ui/NextBtn";
import Results from "./ui/Results";
import Progress from "./ui/Progress";
import ResetBtn from "./ui/ResetBtn";
import Footer from "./ui/Footer";
import Timer from "./ui/Timer";
import { useQuiz } from "./context/QuizContext";

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
