type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

export default function EndScreen({ score, total, onRestart }: Props) {
  return (
    <section id="end-screen">
      <h1>Quiz App</h1>
      <p aria-live="polite">
        Score: {score} / {total}
      </p>
      <button onClick={onRestart}>Restart</button>
    </section>
  );
}
