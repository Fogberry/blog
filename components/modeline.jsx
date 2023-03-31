import Link from "next/link";

export default function Modeline({ bufferName = "Buffer" }) {
  return (
    <>
      <div className="Modeline">PangLAN {bufferName} "progress"</div>
      <Link href="/"> Home </Link>
      <Link href="/about"> About </Link>
      <Link href="/firends"> Firends </Link>
    </>
  );
}