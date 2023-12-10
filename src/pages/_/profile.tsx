import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowUp, FiBook, FiEdit, FiInfo, FiPlus } from "react-icons/fi";

let list1 = [
  { title: 'Info Pribadi', icon: FiInfo },
  { title: 'Alamat Saya', icon: FiBook },
]

let list2 = [
  { title: 'Riwayat Top Up', icon: FiPlus },
  { title: 'Riwayat Transfer', icon: FiArrowUp },
]

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
                {/* <h1 className="text-sm">{session?.token.sub}</h1> */}
              </div>
            </div>
            <FiEdit className="text-green-600 fill-green-500/20" />
          </div>
          <div className="flex flex-col mt-5 p-4">
            <div className="flex flex-row items-center">
              <h1 className="font-bold text-sm">Pengaturan</h1>
            </div>
            <div className="flex flex-col mt-5 divide-y gap-3">
              {list1.map(x => (
                <div className="flex pt-3 click flex-row items-center gap-3 text-lg font-semibold">
                  <div className="bg-green-500 rounded-xl p-1.5 text-white">
                    <x.icon />
                  </div>
                  <h1 className="font-[poppins]">{x.title}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-5 p-4">
            <div className="flex flex-row items-center">
              <h1 className="font-bold text-sm">Riwayat</h1>
            </div>
            <div className="flex flex-col mt-5 divide-y gap-3">
              {list2.map(x => (
                <div className="flex pt-3 click flex-row items-center gap-3 text-lg font-semibold">
                  <div className="bg-green-500 rounded-xl p-1.5 text-white">
                    <x.icon />
                  </div>
                  <h1 className="font-[poppins]">{x.title}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default profile