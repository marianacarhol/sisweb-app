import { Donation } from "my-types";
import api from ".";

//ADD A PRODUCT
export const addDonation = async (personId: number, productId: number, cantidad: number): Promise<void> => {
    try {
        await api.post(`/donation/`, { personId, productId, cantidad });
    } catch (err) {
        console.error("Failed to create donation:", err);
        throw err; // Re-throw the error to allow handling in the caller
    }
};


export const getAllDonations = async () => {
try {
const res = await api.get('/donation');
console.log(res.data); //-> for connection testing purpose
const donations: Donation[] = await res.data.payload;
return donations;
} catch (err) {
console.log(err);
}
};

