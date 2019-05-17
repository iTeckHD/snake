import React, { useState, useEffect, useRef } from 'react';

type CallbackSignature = () => void;

function useInterval(callback: CallbackSignature, delay: number) {
  const savedCallback = useRef<CallbackSignature>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
