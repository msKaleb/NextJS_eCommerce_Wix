/* eslint-disable @next/next/no-img-element */
import { ImgHTMLAttributes } from "react";
import { media as wixMedia } from "@wix/sdk";

// take all attributes of an <img> but omit src, width, height and alt,
// then take 
type WixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
} & (
    | {
        scaleToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaleToFill: false;
      }
  );

export default function WixImage({
  mediaIdentifier,
  placeholder = "/placeholder.png",
  alt,
  ...props
}: WixImageProps) {
  /**
   * do we have mediaIdentifier? if so,
   *  do we have scaleToFill set to true/undefined? if so,
   *    use getScaledToFillImageUrl
   *  if not,
   *    use getImageUrl
   * if not,
   *  use placeholder
   * */
  const imageUrl = mediaIdentifier
    ? props.scaleToFill || props.scaleToFill === undefined
      ? wixMedia.getScaledToFillImageUrl(
          mediaIdentifier,
          props.width,
          props.height,
          {},
        )
      : wixMedia.getImageUrl(mediaIdentifier).url
    : placeholder;

  return <img src={imageUrl} alt={alt || ""} {...props} />;
}
