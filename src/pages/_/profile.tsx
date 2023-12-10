import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiEdit } from "react-icons/fi";

const profile = () => {
  let { data: session }: any = useSession();
  let router = useRouter();
  
  return (
    <>
      <Container className="h-full flex-col">
        <div className="flex flex-col mb-16">
          <button
            onClick={() => router.back()}
            className="flex flex-row w-fit font-bold text-[16px] items-center p-4 gap-3"
          >
            <FiArrowLeft />
            <h1>Profilku</h1>
          </button>
          <div className="flex flex-row p-4 justify-between">
            <div className="flex flex-row gap-5 items-start">
              <div className="w-14">
                <img
                  width={200}
                  height={200}
                  className="w-auto rounded-full"
                  src={session?.token.picture}
                  alt={session?.token.name}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="font-extrabold font-['Poppins'] text-lg">{session?.token.name}</h1>
                <h1 className="font-semibold">{session?.token.email}</h1>
                <h1 className="text-sm">{session?.token.sub}</h1>
              </div>
            </div>
            <FiEdit className="text-green-600 fill-green-500/20" />
          </div>
          <div className="flex flex-col mt-8 p-4">
            <div className="flex flex-row items-center">
              {/* <h1>Pesanan</h1> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default profile