
import { SALDO } from '@/consts';
import Link from 'next/link';
import { FaEllipsis, FaWallet } from 'react-icons/fa6';
import { GrTransaction } from 'react-icons/gr';
import { TiPlus } from 'react-icons/ti';
import { formatRupiah } from '../../modules/utils';

let listSide = [
    { title: 'Top Up', icon: TiPlus, count: 0 },
    { title: 'Transfer', icon: GrTransaction, count: 0 },
    { title: 'Lainnya', icon: FaEllipsis, count: 3 },
]

const CardInfo = () => {
    return (
        <>
            <div className="w-full h-52 bg-green-600 bg-[url('/bg/line.svg')] -mt-3 flex justify-center items-center relative">
                <h1 className="text-white font-bold text-3xl font-['Aoboshi_One'] mb-6">Ngojek Muslimah</h1>
                <div className="absolute -bottom-8 w-full px-5">
                    <div className="flex flex-row drop-shadow-md bg-white rounded-3xl justify-between default-border px-5 py-2">
                        <div className="flex flex-row items-center gap-3">
                            <div className="bg-green-500/20 p-3 rounded-full text-green-700 text-[16px]">
                                <FaWallet />
                            </div>
                            <div className="flex flex-col leading-tight text-sm">
                                <h1 className="font-bold">Rp{formatRupiah(SALDO)}</h1>
                                <Link href="/_/riwayat" className="click text-green-700 font-medium text-[13px]">Cek riwayat {'>'}</Link>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 justify-between items-center">
                            {listSide.map((x) => (
                                <div className="indicator">
                                    {x.count > 0 && <span className="indicator-item badge bg-red-500 right-2 top-0.5 !px-1.5 text-white font-bold py-2 text-[10px]">{x.count}</span>}
                                    <Link href="/_/riwayat" className="flex flex-col gap-1 items-center">
                                        <div className="bg-green-600 text-sm p-2 w-fit rounded-full text-white">
                                            <x.icon />
                                        </div>
                                        <h1 className="text-[11px] font-semibold whitespace-nowrap">{x.title}</h1>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardInfo