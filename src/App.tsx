import { useState } from "react";
import Towers from "./components/Towers";

const App = () => {
  const [towers, setTowers] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!towers) {
      return;
    }
  };
  return (
    <div>
      <p>Number of towers : </p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTowers(parseInt(e.target.value))}
          value={towers}
          type="number"
          className="border"
        />
      </form>
      {towers && <Towers quantity={towers} />}
    </div>
  );
};

export default App;
