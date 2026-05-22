import { useQuiz } from "../context/QuizContext";

function Question() {
    const { currQuestion, dispatch, answer } = useQuiz();
    const hasAnswer = answer !== null;
    return (
        <div >
            <h4>{currQuestion.question}</h4>
            <div className="options">
                {currQuestion.options.map((option, index) => (
                    <button
                        key={option}
                        className={`btn btn-option ${option === answer && "answer"} ${hasAnswer ? (index === currQuestion.correctOption ? "correct " : "wrong ") : ""}`}
                        disabled={hasAnswer}
                        onClick={() => dispatch({ type: "newAnswer", payload: option })}
                    >{option}
                    </button>
                ))}
            </div>
        </div >
    );
}

export default Question;
