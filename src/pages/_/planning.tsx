import { getAddress, getLatLng, searchAddress } from "@/../modules/maps";
import Container from "@/components/Container";
import { POSITION } from "@/consts";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

const Planning = (props: any) => {
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>(null);
  const [isAwal, setAwal] = useState<boolean>(false);
  const [isTitik, setTitik] = useState<any>(null);

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
          } else {
            window.alert('Gagal menyetel directions: ' + status);
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
      setAwal(true)
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
      setAwal(false)
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
          <div className="flex flex-col p-5">
            <div className="flex flex-col default-border rounded-3xl p-3 gap-4">
              <div className="flex flex-row items-center gap-3">
                <div className="rounded-full bg-green-600 text-white p-1.5">
                  <FaArrowUp />
                </div>
                <input onChange={handleAwal} ref={refAwal} placeholder="Kamu dimana?" className="font-bold placeholder:font-medium font-[poppins] text-lg border-none tracking-wide w-full" />
              </div>
              <span className="h-[.1px] self-end bg-slate-300 w-11/12"></span>
              <div className="flex flex-row items-center gap-3">
                <div className={`${!searchData && 'animate-pulse'} rounded-full bg-red-600 text-white p-1.5`}>
                  <FaCircleDot />
                </div>
                <input onChange={handleAkhir} ref={refAkhir} placeholder="Cari tempat ..." className="font-bold placeholder:font-medium font-[poppins] text-lg border-none tracking-wide w-full" />
              </div>
            </div>
          </div>
          <div className={`${showSearch && 'opacity-100'} opacity-0 duration-700 flex flex-col px-5 py-3 overflow-y-auto gap-3 h-full pb-10`}>
            {searchData?.map((x: any, i: number) => (
              <div onClick={() => handleCard(x, i)} key={i + 'guyvut8y8'} className="flex flex-col divide-y click default-border !border-green-600 rounded-3xl p-3 gap-4">
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