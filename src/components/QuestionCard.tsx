import type { Question } from "../types";

type Props = {
  question: Question;
  index: number;
  total: number;
  onSelect: (choiceIndex: number) => void;
};

export default function QuestionCard({ question, index, total, onSelect }: Props) {
  return (
    <section id="question-card">
      <h2 aria-live="polite">
        Question {index + 1} / {total}
      </h2>
      <p>{question.question}</p>

      <div className="choices-grid">
        {question.choices.map((choice, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              onSelect(i);
            }}
          >
            {choice}
          </button>
        ))}
      </div>
    </section>
  );
}
