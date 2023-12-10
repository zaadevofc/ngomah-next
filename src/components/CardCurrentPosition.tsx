import { useEffect, useState } from "react"
import { getAddress } from "../../modules/maps"
import ActionModal from "./ActionModal"

const CardCurrentPosition = () => {
  let [showModal, setShowModal] = useState<boolean>(false)
  let [refreshGeo, setRefreshGeo] = useState<boolean>(false)
  let [copyAddress, setCopyAddress] = useState<boolean>(false)
  let [dataGeo, setDataGeo] = useState<any>(false)

  useEffect(() => {
    setDataGeo(false);
    let fetchAddress = async () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          let { latitude: lat, longitude: lng } = coords;
          let geo: any = await getAddress({ lat, lng })
          setDataGeo(geo[0])
        })
      }
    }
    fetchAddress()
  }, [refreshGeo])

  let handleCopy = () => {
    if (dataGeo) {
      let text = `${dataGeo?.address_components[1]['long_name']}\n${dataGeo?.formatted_address}`
      navigator.clipboard.writeText(text)
      setCopyAddress(true);
      setTimeout(() => {
        setCopyAddress(false)
      }, 1500);
    }
  }

  return (
    <>
      <ActionModal showModal={showModal} setShowModal={setShowModal} dataGeo={dataGeo} />
      <div className="flex flex-col mt-16 mx-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-start">
            <h1 className="font-bold tracking-wide">Lokasi mu sekarang 📍</h1>
            <h1 className="text-[13px]">Bisa langsung cuss kalo mau pergi ~</h1>
          </div>
          <h1 onClick={() => setRefreshGeo(x => !x)} className="text-sm default-btn flex justify-center items-center">Refresh</h1>
        </div>
        <div className={`${!dataGeo ? 'gap-3' : ''} flex flex-col border-2 border-green-600 mt-5 p-3 rounded-2xl`}>
          <h1 className={`${!dataGeo ? 'skeleton animate-pulse text-transparent' : ''} font-[poppins] text-lg font-bold line-clamp-1`}>
            {dataGeo ? dataGeo?.address_components[1]['long_name'] : 'Coba refresh deh~'}
          </h1>
          <h1 className={`${!dataGeo ? 'skeleton animate-pulse text-transparent' : ''} font-[poppins] text-sm text-slate-500 line-clamp-2`}>
            {dataGeo ? dataGeo?.formatted_address : 'jangan lupa izinin lokasi nya yaa, aman kok tenang aja'}
          </h1>
        </div>
        <div className="flex flex-row gap-3 items-center justify-between mt-3">
          <h1 onClick={handleCopy} className="default-btn text-sm !w-full set-amber">{copyAddress ? '✅' : 'Salin Alamat'}</h1>
          <h1 onClick={() => setShowModal(true)} className="default-btn text-sm !w-full">Pakai Lokasi</h1>
        </div>
      </div></>
  )
}

export default CardCurrentPosition;
