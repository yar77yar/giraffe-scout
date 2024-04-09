import { create } from "zustand";

interface CameraState {
  qrCameraIsVisible: boolean;
  cameraIsVisible: boolean;
  setIsQrCameraVisible: (value: boolean) => void;
  setIsCameraVisible: (value: boolean) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  qrCameraIsVisible: false,
  cameraIsVisible: false,
  setIsQrCameraVisible: (value: boolean) => {
    set({ qrCameraIsVisible: value });
  },
  setIsCameraVisible: (value: boolean) => {
    set({ cameraIsVisible: value });
  },
}));
