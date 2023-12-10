import Container from "@/components/Container";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import Maps from "./Maps";

const ActionModal = (props: any) => {
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  let handleMap = (e: any) => {
    if (!e.target.value) {
      setShowMap(true)
      setShowSearch(false);
    } else {
      setShowMap(false)
      setShowSearch(true);
    }
  }

  return (
    <>
      <Container className={`${props.showModal && '-top-[1.1px]'} h-full top-[999px] w-full flex-col fixed bg-white z-[1000] duration-500`}>
        <div className="flex flex-col h-full">
          <button className="flex flex-row w-fit font-bold text-[16px] items-center p-4 gap-4">
            <FiX onClick={() => props.setShowModal(false)} className='text-xl mt-0.5' />
            <h1>Mau kemana nih?</h1>
          </button>
          <div className={`${showMap ? '!h-[500px]' : '!h-[0px]'} !w-screen duration-500`}>
            <Maps touch={false} className='h-full' />
          </div>
          <div className="flex flex-col p-5">
            <div className="flex flex-col default-border rounded-3xl p-3 gap-4">
              <div className="flex flex-row items-center gap-3">
                <div className="rounded-full bg-green-600 text-white p-1.5">
                  <FaArrowUp />
                </div>
                <h1 className="font-bold text-lg tracking-wide font-[poppins]">Jatisari</h1>
              </div>
              <span className="h-[.1px] self-end bg-slate-300 w-11/12"></span>
              <div className="flex flex-row items-center gap-3">
                <div className="animate-pulse rounded-full bg-red-600 text-white p-1.5">
                  <FaCircleDot />
                </div>
                <input onChange={handleMap} placeholder="Cari tempat ..." className="font-bold placeholder:font-medium font-[poppins] text-lg border-none tracking-wide w-full" />
              </div>
            </div>
          </div>
          <div className={`${showSearch && 'opacity-100'} opacity-0 duration-700 flex flex-col px-5 py-3 overflow-y-auto gap-3 h-full pb-10`}>
            {[...new Array(14)].map(x => (
              <div className="flex flex-col divide-y click default-border !border-green-600 rounded-3xl p-3 gap-4">
                <div className="flex flex-row items-center gap-3">
                  <div className="flex flex-col">
                    <h1 className="font-bold tracking-wide font-[poppins] line-clamp-1">Nabyan Salon Hair & Eyelash hahahahh</h1>
                    <h1 className="text-sm line-clamp-2">Jatisari, Mranggen, RT/RW 02/01 Polokarto, Sukoharjo, Jawa Tengah 57555</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default ActionModal