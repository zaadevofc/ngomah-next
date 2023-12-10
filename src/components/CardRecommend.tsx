const CardRecommend = () => {
    return (
        <>
            <div className="flex flex-col m-4 my-0">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col justify-start">
                        <h1 className="font-bold tracking-wide">Rekomendasi buatmu</h1>
                        <h1 className="text-[13px]">Tempat wisata yang ciamik 💖</h1>
                    </div>
                </div>
                <div className="flex flex-row gap-3 overflow-x-auto py-5">
                    {[...new Array(12)].map(() => (
                        <div className={`flex flex-col rounded-2xl h-52 bg-[url('/bg/wisata-2.webp')] bg-center relative min-w-full`}>
                            <div className="rounded-2xl bg-gradient-to-b from-gray-50/0 via-gray-500/80 to-gray-800 absolute top-0 z-[1] h-full w-full flex flex-col p-4 text-white justify-end">
                                <h1 className="font-[poppins] font-bold text-2xl">Taman Pelangi</h1>
                                <p>Jl. Slamet riyadi No. 0, Jatisari, Indonesia, Negara Kita</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CardRecommend