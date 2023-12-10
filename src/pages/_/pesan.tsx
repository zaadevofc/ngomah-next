
import BottomBar from "@/components/BottomBar";
import Container from "@/components/Container";

const Pesan = () => {
  return (
    <>
      <Container className="flex flex-col mb-16">
        <div className="">
          <h1 className="font-[poppins] font-bold text-xl p-4">Pesan</h1>
        </div>
        <div className="flex flex-col p-4 px-6 gap-4 overflow-y-scroll">
          {
            ["Siti Nadiana", "Sischa Ayu"].map((x, i) => (
              <div className="flex flex-row gap-5 items-center border-b border-slate-300 pb-4">
                <div className="w-12">
                  <img
                    width={200}
                    height={200}

                    className="w-full rounded-full"
                    src="https://avatars.githubusercontent.com/u/93970726?v=4"
                    alt=""
                  />
                </div>
                <div className="flex flex-col leading-tight w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="font-bold text-[16px] font-[poppins]">{x}</h1>
                    <h1 className="text-[11px]">20:31</h1>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <h1
                      className={`${i == 0 ? "text-slate-900 font-medium" : "text-slate-500"
                        } text-[15px] line-clamp-1`}
                    >
                      Hallo kak ditunggu sebentar yaa!
                    </h1>
                    {i == 0 && (
                      <span className="text-xs bg-red-500 px-[5.5px] py-[.1px] font-bold text-white rounded-full">
                        1
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </Container>
      <BottomBar />
    </>
  )
}

export default Pesan