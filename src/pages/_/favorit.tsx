
import BottomBar from "@/components/BottomBar";
import Container from "@/components/Container";
import Maps from "@/components/Maps";
import { FaStar } from "react-icons/fa6";

let list = [
  { title: 'Taman Pelangi', addres: 'Jl. Slamet riyadi No. 0, Jatisari, Indonesia, Negara Kita', img: `bg-[url('/bg/wisata-5.webp')]` },
  { title: 'Taman Pelangi', addres: 'Jl. Slamet riyadi No. 0, Jatisari, Indonesia, Negara Kita', img: `bg-[url('/bg/wisata-2.webp')]` },
  { title: 'Taman Pelangi', addres: 'Jl. Slamet riyadi No. 0, Jatisari, Indonesia, Negara Kita', img: `bg-[url('/bg/wisata-3.webp')]` },
  { title: 'Taman Pelangi', addres: 'Jl. Slamet riyadi No. 0, Jatisari, Indonesia, Negara Kita', img: `bg-[url('/bg/wisata-4.webp')]` },
]

const favorit = () => {
  return (
    <>
      <Container className='flex flex-col mb-16'>
        <div className="">
          <h1 className="font-[poppins] font-bold text-xl p-4">Favorit</h1>
        </div>
        <div className="flex flex-col p-4 px-6 gap-4 overflow-y-scroll">
          {list.map((x) => (
            <div className={`flex flex-col rounded-2xl h-52 ${x.img} bg-center relative min-w-full`}>
              <div className="absolute top-0 justify-end z-[10] flex p-4 h-full w-full">
                <FaStar className='text-yellow-500 text-lg drop-shadow-md' />
              </div>
              <div className="rounded-2xl bg-gradient-to-b from-gray-50/0 via-gray-500/80 to-gray-800 absolute top-0 z-[1] h-full w-full flex flex-col p-4 text-white justify-end">
                <h1 className="font-[poppins] font-bold text-2xl">{x.title}</h1>
                <p>{x.addres}</p>
              </div>
            </div>
          ))}
        </div>
        <Maps />
      </Container>
      <BottomBar />
    </>
  )
}

export default favorit