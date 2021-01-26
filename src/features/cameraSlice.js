import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    cameraImage: null,
  },
  reducers: {
    setCameraImage: (state, { payload }) => {
      state.cameraImage = payload;
    },
    resetCameraImage: (state) => {
      state.cameraImage = null;
    },
  },
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;

export default cameraSlice.reducer;
