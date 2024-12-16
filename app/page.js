// import ObjectDetection from "@/components/object-detection";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-b from-black via-gray-900 to-gray-900">
//       {/* <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center"> */}
//         Object Detector
//       {/* </h1> */}

//       <ObjectDetection />

//       <h2 className="gradient-title p-8 text-3xl md:text-4xl lg:text-5xl tracking-tighter md:px-6">
//         Objects it can detect - <a href="https://github.com/anish2210/Object-Detector?tab=readme-ov-file#display-names">Click to know</a>
//       </h2>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import ObjectDetection from "@/components/object-detection";

export default function Home() {
  const [detectedObjects, setDetectedObjects] = useState([]);

  // Text-to-speech function
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-b from-black via-gray-900 to-gray-900">
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center">
        Object Detector
      </h1>

      {/* Pass speak function as a prop */}
      <ObjectDetection speak={speak} setDetectedObjects={setDetectedObjects} />

      <h2 className="gradient-title p-8 text-3xl md:text-4xl lg:text-5xl tracking-tighter md:px-6">
        Objects it can detect -{" "}
        <a href="https://github.com/anish2210/Object-Detector?tab=readme-ov-file#display-names">
          Click to know
        </a>
      </h2>
    </main>
  );
}

