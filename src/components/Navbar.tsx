import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  let { data: session }: any = useSession();
  return (
    <>
      <div
        className="bg-white drop-shadow-md z-10 flex flex-row justify-between w-full items-center py-3 px-5 gap-5 rounded-b-2xl"
      >
        <input
          type="text"
          placeholder="Mau pergi kemana hari ini?"
          className="input input-sm p-5 py-6 input-bordered w-full"
        />
        <Link className="w-12" href={"/_/profile"}>
          <img
            width={200}
            height={200}
            className="w-auto rounded-full click"
            src={session?.token.picture}
            alt={session?.token.name}
          />
        </Link>
      </div>
    </>
  )
}

export default Navbar
