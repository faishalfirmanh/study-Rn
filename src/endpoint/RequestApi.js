import axios from 'axios';
import { React } from 'react';




export const ReqApiStudy = async (url, param) => {
    const headers_config = {'Content-Type': 'application/json'};
    try {
        const kondiis_param = param != null ? param : {};
        const response = await axios.post(url, kondiis_param, headers_config);
        return response;
    } catch (error) {
        throw error;
    }
}