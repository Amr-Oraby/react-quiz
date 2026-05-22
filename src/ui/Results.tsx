import { useQuiz } from "../context/QuizContext";

function Results() {
    const { points, totalPoints, highscore } = useQuiz();
    const percentage = Math.round((points / totalPoints) * 100);
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
    return (
        <>
            <p className="result"><span>{emoji}</span> you scored {points} of {totalPoints} ({percentage}%)</p>
            <p className="highscore">(Highscore: {highscore} points)</p>
        </>
    );
}

export default Results;
