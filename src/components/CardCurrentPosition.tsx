import { useState } from "react"
import ActionModal from "./ActionModal"

const CardCurrentPosition = () => {
  let [showModal, setShowModal] = useState<boolean>(false)
  return (
    <>
      <ActionModal showModal={showModal} setShowModal={setShowModal} />
      <div className="flex flex-col mt-16 mx-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-start">
            <h1 className="font-bold tracking-wide">Lokasi mu sekarang 📍</h1>
            <h1 className="text-[13px]">Bisa langsung cuss kalo mau pergi ~</h1>
          </div>
          <h1 id="req-location-refresh" className="text-sm default-btn flex justify-center items-center">Refresh</h1>
        </div>
        <div className="flex flex-col border-2 border-green-600 mt-5 p-3 rounded-2xl">
          <h1 id="geo-short_address" className="font-[poppins] text-lg font-semibold line-clamp-1">
            Coba refresh deh~
          </h1>
          <h1 id="geo-full_address" className="font-[poppins] text-sm text-slate-500 line-clamp-2">
            jangan lupa izinin lokasi nya yaa, aman kok tenang aja
          </h1>
        </div>
        <div className="flex flex-row gap-3 items-center justify-between mt-3">
          <h1 id="geo-copy" className="default-btn text-sm !w-full set-amber">Salin Alamat</h1>
          <h1 onClick={() => setShowModal(true)} className="default-btn text-sm !w-full">Pakai Lokasi</h1>
        </div>
      </div></>
  )
}

export default CardCurrentPosition
