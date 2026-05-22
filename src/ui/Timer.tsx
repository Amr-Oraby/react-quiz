import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
    const { tick, dispatch } = useQuiz();
    const mins = Math.floor(tick / 60);
    const secs = Math.floor(tick % 60);
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: "tick" });
        }, (1000));
        if (tick < 0) clearInterval(id);
        return () => clearInterval(id);
    }, [tick, dispatch]);
    return (
        <div className="timer">
            {mins < 10 && "0"}{mins}:{secs < 10 && "0"}{secs}
        </div>
    );
}

export default Timer;
