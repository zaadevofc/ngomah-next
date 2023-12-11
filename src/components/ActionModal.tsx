import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { searchAddress } from "../../modules/maps";
import Maps from "./Maps";

const ActionModal = (props: any) => {
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>(null);

  let handleMap = async (e: any) => {
    if (!e.target.value) {
      setShowMap(true)
      setShowSearch(false);
    } else {
      let search = await searchAddress(e.target.value);
      setSearchData(search);
      setShowMap(false);
      setShowSearch(true);
    }
  }

  return (
    <>
      <section className={`${props.showModal ? 'top-[0px]' : ''} flex mx-auto sm:max-w-sm h-full top-[999px] w-full flex-col fixed bg-white z-[1000] duration-500`}>
        <div className="flex flex-col h-full">
          <button className="flex flex-row w-fit font-bold text-[16px] items-center p-4 gap-4">
            <FiX onClick={() => props.setShowModal(false)} className='text-xl mt-0.5' />
            <h1>Mau kemana nih?</h1>
          </button>
          <div className={`${showMap ? '!h-[500px]' : '!h-[0px]'} sm:max-w-sm duration-500`}>
            <Maps zoom={18} refresh={props.showModal} touch={false} className='h-full' />
          </div>
          <div className="flex flex-col p-5">
            <div className="flex flex-col default-border rounded-3xl p-3 gap-4">
              <div className="flex flex-row items-center gap-3">
                <div className="rounded-full bg-green-600 text-white p-1.5">
                  <FaArrowUp />
                </div>
                <h1 className="font-bold text-lg tracking-wide font-[poppins]">{props.dataGeo?.address_components && props.dataGeo?.address_components[1]['long_name'] || 'Ga ada'}</h1>
              </div>
              <span className="h-[.1px] self-end bg-slate-300 w-11/12"></span>
              <div className="flex flex-row items-center gap-3">
                <div className={`${!searchData && 'animate-pulse'} rounded-full bg-red-600 text-white p-1.5`}>
                  <FaCircleDot />
                </div>
                <input onChange={handleMap} placeholder="Cari tempat ..." className="font-bold placeholder:font-medium font-[poppins] text-lg border-none tracking-wide w-full" />
              </div>
            </div>
          </div>
          <div className={`${showSearch && 'opacity-100'} opacity-0 duration-700 flex flex-col px-5 py-3 overflow-y-auto gap-3 h-full pb-10`}>
            {searchData?.map((x: any) => (
              <div className="flex flex-col divide-y click default-border !border-green-600 rounded-3xl p-3 gap-4">
                <div className="flex flex-row items-center gap-3">
                  <div className="flex flex-col">
                    <h1 className="font-bold tracking-wide font-[poppins] line-clamp-1">{x.structured_formatting.main_text}</h1>
                    <h1 className="text-sm line-clamp-2">{x.description}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ActionModal