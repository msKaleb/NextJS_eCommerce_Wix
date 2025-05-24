/* eslint-disable @next/next/no-img-element */
import { media as wixMedia } from "@wix/sdk";
import { products } from "@wix/stores";
import Link from "next/link";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;
  const resizedImageUrl = mainImage?.url
    ? wixMedia.getScaledToFillImageUrl(mainImage.url, 700, 700, {})
    : null;
  return (
    <Link className="h-full border" href={`/products/${product.slug}`}>
      {/* wrap the <img> in a div to contain the image in the border while zooming in (overflow)*/}
      <div className="overflow-hidden">
        <img
          // add a zoon efect to the image on hover event
          className="transition-transform duration-300 hover:scale-105"
          alt={mainImage?.altText || ""}
          src={resizedImageUrl || "/placeholder.png"}
        />
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div
          // show at most 5 lines
          className="line-clamp-5"
          // secure because it's our own code, no inserted by user
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
    </Link>
  );
}
