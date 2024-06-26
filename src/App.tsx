import { useState, useRef, useEffect } from "react";
import { Button } from "./components/ui/button";

const colors = ["pink", "blue", "green", "yellow", "red", "white"] as const;

type Color = (typeof colors)[number];

const colorsClasses = {
  pink: "bg-pink-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  white: "bg-white",
} satisfies Record<Color, string>;

const pickRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const ColorCell = ({ color, isLast }: { color: Color; isLast: boolean }) => (
  <div
    className={`${colorsClasses[color]} ${isLast ? "animate-grow-in-out" : ""} relative rounded-sm  p-3 text-center text-black`}
  />
);

export default function App() {
  const [colors, setColors] = useState<{ id: number; color: Color }[]>([]);
  const colorsRef = useRef<HTMLDivElement>(null);

  const handleReset = () => setColors([]);

  const handleClick = () => {
    setColors((prev) => [
      ...prev,
      { id: prev.length + 1, color: pickRandomColor() },
    ]);
  };

  useEffect(() => {
    if (colorsRef.current && colors.length > 0) {
      colorsRef.current?.scrollTo({
        top: colorsRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [colors]);

  return (
    <main className="min-h-dvh bg-gradient-to-tr from-slate-900 to-slate-800 text-slate-100">
      <div className="h-[calc(100dvh-6rem)]">
        <div
          ref={colorsRef}
          className="mx-auto grid max-h-[calc(100dvh-6rem)] max-w-xl grid-cols-[repeat(auto-fill,minmax(90px,1fr))]  gap-4 overflow-y-scroll p-4"
        >
          {colors.map((color, index) => (
            <ColorCell
              key={color.id}
              color={color.color}
              isLast={index === colors.length - 1}
            />
          ))}
        </div>
      </div>
      <footer className="relative mx-auto flex max-w-xl items-baseline justify-center p-4">
        <div className="absolute left-[1rem] top-[50%] translate-y-[-50%]">
          <Button
            className="size-[2.25rem] rounded-full bg-red-500 p-1 text-xs italic text-slate-900 hover:bg-red-400"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
        <div>
          <Button
            onClick={handleClick}
            className="rounded-full bg-slate-600 text-lg hover:bg-slate-500"
          >
            Get a color
          </Button>
        </div>
        <div className="absolute right-[1rem] top-[50%] translate-y-[-50%]">
          <span className="block min-w-[3.6rem] py-[0.6rem] text-end font-mono text-xs italic text-yellow-400">
            {colors.length} {colors.length === 1 ? "turn" : "turns"}
          </span>
        </div>
      </footer>
    </main>
  );
}
