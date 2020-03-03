import { FC } from "react";
import { ImageRes } from "../../api/GalleryApi";

type Props = {
  image: ImageRes;
};

export const GalleryImagePreview: FC<Props> = ({ image }) => {
  return (
    <>
      <div className="image-preview">
        <img src={image.url} />
      </div>
      <style jsx>{`
        .image-preview {
          border: 1px solid red;
          max-width: 25%;
          margin: 15px;
        }

        .image-preview img {
          display: block;
          max-width: 100%;
        }
      `}</style>
    </>
  );
};
