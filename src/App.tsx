import "./App.css";
import { useEffect, useState } from "react";
import type { Question } from "./types";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

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

  console.log("questions length:", questions.length);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentQuestion = questions[current];

  return (
    <main>
      <h1>Quiz App</h1>
      <h2>
        Question {current + 1} / {questions.length}
      </h2>
      <p>{currentQuestion.question}</p>
      <div className="choices-grid">
        {currentQuestion.choices.map((choice, index) => (
          <input
            key={index}
            type="button"
            value={choice}
            onClick={() => {
              if (index === currentQuestion.correctIndex) {
                setScore(score + 1);
                console.log("correct");
              } else {
                console.log("wrong");
              }

              setCurrent(current + 1);
            }}
          ></input>
        ))}
      </div>
      <p>Score: {score}</p>
    </main>
  );
}

export default App;
