
import { FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaCircleDot, FaLocationDot, FaStar } from "react-icons/fa6";
import { GoDot } from "react-icons/go";

const CardRating = () => {
  return (
    <>
      <div className="flex flex-col m-4 my-0">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-start">
            <h1 className="font-bold tracking-wide">Kasih rating ke driver</h1>
            <h1 className="text-[13px]">Biar driver makin semangat ✨</h1>
          </div>
        </div>
        <div
          className="flex flex-row click rounded-2xl p-5 gap-5 items-center drop-shadow-md my-5 bg-green-500/10 border border-green-600"
        >
          <div className="">
            <img
              width={200}
              height={200}
              
              className="rounded-full border-4 border-green-600 object-cover w-28 h-full"
              src="https://avatars.githubusercontent.com/u/93970726?v=4"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-extrabold text-xl tracking-wide font-[Poppins]">
              Sischa Ayu
            </h1>
            <h1 className="text-[16px] font-[Poppins] tracking-wide">B 123AA UD</h1>
            <span className="my-2"></span>
            <div className="flex flex-col items-start">
              <div className="flex flex-row gap-2 items-center text-sm">
                <FaLocationDot className="fill-amber-600" />
                <h1 className="font-[Poppins] line-clamp-1">Rumah Kejaa</h1>
              </div>
              <div className="flex flex-col ml-[.8px] text-xs">
                <GoDot />
              </div>
              <div className="flex flex-row gap-2 items-center text-sm">
                <FaCircleDot className="fill-blue-600" />
                <h1 className="font-[Poppins] line-clamp-1">SMK Negeri 2 Sukoharjo</h1>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 mt-4 text-lg">
              <FaStar className="text-amber-500" />
              <FaStar className="text-amber-500" />
              <FaStar className="text-amber-500" />
              <FaStarHalfAlt className="text-amber-500" />
              <FaRegStar className="text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardRating