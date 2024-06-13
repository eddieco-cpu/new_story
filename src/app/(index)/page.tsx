import Image from "next/image";
import Slider from "@/components/Try/Slider";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <Slider></Slider>
      </div>
     
      <div className="relative  flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <p className=" text-red-500 text-6xl">text</p>
      </div>

      <div>
        <p className=" text-spec-900 text-6xl">bdnbfdg</p>
        <p className=" bg-landscape-400 text-primary-300 text-6xl">bdnbfdg</p>
      </div>

    </section>
  );
}
