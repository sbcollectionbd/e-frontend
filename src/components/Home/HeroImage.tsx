import Image from "next/image";

export default function HeroImage() {
    return (
        <div className="relative w-full h-55 sm:h-80 md:h-125 lg:h-162.5 overflow-hidden rounded-3xl">
            <Image
                src="/banner.png"
                alt="Hero Banner"
                fill
                priority
                className="object-contain md:object-cover rounded-3xl"
            />
        </div>
    );
}