'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  speed = 30,
  className,
  onComplete,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const cbRef = useRef(onComplete);
  cbRef.current = onComplete;

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(id);
        cbRef.current?.();
      } else {
        setDisplayed(text.slice(0, i));
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className} aria-label={text} role="status">
      <span aria-hidden="true">{displayed}</span>
      <span
        aria-hidden="true"
        className={done ? 'animate-blink' : ''}
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          verticalAlign: 'text-bottom',
          backgroundColor: 'currentColor',
          marginLeft: '2px',
          opacity: done ? undefined : 1,
        }}
      />
    </span>
  );
}
