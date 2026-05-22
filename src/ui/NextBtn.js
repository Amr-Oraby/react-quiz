import { useQuiz } from "../context/QuizContext";

function NextBtn() {
    const { answer, dispatch, index, numQuestions } = useQuiz();
    return (
        <>
            {
                (answer) && <button className="btn btn-ui" onClick={() => dispatch({ type: index === numQuestions - 1 ? "finish" : "next" })}>
                    {index === numQuestions - 1 ? "Finsih" : "Next"}
                </button>
            }
        </>
    );
}

export default NextBtn;
