import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Image src="youtube.svg" alt="web logo" height={50} width={50} />
      <p className="text-xl font-semibold tracking-tight">NewTube</p>
    </div>
  );
}
