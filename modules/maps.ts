import { Loader } from "@googlemaps/js-api-loader"

export const getAddress = async ({ lat, lng }: any) => {
    let loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GMAPS_KEY as string,
        version: 'weekly'
    })
    let { Geocoder } = await loader.importLibrary('geocoding')
    let revGeo = await new Geocoder().geocode({ location: { lat, lng }, language: 'id' })
    return revGeo?.results;
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
        let data = await new AutocompleteService().getPlacePredictions({ input: address })
        return data.predictions;
    } catch (e) {
        return null
    }
}