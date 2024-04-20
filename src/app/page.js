import Link from "next/link";

export default function Page() {
  return (
    <>
      <ol>
        <li>
          <Link href={"/projects/saenopy"}>Saenopy</Link>
        </li>
        <li>
          <Link href={"/projects/duostories"}>Duostories</Link>
        </li>
      </ol>
    </>
  );
}
