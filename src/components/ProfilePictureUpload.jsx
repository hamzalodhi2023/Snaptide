import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Cropper from "react-easy-crop";
import {
  FaCamera,
  FaUndoAlt,
  FaRedoAlt,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaUpload,
  FaCropAlt,
  FaCameraRetro,
} from "react-icons/fa";
import getCroppedImg from "../components/CropImage"; // You'll need to create this utility
import { useDispatch, useSelector } from "react-redux";
import { uploadProfilePicture } from "../redux/slices/profileSlice";
import { toast } from "react-toastify";

function ProfilePictureUpload({ profileData, currentImage }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [view, setView] = useState("upload"); // upload, crop, preview, webcam
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setView("crop");
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImageBlob = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImageBlob);
      setView("preview");
    } catch (e) {
      console.error(e);
    }
  }, [selectedImage, croppedAreaPixels, rotation]);

  const handleRotate = (direction) => {
    setRotation((prev) => (direction === "left" ? prev - 90 : prev + 90));
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setCroppedImage(null);
    setRotation(0);
    setView("upload");
  };

  const handleSave = async () => {
    if (!croppedImage) return;

    const file = new File([croppedImage], "avatar.jpg", {
      type: "image/jpeg",
    });

    try {
      await dispatch(uploadProfilePicture(file)).unwrap();
      window.location.reload();
      toast.success("Profile picture updated successfully!");
      setView("upload");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload profile picture.");
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageSelect({ target: { files: [files[0]] } });
    }
  };

  const captureWebcam = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage(imageSrc);
    setView("crop");
  }, [webcamRef]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
      {/* Header with back button and title */}
      <div className="w-full p-4 border-b border-gray-700 flex items-center">
        {view !== "upload" && (
          <button
            onClick={() => {
              if (view === "preview") setView("crop");
              else if (view === "crop" && selectedImage) setView("upload");
              else if (view === "webcam") setView("upload");
            }}
            className="mr-4 text-gray-400 hover:text-white"
          >
            <FaArrowLeft />
          </button>
        )}
        <h2 className="text-xl font-medium">
          {view === "upload" && "Change profile picture"}
          {view === "crop" && "Crop and rotate"}
          {view === "preview" && "Your new profile picture"}
          {view === "webcam" && "Take a picture"}
        </h2>
      </div>

      {/* Content area */}
      <div className="w-full p-6">
        {view === "upload" && (
          <div className="flex flex-col gap-4">
            <div
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="mx-auto mb-4 text-gray-400">
                <FaUpload className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-lg font-medium mb-2">Drag photo here</p>
              <p className="text-gray-400 mb-4">Or</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                Upload from computer
              </button>
            </div>

            <div className="relative flex items-center justify-center py-2">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="mx-4 text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <button
              onClick={() => setView("webcam")}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-md transition-colors w-full"
            >
              <FaCameraRetro className="w-5 h-5" />
              Take a picture
            </button>
          </div>
        )}

        {view === "webcam" && (
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
              />
            </div>

            <div className="flex justify-between w-full mt-4">
              <button
                onClick={() => setView("upload")}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={captureWebcam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                <FaCamera className="w-4 h-4" />
                Capture
              </button>
            </div>
          </div>
        )}

        {view === "crop" && selectedImage && (
          <div className="flex flex-col items-center">
            {/* Cropper Container */}
            <div className="relative w-full h-64 mb-4">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                className="cropper-container"
              />
            </div>

            {/* Zoom Slider */}
            <div className="w-full mb-4">
              <label className="text-gray-300 text-sm">Zoom</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Rotation Controls */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => handleRotate("left")}
                className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
              >
                <FaUndoAlt className="w-5 h-5" />
              </button>
              <span className="flex items-center text-gray-300">Rotate</span>
              <button
                onClick={() => handleRotate("right")}
                className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
              >
                <FaRedoAlt className="w-5 h-5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={handleCancel}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showCroppedImage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {view === "preview" && croppedImage && (
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700 mb-6">
              <img
                src={URL.createObjectURL(croppedImage)}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-between w-full">
              <button
                onClick={() => setView("crop")}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Save as profile picture
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}

// Default props for demonstration
ProfilePictureUpload.defaultProps = {
  profileData: {
    firstName: "John",
    lastName: "Doe",
  },
  currentImage: null,
};

export default ProfilePictureUpload;
