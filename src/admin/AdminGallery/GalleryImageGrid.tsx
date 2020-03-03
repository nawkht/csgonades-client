import { FC } from "react";
import { ImageRes } from "../../api/GalleryApi";
import { GalleryImagePreview } from "./GalleryImagePreview";

type Props = {
  images: ImageRes[];
};

export const GalleryImageGrid: FC<Props> = ({ images }) => {
  return (
    <>
      <div className="gallery-image-grid">
        {images.map(i => (
          <GalleryImagePreview key={i.id} image={i} />
        ))}
      </div>
      <style jsx>{`
        .gallery-image-grid {
          display: flex;
          margin-left: -15px;
          margin-right: -15px;
        }
      `}</style>
    </>
  );
};
