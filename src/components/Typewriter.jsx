import React, { useEffect, useState } from "react";

export default function Typewriter({ words, typingSpeed = 20, deletingSpeed = 0, pauseTime = 1200 }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && charIndex < words[index].length) {
      // typing forward
      setIsPaused(false);
      timeout = setTimeout(() => {
        setText((prev) => prev + words[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      // deleting backward
      setIsPaused(false);
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (!isDeleting && charIndex === words[index].length) {
      // finished typing a word → pause before deleting
      setIsPaused(true);
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex === 0) {
      // finished deleting → go to next word
      setIsPaused(false);
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="whitespace-pre-line">
      {text}
      <span className={isPaused ? "ml-1 animate-pulse" : "ml-1"}>|</span>
    </span>
  );
}
