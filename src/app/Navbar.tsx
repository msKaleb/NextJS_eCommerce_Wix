import { getWixClient } from "@/lib/wix-client.base";
import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";

async function getCart() {
  const wixClient = getWixClient();
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    // if there is no cart yet, wix will throw OWNED_CART_NOT_FOUND error
    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND"
    ) {
      return null;
    } else {
      throw error;
    }
  }
}

export default async function Navbar() {
  const cart = await getCart();
  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <header className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto p-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Flow shop logo" width={40} height={40} />
          <span className="text-xl font-bold">Flow shop</span>
        </Link>
        {totalQuantity} items in your cart
      </div>
    </header>
  );
}
