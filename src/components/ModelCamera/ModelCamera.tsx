import React, { FunctionComponent, useEffect, useState } from "react";
// import styles from "./ModelCamera.module.css";
import { loadModel } from "./components/model";
import { Models } from "../../types/Models";
import Camera from "./components/Camera";

interface ModelCameraProps {
  updateGameBuffer?: Function;
  onUserMedia?: Function;
}

const ModelCamera: FunctionComponent<ModelCameraProps> = (props) => {
  const [models, setModels] = useState<Models>({
    L_Model: undefined,
    R_Model: undefined,
  });
  const { updateGameBuffer, onUserMedia } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      loadModel().then((models) => {
        setModels(models);
        setIsLoading(false);
      });
    }
  });

  if (!isLoading) {
    return (
      <Camera
        onUserMedia={onUserMedia}
        models={models}
        updateGameBuffer={updateGameBuffer}
      ></Camera>
    );
  } else {
    return <p>Loading...</p>;
  }
};
export default ModelCamera;
