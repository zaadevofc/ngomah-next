
import { FaStar } from "react-icons/fa";
import { TbHelmet } from "react-icons/tb";

const CardHistory = (props: any) => {
  return (
    <>
      <div className="flex flex-col m-4 my-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-start">
            <h1 className="font-bold tracking-wide">Riwayat perjalanan mu</h1>
            <h1 className="text-[13px]">Semua riwayat udah kesimpen ~</h1>
          </div>
          <p className="text-sm text-slate-500">Lihat lainnya</p>
        </div>
        <div className="flex flex-row gap-3 overflow-x-auto pb-1 pt-5">
          {
            [...new Array(5)].map(() => (
              <div className="card min-w-[200px] click bg-base-100 drop-shadow-md sm:cursor-pointer">
                <figure className="h-[120px] rounded-2xl">
                  <img
                    width={200}
                    height={200}
                    src="/peta.jpg"
                    alt="aada"
                  />
                </figure>
                <div className="card-body text-sm p-4">
                  <h1 className="card-title text-sm line-clamp-2">
                    SMK Negeri 2 Sukoharjo
                  </h1>
                  <h1 className="text-gray-500 -mt-1">34km</h1>
                  <div className="flex flex-row items-center gap-2">
                    <TbHelmet className="text-black text-lg fill-green-500" />
                    <h1 className="text-gray-700 font-semibold">Sischa Ayu</h1>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                      <FaStar className="text-black text-lg fill-yellow-500" />
                      <h1 className="text-gray-700 font-semibold">4.7</h1>
                    </div>
                    <h1 className="text-gray-500 font-semibold">Rp24.000</h1>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default CardHistory