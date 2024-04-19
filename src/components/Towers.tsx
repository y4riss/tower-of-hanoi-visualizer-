import { useEffect, useState } from "react";
import { TOTAL_WIDTH, TowerProps } from "../types/types";
import generateColors from "../utils/generateColors";
import solver from "../utils/solver";

const Tower = ({ width, color }: TowerProps) => {
  return (
    <div
      style={{
        width: `${width}%`,
        height: "50px",
        backgroundColor: color,
        display: "inline-block",
      }}
      className="rounded"
    ></div>
  );
};

const Towers = ({ quantity }: { quantity: number }) => {
  const [towers, setTowers] = useState<Array<Array<TowerProps>>>([[], [], []]);

  useEffect(() => {
    if (quantity) {
      const newTowers = [
        Array.from({ length: quantity }, (_, i) => {
          return {
            id: i,
            width: ((i + 1) / quantity) * TOTAL_WIDTH,
            color: generateColors(),
          };
        }),
        [],
        [],
      ];
      setTowers(newTowers);
      const moves = solver(quantity);
      const timeoutId = setTimeout(() => {
        moves.forEach(([src, dest], index) => {
          const t = setTimeout(() => {
            const towersCopy = [...newTowers];
            const tower = newTowers[src - 1][0];
            towersCopy[src - 1].shift();
            towersCopy[dest - 1].unshift(tower);
            console.log(towersCopy);
            setTowers(towersCopy);
          }, 500 * index);
        });
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [quantity]);
  return (
    <div className="grid grid-cols-3 gap-4 mt-8 h-[300px]">
      {towers.map((tower, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-end border-black border-b-8`}
          //   style={{
          //     background: index === 0 ? "red" : index === 1 ? "green" : "blue",
          //   }}
        >
          {tower.map((props, i) => (
            <Tower key={i} {...props} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Towers;
