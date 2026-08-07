import { useState, useEffect } from "react";

/**
 * useTypewriter
 * Cycles through an array of strings with a typing / deleting animation.
 *
 * @param {string[]} words - strings to cycle through
 * @param {object} options
 * @param {number} options.typingSpeed - ms per character while typing
 * @param {number} options.deletingSpeed - ms per character while deleting
 * @param {number} options.pauseTime - ms to hold the full word before deleting
 * @returns {string} the currently displayed text
 */
export function useTypewriter(
  words = [],
  { typingSpeed = 70, deletingSpeed = 40, pauseTime = 1500 } = {}
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIndex % words.length];

    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      const next = isDeleting
        ? current.substring(0, text.length - 1)
        : current.substring(0, text.length + 1);
      timeout = setTimeout(
        () => setText(next),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}