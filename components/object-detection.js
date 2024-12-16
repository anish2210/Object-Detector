"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/render-predictions";

let detectInterval;

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastSpokenObjects, setLastSpokenObjects] = useState([]); // Track previously spoken objects
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speaking is in progress

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    // Set speaking state to true while speaking
    utterance.onstart = () => setIsSpeaking(true);

    // Set speaking state to false after speaking completes
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  async function runCoco() {
    setIsLoading(true); // Set loading state to true when model loading starts
    const net = await cocoSSDLoad();
    setIsLoading(false); // Set loading state to false when model loading completes

    detectInterval = setInterval(() => {
      runObjectDetection(net); // will build this next
    }, 3000); // Run detection every 500ms
  }

  async function runObjectDetection(net) {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      // Find detected objects
      const detectedObjects = await net.detect(webcamRef.current.video, undefined, 0.6);

      // Call the render function
      const context = canvasRef.current.getContext("2d");
      renderPredictions(detectedObjects, context);

      // Extract detected object names
      const objectNames = detectedObjects.map((obj) => obj.class);

      // Speak only if the detected objects have changed and not currently speaking
      if (
        JSON.stringify(objectNames) !== JSON.stringify(lastSpokenObjects) &&
        !isSpeaking
      ) {
        if (objectNames.length > 0) {
          const objectsToSpeak = objectNames.join(", ");
          speak(`Detected objects: ${objectsToSpeak}`);
        }
        setLastSpokenObjects(objectNames); // Update last spoken objects
      }
    }
  }

  useEffect(() => {
    runCoco();
    return () => clearInterval(detectInterval); // Clear interval on unmount
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient-title">
          Loading AI Model, <b>Please Wait...</b>
        </div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
          {/* Webcam */}
          <Webcam ref={webcamRef} className="rounded-md w-full lg:h-300" muted />
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-99999 w-full lg:h-300"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
