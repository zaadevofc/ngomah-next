import { POSITION } from "@/consts";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

const Maps = (props: any) => {
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

      let map = new Map(mapRef.current as HTMLDivElement, config)

      let setMark = ({ lat, lng }: any) => {
        new Marker({
          position: { lat, lng },
          map: map
        })
      }

      if (props.awal) {
        let latlng = new LatLng(props.awal)
        map.setCenter(latlng)
        setMark(props.awal)
      }

      if (props.akhir) {
        console.log(props.akhir);
        
        let latlng = new LatLng(props.akhir)
        map.setCenter(latlng)
        setMark(props.akhir)
      }

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          let { latitude: lat, longitude: lng } = coords;
          let latlng = new LatLng({ lat, lng })
          map.setCenter(latlng)
          setMark({ lat, lng })
        })
      }
    };
    initMap();
  }, [])

  return (
    <>
      <div className={props.className} id="mapz" ref={mapRef}></div>
    </>
  )
}

export default Maps