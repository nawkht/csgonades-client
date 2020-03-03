import { FC, useEffect, useState } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { ImageUploader } from "../../newnade/ImageUploader";
import {
  useFetchImagesInFolder,
  useGalleryImages,
  useGalleryUpload,
} from "../../store/GalleryStore/GalleryHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { GalleryImageGrid } from "./GalleryImageGrid";

type Props = {};

export const AdminGallery: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const [visibleImageAdder, setVisibleImageAdder] = useState(false);
  const images = useGalleryImages();
  const fetchGalleryImages = useFetchImagesInFolder();
  const galleryUpload = useGalleryUpload();

  useEffect(() => {
    fetchGalleryImages("articles");
  }, []);

  function hideImageAdder() {
    setVisibleImageAdder(false);
  }

  function showImageAdder() {
    setVisibleImageAdder(true);
  }

  function onAddImage(croppedImageBase64: string) {
    setVisibleImageAdder(false);
    galleryUpload(croppedImageBase64, "articles");
  }

  return (
    <>
      <div className="gallery">
        <h3>Gallery</h3>
        <button onClick={showImageAdder}>Add image</button>

        <GalleryImageGrid images={images} />

        <CSGNModal
          title="Add image"
          visible={visibleImageAdder}
          onDismiss={hideImageAdder}
        >
          <ImageUploader loading={false} onImageCropped={onAddImage} />
        </CSGNModal>
      </div>
      <style jsx>{`
        .gallery {
          background: ${colors.DP01};
          border-radius: 3px;
          padding: 12px;
          border: 1px solid ${colors.BORDER};
        }
      `}</style>
    </>
  );
};
