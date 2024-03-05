import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers:{
                'X-API-KEY': '65NMX91-YNPM06C-HVQZYZV-2D5TKKB'
        }
        })
         .then(res => res.json())
         .then(fetchedData => {
            setData(fetchedData);
         })
         .catch(err => {
            console.log(err);
            setError(err);
         })
         .finally(() => {
            setLoading(false)
         })
    }, [url])

    return {data, loading, error}
}

export default useFetch;