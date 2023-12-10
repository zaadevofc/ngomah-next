import BottomBar from "@/components/BottomBar";
import Container from "@/components/Container";
import { FaMotorcycle } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { TbCash, TbHelmet, TbWallet } from "react-icons/tb";
import { TiPlus } from "react-icons/ti";

const riwayat = () => {
    return (
        <>
            <Container className='flex flex-col mb-16'>
                <div className="">
                    <h1 className="font-[poppins] font-bold text-xl p-4">Riwayat</h1>
                </div>
                <div className="flex flex-col p-4 px-6 gap-4 overflow-y-scroll">
                    <h1 className="font-[poppins] text-sm font-semibold">{'>'} Ngojek</h1>
                    {['Masjid Agung Baturetno', 'QTA Nurul Hidayah'].map((x) => (
                        <div className="flex flex-row gap-5 items-center border-b border-slate-300 pb-4">
                            <div className="border border-green-600 p-2 rounded-full text-green-700">
                                <FaMotorcycle />
                            </div>
                            <div className="flex flex-col leading-tight w-full">
                                <div className="flex flex-row items-center justify-between w-full">
                                    <h1 className="font-bold text-[16px] font-[poppins] line-clamp-1">{x}</h1>
                                    <h1 className="text-[11px]">20:31</h1>
                                </div>
                                <div className="flex flex-col justify-start w-full">
                                    <h1 className={`text-slate-500 text-[15px] line-clamp-1`}></h1>
                                    <div className="flex flex-row items-center gap-2 my-1">
                                        <TbHelmet className='text-black text-lg fill-green-500' />
                                        <h1 className="text-gray-600 font-semibold">Sischa Ayu</h1>
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <h1 className="text-sm">Rp23.000</h1>
                                        <div className="flex flex-row items-center gap-1">
                                            <TbCash />
                                            <h1 className="text-sm font-[poppins]">Cash</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h1 className="font-[poppins] text-sm font-semibold">{'>'} Top Up</h1>
                    {[['Top Up RP50.000', 'zaadevofc', <TiPlus />]].map((x) => (
                        <div className="flex flex-row gap-5 items-center border-b border-slate-300 pb-4">
                            <div className="border border-green-600 p-2 rounded-full text-green-700">
                                {x[2]}
                            </div>
                            <div className="flex flex-col leading-tight w-full">
                                <div className="flex flex-row items-center justify-between w-full">
                                    <h1 className="font-bold text-[16px] font-[poppins] line-clamp-1">{x[0]}</h1>
                                    <h1 className="text-[11px]">20:31</h1>
                                </div>
                                <div className="flex flex-col justify-start w-full">
                                    <h1 className={`text-slate-500 text-[15px] line-clamp-1`}></h1>
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-2 my-1">
                                            <TbWallet className='text-black text-lg fill-green-500' />
                                            <h1 className="text-gray-600 font-semibold">{x[1]}</h1>
                                        </div>
                                        <h1 className="text-sm font-[poppins]">Alfamart</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h1 className="font-[poppins] text-sm font-semibold">{'>'} Transfer</h1>
                    {[['Transfer Rp23.000', 'Nadiana', <GrTransaction />]].map((x) => (
                        <div className="flex flex-row gap-5 items-center border-b border-slate-300 pb-4">
                            <div className="border border-green-600 p-2 rounded-full text-green-700">
                                {x[2]}
                            </div>
                            <div className="flex flex-col leading-tight w-full">
                                <div className="flex flex-row items-center justify-between w-full">
                                    <h1 className="font-bold text-[16px] font-[poppins] line-clamp-1">{x[0]}</h1>
                                    <h1 className="text-[11px]">20:31</h1>
                                </div>
                                <div className="flex flex-col justify-start w-full">
                                    <h1 className={`text-slate-500 text-[15px] line-clamp-1`}></h1>
                                    <div className="flex flex-row items-center gap-2 my-1">
                                        <TbWallet className='text-black text-lg fill-green-500' />
                                        <h1 className="text-gray-600 font-semibold">{x[1]}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
            <BottomBar />
        </>
    )
}

export default riwayat