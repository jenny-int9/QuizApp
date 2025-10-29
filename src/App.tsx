import "./App.css";
import { useEffect, useState } from "react";
import type { Question } from "./types";
import QuestionCard from "./components/QuestionCard";
import EndScreen from "./components/EndScreen";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[current];
  const isFinished = current >= questions.length;

  useEffect(() => {
    fetch("/quiz.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch(() => {
        setError("Could not load the Quiz...");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (isFinished) {
    return (
      <main>
        <EndScreen
          score={score}
          total={questions.length}
          onRestart={() => {
            setCurrent(0);
            setScore(0);
          }}
        />
      </main>
    );
  }

  return (
    <main>
      <h1>Quiz App</h1>
      <QuestionCard
        question={currentQuestion}
        index={current}
        total={questions.length}
        onSelect={(choiceIndex) => {
          if (choiceIndex === currentQuestion.correctIndex) {
            setScore((prev) => prev + 1);
          }
          setCurrent((prev) => prev + 1);
        }}
      />
    </main>
  );
}

export default App;
