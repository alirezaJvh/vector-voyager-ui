'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
}

export function TypingEffect({ text, typingSpeed = 30 }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = useRef<string[]>([]);

  useEffect(() => {
    words.current = text?.split(' ') || [];
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex >= words.current.length) {
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + (prev ? ' ' : '') + words.current[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, typingSpeed]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
}
