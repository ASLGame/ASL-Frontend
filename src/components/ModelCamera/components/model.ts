import * as tf from "@tensorflow/tfjs";
import { Models } from "../../../types/Models";
import { isMobile } from 'react-device-detect';
import dotenv from 'dotenv'

// Adds the CPU backend.
//import '@tensorflow/tfjs-backend-cpu';
export async function loadModel() {
  let result: Models = { R_Model: undefined, L_Model: undefined };

  if (isMobile) {
    // tflite.setWasmPath(
    //   'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@0.0.1-alpha.8/dist/'
    // );
    // console.log('isMobile');
    // result.R_Model = await tflite.loadTFLiteModel(`${process.env.REACT_APP_R_TFLITE}`)
    // result.L_Model = await tflite.loadTFLiteModel(`${process.env.REACT_APP_L_TFLITE}`)
    result.R_Model = await tf.loadGraphModel(
      `${process.env.REACT_APP_R_TF}`
    );
    result.L_Model = await tf.loadGraphModel(
      `${process.env.REACT_APP_L_TF}`
    );
  } else {
    console.log("isDesktop");
    result.R_Model = await tf.loadGraphModel(
      `${process.env.REACT_APP_R_TF}`
    );
    result.L_Model = await tf.loadGraphModel(
      `${process.env.REACT_APP_L_TF}`
    );
  }





  return result;
}

export function calc_landmark_list(
  landmarks: any,
  width: number,
  height: number
) {
  let landmark_points: any[] = [];

  landmarks.forEach((value: { x: number; y: number }) => {
    let landmark_x = Math.min(width - 1, value.x * width);
    let landmark_y = Math.min(height - 1, value.y * height);
    landmark_points.push(landmark_x);
    landmark_points.push(landmark_y);
  });
  return landmark_points;
}

export function pre_process_landmarks(landmark_list: any[]) {
  let base_x;
  let base_y;

  for (let i = 0; i < landmark_list.length; i += 2) {
    if (i === 0) {
      base_x = landmark_list[i];
      base_y = landmark_list[i + 1];
    }

    landmark_list[i] = landmark_list[i] - base_x;
    landmark_list[i + 1] = landmark_list[i + 1] - base_y;
  }

  const maxValue = Math.max.apply(null, landmark_list.map(Math.abs));

  function normalize(n: number) {
    return n / maxValue;
  }

  landmark_list = landmark_list.map(function (value) {
    return normalize(value);
  });

  return landmark_list;
}
