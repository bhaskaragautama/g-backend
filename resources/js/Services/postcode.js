// fetch using axios
import axios from "axios";

const API_BASE_URL = "/";

export const fetchAddressByPostcode = async (postcode) => {
    try {
        const response = await axios.get(`${API_BASE_URL}postcode/${postcode}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching address by postcode:", error);
        throw error;
    }
};
