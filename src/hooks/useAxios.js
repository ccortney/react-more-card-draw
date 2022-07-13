import {useEffect, useState} from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";


const useAxios = (baseUrl, keyinLocalStorage) => {
    const [responses, setResponses] = useLocalStorage(keyinLocalStorage);

    const addResponseData  = async (urlSuffix) => {
        console.log(`Base Url: ${baseUrl}`)
        console.log(`Url Suffix: ${urlSuffix}`)
        const res = await axios.get(`${baseUrl}${urlSuffix}`);
        setResponses(responses => [...responses, { ...res.data, id: uuid() }]);
    }

    const clearResponses = () => {
        setResponses([])
    }

    return [responses, addResponseData, clearResponses]
}

const useLocalStorage = (key, initialValue = []) => {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key))
    }
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key]);

    return [value, setValue]
}

export {useAxios, useLocalStorage};