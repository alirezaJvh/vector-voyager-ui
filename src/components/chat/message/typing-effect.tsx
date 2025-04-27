'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
}

export function TypingEffect({ text, typingSpeed = 30 }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const [isComplete, setIsComplete] = useState(false);
  const words = useRef<string[]>([]);

  useEffect(() => {
    words.current = text.split(' ');
    setDisplayedText('');
    setCurrentIndex(0);
    // setIsComplete(false);
  }, [text]);

  // Typing effect
  useEffect(() => {
    if (currentIndex >= words.current.length) {
      //   setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + (prev ? ' ' : '') + words.current[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, typingSpeed]);

  return <>{displayedText}</>;
}
