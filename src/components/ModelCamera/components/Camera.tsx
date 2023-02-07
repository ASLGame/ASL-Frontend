import { FunctionComponent, useRef, useEffect } from "react";
import { Models, Alphabet } from "../../../types/Models";
import styles from "./Camera.module.css";
import * as Hands from "@mediapipe/hands";
import Webcam from "react-webcam";
import * as Cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

import { calc_landmark_list, pre_process_landmarks } from "./model";
import { Tensor } from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs";

interface CameraProps {
  models: Models;
  updateGameBuffer?: Function;
  onUserMedia?: Function;
}

const Camera: FunctionComponent<CameraProps> = (props) => {
  const { R_Model, L_Model } = props.models;
  const { updateGameBuffer, onUserMedia } = props;

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let camera = null;

  async function onResults(results: any) {
    let width = 0;
    let height = 0;
    if (webcamRef.current !== null && webcamRef.current.video !== null) {
      width = webcamRef.current.video.videoWidth;
      height = webcamRef.current.video.videoHeight;
    }

    if (canvasRef.current !== null) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }

    const canvasElement: HTMLCanvasElement | null = canvasRef.current;
    const canvasCtx: CanvasRenderingContext2D | null | undefined =
      canvasElement?.getContext("2d");

    canvasCtx?.save();
    canvasCtx?.clearRect(0, 0, canvasElement?.width!, canvasElement?.height!);

    canvasCtx?.drawImage(
      results.image,
      0,
      0,
      canvasElement?.width!,
      canvasElement?.height!
    );

    if (results.multiHandLandmarks && results.multiHandedness) {
      for (let index = 0; index < results.multiHandLandmarks.length; index++) {
        const classification = results.multiHandedness[index];
        const isRightHand = classification.label === "Right";
        const landmarks = results.multiHandLandmarks[index];
        //Preprocess Landmarks
        let landmark_list = calc_landmark_list(landmarks, width, height);

        landmark_list = pre_process_landmarks(landmark_list);
        //@ts-ignore
        landmark_list = tf.tensor2d([landmark_list]);
        let prediction;
        if (isRightHand) {
          prediction = R_Model?.predict(landmark_list);
        } else {
          prediction = L_Model?.predict(landmark_list);
        }

        prediction = prediction as Tensor;
        //@ts-ignore
        const scores = await prediction.arraySync().pop();
        const maxScore = await prediction.max().arraySync();
        //@ts-ignore
        const maxScoreIndex: number = scores.indexOf(maxScore);
        //@ts-ignore
        updateGameBuffer(Alphabet[maxScoreIndex]);

        //@ts-ignore
        drawConnectors(canvasCtx!, landmarks, Hands.HAND_CONNECTIONS, {
          color: "#4D4CAC",
          lineWidth: 5,
        });
        // @ts-ignore
        drawLandmarks(canvasCtx, landmarks, {
          color: "#6f6dec",
          lineWidth: 2,
        });
      }
    }
    canvasCtx?.restore();
  }

  useEffect(() => {
    const hands: Hands.Hands = new Hands.Hands({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      modelComplexity: 1,
      selfieMode: true,
      maxNumHands: 1,
      minDetectionConfidence: 0.75,
      minTrackingConfidence: 0.5,
    });
    if (R_Model && L_Model) {
      hands.onResults(onResults);
    }
    if (
      webcamRef !== null &&
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new Cam.Camera(webcamRef.current.video!, {
        onFrame: async () => {
          if (webcamRef !== null && webcamRef.current !== null) {
            await hands.send({ image: webcamRef.current.video! });
          }
        },
        width: 720,
        height: 576,
      });
      camera.start();
    }
  }, []);

  return (
    <div className={styles.webcamContainer}>
      <Webcam
        className={styles.webcam}
        videoConstraints={{ facingMode: "user" }}
        audio={false}
        screenshotFormat="image/jpeg"
        mirrored={true}
        ref={webcamRef}
        onUserMedia={() => onUserMedia!(false)}
      ></Webcam>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
};

export default Camera;
