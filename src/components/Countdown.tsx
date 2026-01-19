"use client";

import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-10-10T12:00:00");

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = differenceInSeconds(TARGET_DATE, now);

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (3600 * 24));
      const hours = Math.floor((diff % (3600 * 24)) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center gap-6 md:gap-16 font-serif text-eucalyptus-800">
      <TimeBlock value={timeLeft.days} label="Días" />
      <div className="text-2xl md:text-5xl font-light -mt-8 text-eucalyptus-300">:</div>
      <TimeBlock value={timeLeft.hours} label="Horas" />
      <div className="text-2xl md:text-5xl font-light -mt-8 text-eucalyptus-300">:</div>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <div className="text-2xl md:text-5xl font-light -mt-8 text-eucalyptus-300">:</div>
      <TimeBlock value={timeLeft.seconds} label="Seg" />
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-12 md:h-24 w-16 md:w-32 flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-4xl md:text-7xl font-light"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-eucalyptus-500">{label}</span>
    </div>
  );
}
