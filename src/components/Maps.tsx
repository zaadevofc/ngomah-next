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
        disableDefaultUI: true,
        scrollwheel: false
      }

      let { Map } = await loader.importLibrary('maps')
      let { Marker } = await loader.importLibrary('marker')
      let { Geocoder } = await loader.importLibrary('geocoding')
      let { LatLng } = await loader.importLibrary('core')

      let map = new Map(mapRef.current as HTMLDivElement, config)
      // let revGeo = await new Geocoder().geocode({ location: POSITION.center })
      let getGeo = await new Geocoder().geocode({ address: 'solo' })
      console.log(getGeo);
      
      let setMark = ({ lat, lng }: any) => {
        new Marker({
          position: { lat, lng },
          map: map
        })
      }

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
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
    <div className={props.className} id="mapz" ref={mapRef}></div>
  )
}

export default Maps