import React, { useEffect } from 'react'
import { GOOGLE_API } from '@env' // GOOGLE API
import axios from 'axios'   // Axios package

export default (coordinate) => {


    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

    const getData = async () => {
        const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
        const config = {
            params: {
                query: 'restaurants',
                location: `${coordinate.lat}, ${coordinate.long}`,
                radius: 5000,
                key: GOOGLE_API,
            }
        }

        try {
            const response = await axios.get(url, config)
            setData(response.data.results)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [coordinate])

    return { data, loading, error }
}