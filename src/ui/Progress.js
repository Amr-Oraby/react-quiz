import { useQuiz } from "../context/QuizContext";

function Progress() {
    const { answer, index, numQuestions, points, totalPoints } = useQuiz();
    return (
        <div className="progress">
            <progress max={15} value={answer !== null ? index + 1 : index}></progress>
            <div className="question-points">
                <p>Question {index + 1} / {numQuestions}</p>
                <p>Question {points} / {totalPoints}</p>
            </div>
        </div>
    );
}

export default Progress;
