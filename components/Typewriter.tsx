"use client"

import Typewriter from 'typewriter-effect';
import React from 'react';

export default function TypewriterComponent() { // Changed the component name
  return (
    <div>
      <Typewriter
        options={{
          strings: ['Notes', 'Saver'],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}
