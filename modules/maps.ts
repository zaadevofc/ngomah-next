import { Loader } from "@googlemaps/js-api-loader"

export const getAddress = async ({ lat, lng }: any) => {
    try {
        let loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GMAPS_KEY as string,
            version: 'weekly'
        })
        let { Geocoder } = await loader.importLibrary('geocoding')
        let revGeo = (await new Geocoder().geocode({ location: { lat, lng }, language: 'id' })).results
        return revGeo;
    } catch (e) {
        let loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GMAPS_KEY as string,
            version: 'weekly'
        })
        let { Geocoder } = await loader.importLibrary('geocoding')
        let revGeo = (await new Geocoder().geocode({ location: { lat, lng }, language: 'id' })).results
        return revGeo;
    }
}

export const getLatLng = async (address: string) => {
    try {
        let loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GMAPS_KEY as string,
            version: 'weekly'
        })
        let { Geocoder } = await loader.importLibrary('geocoding')
        let latlng = await new Geocoder().geocode({ address, language: 'id', region: 'ID' })
        return latlng;
    } catch (e) {
        return null
    }
}

export const searchAddress = async (address: string) => {
    try {
        let loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GMAPS_KEY as string,
            version: 'weekly'
        })
        let { AutocompleteService } = await loader.importLibrary('places')
        let data = await new AutocompleteService().getPlacePredictions({ input: address, language: 'id', region: 'ID' })
        return data.predictions;
    } catch (e) {
        return null
    }
}

export const getDistance = async (from: any, to: any) => {
    let loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GMAPS_KEY as string,
        version: 'weekly'
    })
    let { spherical: { computeDistanceBetween } } = await loader.importLibrary('geometry')
    return computeDistanceBetween({ lat: from.lat, lng: from.lng }, { lat: to.lat, lng: to.lng }).toFixed(0)
}