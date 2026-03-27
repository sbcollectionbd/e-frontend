import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="h-[400px] bg-gray-200 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-4">
        New Collection 2026
      </h1>

      <div className="flex gap-4">
        <Link href="/products?category=Men">
          <button className="bg-black text-white px-6 py-2">
            Shop Men
          </button>
        </Link>

        <Link href="/products?category=Women">
          <button className="bg-white border px-6 py-2">
            Shop Women
          </button>
        </Link>
      </div>
    </div>
  );
}