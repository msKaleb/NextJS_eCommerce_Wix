import Image from "next/image";
import banner from "@/assets/banner.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { delay } from "@/lib/utils";
import { Suspense } from "react";
import { getWixClient } from "@/lib/wix-client.base";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
// import styles from "@/app/loading.module.css";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="bg-secondary flex items-center md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Fill the void in your heart
          </h1>
          <p>
            Tough day? Credit card maxed out? Buy some expensive stuff and
            become happy again!
          </p>
          <Button asChild>
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="banner-image"
            className="h-full object-cover"
          />
          {/* with bg-gradient-to-r we use from-, via- and to- to choose the colors */}
          <div className="from-secondary absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
        </div>
      </div>
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  await delay(1000);

  const collection = await getCollectionBySlug("featured-products");
  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts({
    collectionIds: collection._id,
    sort: "last_updated",
  });

  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {/* following line is for checking all fields in the array */}
      {/* <pre>{JSON.stringify(featuredProducts, null, 2)}</pre> */}
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <>
      <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[30rem] w-full" />
        ))}
      </div>
    </>
  );
}

// function FeaturedFallback() {
//   return (
//     <div className="text-center">
//       <div className={styles["lds-ellipsis"]}>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>
//     </div>
//   );
// }
