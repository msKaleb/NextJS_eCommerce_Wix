import { products } from "@wix/stores";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import WixImage from "./WixImage";
import Badge from "./ui/badge";
import DiscountBadge from "./DiscountBadge";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link className="bg-card h-full border" href={`/products/${product.slug}`}>
      {/* wrap the <img> in a div to contain the image in the border while zooming in (overflow)*/}
      <div className="relative overflow-hidden">
        <WixImage
          // add a zoom efect to the image on hover event
          className="transition-transform duration-300 hover:scale-105"
          alt={mainImage?.altText}
          mediaIdentifier={mainImage?.url}
          height={700}
          width={700}
        />
        <div className="absolute right-3 bottom-3 flex flex-wrap items-center gap-3">
          {product.ribbon && <Badge>{product.ribbon}</Badge>}
          {product.discount && <DiscountBadge data={product.discount} />}
          <Badge className="bg-secondary text-secondary-foreground font-semibold">
            {getFormattedPrice(product)}
          </Badge>
        </div>
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

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
