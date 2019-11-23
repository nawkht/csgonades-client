import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useState, ChangeEvent } from "react";

export const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    aspect: 16 / 9,
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });

  function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          const result = reader.result as string;
          setImageSrc(result);
        },
        false
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoaded(image: HTMLImageElement) {
    console.log("Loaded image", image);
  }

  function onCropComplete(crop: ReactCrop.Crop, _: ReactCrop.PercentCrop) {
    console.log("onCropComplete", crop);
  }

  function onCropChange(crop: ReactCrop.Crop, _: ReactCrop.PercentCrop) {
    setCrop(crop);
    console.log("onCropChange", crop);
  }

  return (
    <>
      <input type="file" onChange={onSelectFile} />
      <ReactCrop
        src={imageSrc}
        crop={crop}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={onCropChange}
      />
    </>
  );
};
