import { useQuiz } from "../context/QuizContext";

function ResetBtn() {
    const { dispatch } = useQuiz();
    return (
        <button className="btn btn-ui"
            onClick={() => dispatch({ type: "reset" })}
        >
            Reset
        </button>
    );
}

export default ResetBtn;
