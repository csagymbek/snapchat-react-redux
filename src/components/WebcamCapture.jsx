import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../features/cameraSlice";
import "../styles/WebcamCapture.css";
import { useHistory } from "react-router-dom";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef, dispatch, history]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
      />
    </div>
  );
};

export default WebcamCapture;
