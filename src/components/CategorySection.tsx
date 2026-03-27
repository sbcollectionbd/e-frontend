import Link from "next/link";

export default function CategorySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      
      <Link href="/products?category=Men">
        <div className="h-60 bg-gray-300 flex items-center justify-center text-2xl font-bold cursor-pointer">
          Men Fashion
        </div>
      </Link>

      <Link href="/products?category=Women">
        <div className="h-60 bg-gray-300 flex items-center justify-center text-2xl font-bold cursor-pointer">
          Women Fashion
        </div>
      </Link>

    </div>
  );
}