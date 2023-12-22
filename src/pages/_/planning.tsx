import { getAddress, getDistance, getLatLng, searchAddress } from "@/../modules/maps";
import Container from "@/components/Container";
import { POSITION, SALDO } from "@/consts";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaCircleDot, FaMotorcycle, FaWallet } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { IoLocationOutline, IoTimerOutline, IoWalletOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { TbCircleDot } from "react-icons/tb";
import { MtoKM, MtoRp, formatRupiah, getEstimateTime } from "../../../modules/utils";

const Planning = (props: any) => {
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>(null);
  const [isAwal, setAwal] = useState<boolean>(false);
  const [isTitik, setTitik] = useState<any>(null);

  const [isHarga, setHarga] = useState<any>(null)
  const [isOjek, setOjek] = useState<boolean>(false)

  const [typeOjek, setTypeOjek] = useState<'standart' | 'safety' | null>(null)
  const [isCanNext, setCanNext] = useState<boolean>(false)
  const [isNext, setNext] = useState<boolean>(false)

  let tarif = {
    standart: 8000,
    safety: 9000,
  }

  let map: google.maps.Map, markers: google.maps.Marker[] = [];
  let refAwal: any = useRef(null);
  let refAkhir: any = useRef(null);

  let router = useRouter()
  let query = useSearchParams();
  let data = query.get('data');

  let mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      let loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GMAPS_KEY as string,
        version: 'weekly'
      })

      let config: google.maps.MapOptions = {
        ...POSITION,
        mapId: 'mapz',
        zoom: props.zoom ? props.zoom : 13,
        disableDefaultUI: true,
        // scrollwheel: false
      }

      let { Map } = await loader.importLibrary('maps')
      let { Marker } = await loader.importLibrary('marker')
      let { LatLng } = await loader.importLibrary('core')
      let { DirectionsRenderer, DirectionsService } = await loader.importLibrary('routes')

      map = new Map(mapRef.current as HTMLDivElement, config)

      let DCService = new DirectionsService();
      let DCRender = new DirectionsRenderer({ map })

      const displayRoute = (DCService: google.maps.DirectionsService, DCRender: google.maps.DirectionsRenderer, awal: google.maps.LatLng, akhir: google.maps.LatLng) => {
        DCService.route({
          origin: awal,
          destination: akhir,
          travelMode: google.maps.TravelMode.DRIVING
        }, (res: any, status: any) => {
          if (status == google.maps.DirectionsStatus.OK) {
            DCRender.setDirections(res);
          }
        });
      }

      let setMark = ({ lat, lng }: any) => {
        let mark = new Marker({
          position: { lat, lng },
          map: map
        })
        markers.push(mark)
      }

      let displayMarkers = (map: any) => {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      if (isTitik && isTitik.awal) {
        let latlng = new LatLng(isTitik.awal)
        map.setCenter(latlng)
        setMark(isTitik.awal)
      }

      if (isTitik && isTitik.akhir) {
        let latlng = new LatLng(isTitik.akhir)
        map.setCenter(latlng)
        setMark(isTitik.akhir)
      }

      if (isTitik && isTitik.awal && isTitik.akhir) {
        let awal = new LatLng({ ...isTitik.awal });
        let akhir = new LatLng({ ...isTitik.akhir });
        displayRoute(DCService, DCRender, awal, akhir)

        let jarak = await getDistance({ ...isTitik.awal }, { ...isTitik.akhir })

        setHarga((prev: any) => {
          return {
            ...prev,
            standart: formatRupiah(MtoRp(jarak, tarif.standart)),
            safety: formatRupiah(MtoRp(jarak, tarif.safety)),
            jarak: MtoKM(jarak),
            waktu: getEstimateTime(jarak)
          }
        })
        setOjek(true)

        DCService.route({
          origin: { ...isTitik.awal },
          destination: { ...isTitik.akhir },
          travelMode: google.maps.TravelMode.DRIVING
        }, (res: any, status: any) => {
          if (status === 'OK') {
            console.log({ res });

          }
        })
      }

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          let { latitude: lat, longitude: lng } = coords;
          let latlng = new LatLng({ lat, lng })
          if (data == 'current') {
            map.setCenter(latlng)
            setMark({ lat, lng })
          }
        })
      }

      displayMarkers(map)
    };
    initMap();
  }, [data, isTitik])

  useEffect(() => {
    if (data == 'current') {
      let fetchAddress = async () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            let { latitude: lat, longitude: lng } = coords;
            let geo: any = await getAddress({ lat, lng })
            refAwal.current.value = geo[0]?.address_components[1]['long_name'];
            setTitik((prev: any) => {
              return {
                ...prev,
                awal: { lat, lng }
              }
            })
          })
        }
      }
      fetchAddress()
    }
  }, [data])

  let handleAwal = async (e: any) => {
    if (!e.target.value) {
      setShowMap(true)
      setShowSearch(false);
    } else {
      let search = await searchAddress(e.target.value);
      setSearchData(search);
      setShowMap(false);
      setShowSearch(true);
      setAwal(true);
      setOjek(false)
      setNext(false)
    }
  }

  let handleAkhir = async (e: any) => {
    if (!e.target.value) {
      setShowMap(true)
      setShowSearch(false);
    } else {
      let search = await searchAddress(e.target.value);
      setSearchData(search);
      setShowMap(false);
      setShowSearch(true);
      setAwal(false);
      setOjek(false)
      setNext(false)
    }
  }

  let handleCard = async (x: any, i: number) => {
    let latlng = await getLatLng(x.description);
    if (latlng?.results && isAwal) {
      setShowMap(true);
      setShowSearch(false);
      refAwal.current.value = x.structured_formatting.main_text;
      setTitik((prev: any) => {
        return {
          ...prev,
          awal: {
            lat: latlng?.results[0].geometry.location.lat(),
            lng: latlng?.results[0].geometry.location.lng(),
          }
        }
      })
    } else if (latlng?.results && !isAwal) {
      setShowMap(true);
      setShowSearch(false);
      refAkhir.current.value = x.structured_formatting.main_text;
      setTitik((prev: any) => {
        return {
          ...prev,
          akhir: {
            lat: latlng?.results[0].geometry.location.lat(),
            lng: latlng?.results[0].geometry.location.lng(),
          }
        }
      })
    }
  }

  let saldo = SALDO;

  let cekSaldo = isHarga && isHarga[typeOjek as any]?.split('.')?.join('');
  cekSaldo = parseFloat(cekSaldo);
  cekSaldo = saldo > cekSaldo;

  useEffect(() => { setCanNext(cekSaldo) }, [typeOjek])
  useEffect(() => {
    if (!cekSaldo) {
      setNext(cekSaldo)
      setCanNext(cekSaldo)
    }
    setNext(false)
  }, [cekSaldo])

  return (
    <>
      <Container className={`h-full w-full flex-col`}>
        <div className="flex flex-col h-full">
          <button className="flex flex-row w-fit font-bold text-[16px] items-center p-4 gap-4">
            <FiX onClick={() => router.back()} className='text-xl mt-0.5' />
            <h1>Mau kemana nih?</h1>
          </button>
          <div className={`${showMap ? '!h-[300px]' : '!h-[0px]'} sm:max-w-sm duration-500`}>
            <div ref={mapRef} className='h-full'></div>
          </div>
          <div className={`${!showMap && '!h-0'} transition-all h-full flex flex-col p-5`}>
            <div className={`${isNext ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} duration-500 flex flex-col default-border rounded-3xl p-3 gap-2`}>
              <div className="flex flex-row items-center gap-3">
                <div className="rounded-full bg-green-600 text-white p-1">
                  <FaArrowUp />
                </div>
                <input onChange={handleAwal} ref={refAwal} placeholder="Kamu dimana?" className="font-bold placeholder:font-medium font-[poppins] text-[16px] border-none tracking-wide w-full" />
              </div>
              <span className="h-[.1px] self-end bg-slate-300 w-11/12"></span>
              <div className="flex flex-row items-center gap-3">
                <div className={`${!searchData && 'animate-pulse'} rounded-full bg-red-600 text-white p-1`}>
                  <FaCircleDot />
                </div>
                <input onChange={handleAkhir} ref={refAkhir} placeholder="Cari tempat ..." className="font-bold placeholder:font-medium font-[poppins] text-[16px] border-none tracking-wide w-full" />
              </div>
            </div>
            <div className={`${isNext ? '!-mt-[350px] opacity-0 scale-0' : '!mt-[0px] opacity-100 scale-100'} duration-1000`}>
              <div className={`${isOjek ? '!mt-[16px] opacity-100 scale-100' : 'opacity-0 scale-0'} duration-500 flex flex-col gap-4`}>
                <div className="flex flex-col gap-4 default-border p-3 rounded-3xl">
                  <div onClick={() => setTypeOjek('standart')} className={`${typeOjek == 'standart' ? 'bg-green-500/20 rounded-3xl p-3' : 'bg-green-500/0 rounded-none p-0'} duration-300 flex flex-row click items-center justify-between`}>
                    <div className="flex flex-row items-center justify-between gap-3">
                      <div className="bg-green-500/30 border border-green-600 p-2 rounded-full text-green-700">
                        <FaMotorcycle />
                      </div>
                      <h1 className="font-[poppins] font-bold tracking-wide">Ngojek</h1>
                    </div>
                    <h1 className="font-['Aoboshi_One'] text-[15px]">Rp{isHarga?.standart}</h1>
                  </div>
                  <div onClick={() => setTypeOjek('safety')} className={`${typeOjek == 'safety' ? 'bg-purple-500/20 rounded-3xl p-3' : 'bg-purple-500/0 rounded-none p-0'} duration-300 flex flex-row click items-center justify-between`}>
                    <div className="flex flex-row items-center justify-between gap-3">
                      <div className="bg-purple-500/30 border border-purple-600 p-2 rounded-full text-purple-700">
                        <FaMotorcycle />
                      </div>
                      <h1 className="font-[poppins] font-bold tracking-wide">Ngojek <span className="text-purple-600">Safety</span></h1>
                    </div>
                    <h1 className="font-['Aoboshi_One'] text-[15px]">Rp{isHarga?.safety}</h1>
                  </div>
                </div>
                <div className={`${typeOjek && 'opacity-100 scale-100'} opacity-0 scale-0 duration-500 flex flex-col gap-4 default-border p-3 rounded-3xl`}>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-between gap-3">
                      <div className="bg-green-500/30 border border-green-600 p-2 rounded-full text-green-700">
                        <FaWallet />
                      </div>
                      <h1 className="font-[poppins] font-bold tracking-wide">Ngopay</h1>
                    </div>
                    <h1 className={`${!cekSaldo && 'text-red-600'} font-['Aoboshi_One'] text-[15px]`}>
                      Rp{formatRupiah(saldo)}
                    </h1>
                  </div>
                </div>
                <h1 onClick={() => setNext(isCanNext)} className={`${typeOjek && '!opacity-100'} ${(typeOjek == 'safety' && isCanNext) && '!bg-purple-500/20 !border-purple-600'} ${!cekSaldo && 'default-btn-disable !bg-gray-500/30 !border-gray-600'} !opacity-0 duration-500 default-btn !w-full !p-3 !rounded-3xl`}>Lanjutin</h1>
              </div>
            </div>
            <div className={`${isNext ? '!mt-[-40px] opacity-100 scale-100' : '!-mt-[350px] opacity-0 scale-0'} duration-1000`}>
              <div className={`!mt-[16px] flex flex-col gap-4`}>
                <div className="flex flex-col gap-4 default-border p-3 rounded-3xl">
                  {typeOjek == 'standart' ? (
                    <div className={`flex flex-row items-center justify-between`}>
                      <div className="flex flex-row items-center justify-between gap-3">
                        <div className="bg-green-500/30 border border-green-600 p-2 rounded-full text-green-700">
                          <FaMotorcycle />
                        </div>
                        <h1 className="font-[poppins] font-bold tracking-wide">Ngojek</h1>
                      </div>
                      <div className="flex flex-col text-right leading-tight">
                        <h1 className="font-[poppins] text-[15px] font-semibold">{isHarga?.jarak}</h1>
                        <h1 className="font-[poppins] text-[14px]">{isHarga?.waktu}</h1>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex flex-row items-center justify-between`}>
                      <div className="flex flex-row items-center justify-between gap-3">
                        <div className="bg-purple-500/30 border border-purple-600 p-2 rounded-full text-purple-700">
                          <FaMotorcycle />
                        </div>
                        <h1 className="font-[poppins] font-bold tracking-wide">Ngojek <span className="text-purple-600">Safety</span></h1>
                      </div>
                      <div className="flex flex-col text-right leading-tight">
                        <h1 className="font-[poppins] text-[15px] font-semibold">{isHarga?.jarak}</h1>
                        <h1 className="font-[poppins] text-[14px]">{isHarga?.waktu}</h1>
                      </div>
                    </div>
                  )}
                  <span className="h-[.1px] bg-slate-300 w-full"></span>
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-row gap-2 text-green-600 text-lg items-center tracking-wide font-medium">
                          <IoLocationOutline />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-sm">Lokasi</h1>
                          <h1 className="font-semibold line-clamp-1">{refAwal.current?.value}</h1>
                        </div>
                      </div>
                      <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-row gap-2 text-green-600 text-lg items-center tracking-wide font-medium">
                          <TbCircleDot />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-sm">Tujuan</h1>
                          <h1 className="font-semibold line-clamp-1">{refAkhir.current?.value}</h1>
                        </div>
                      </div>
                      <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-row gap-2 text-green-600 text-lg items-center tracking-wide font-medium">
                          <IoTimerOutline />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-sm">Tipe Ojek</h1>
                          <h1 className="font-semibold capitalize">{typeOjek}</h1>
                        </div>
                      </div>
                      <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-row gap-2 text-green-600 text-lg items-center tracking-wide font-medium">
                          <IoWalletOutline />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-sm">Pembayaran</h1>
                          <div className="flex flex-row items-center gap-1">
                            <h1 className="font-semibold">Ngopay</h1>
                            <MdVerified className='mt-1 text-sm fill-green-600' />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row mt-5 items-center justify-between">
                        <h1 className="font-medium tracking-wide">Total bayar</h1>
                        <h1 className="font-['Aoboshi_One'] text-lg">{isHarga && isHarga[typeOjek as any]}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <h1 onClick={() => setNext(false)} className={`${typeOjek && '!opacity-100'} ${!cekSaldo && 'default-btn-disable !bg-gray-500/30 !border-gray-600'} !opacity-0 duration-500 default-btn set-amber !w-full !p-3 !rounded-3xl`}>Balik</h1>
                  <h1 className={`${typeOjek && '!opacity-100'} ${typeOjek == 'safety' && '!bg-purple-500/20 !border-purple-600'} ${!cekSaldo && 'default-btn-disable !bg-gray-500/30 !border-gray-600'} ${typeOjek == 'safety' && '!bg-purple-500/20'} !opacity-0 duration-500 default-btn !w-full !p-3 !rounded-3xl`}>Cari Driver</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={`${showSearch && 'opacity-100 scale-100'} mt-20 opacity-0 scale-0 duration-700 flex flex-col px-5 py-3 overflow-y-auto gap-3 h-full pb-10`}>
            {searchData?.map((x: any, i: number) => (
              <div onClick={() => showSearch && handleCard(x, i)} key={i + 'guyvut8y8'} className="flex flex-col divide-y click default-border !border-green-600 rounded-3xl p-3 gap-4">
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
      </Container>
    </>
  )
}

export default Planning