import { Donation } from "my-types";
import api from ".";

// ADD A DONATION
export const addDonation = async (personId: number, productId: number, cantidad: number): Promise<void> => {
    try {
        await api.post(`/donation/`, { personId, productId, cantidad });
    } catch (err) {
        console.error("Failed to create donation:", err);
        throw err; // Re-throw the error to allow handling in the caller
    }
};

// GET ALL DONATIONS
export const getAllDonations = async (): Promise<Donation[] | undefined> => {
    try {
        const res = await api.get('/donation');
        console.log(res.data); // For connection testing purpose
        const donations: Donation[] = res.data.payload;
        return donations;
    } catch (err) {
        console.error("Failed to fetch donations:", err);
    }
};

// UPDATE A DONATION
export const updateDonation = async (id: number, cantidad: number): Promise<void> => {
    try {
        const response = await api.patch(`/donation/${id}`, { cantidad: cantidad.toString() }); // Send updated amount
        console.log("Donation updated successfully:", response.data);
    } catch (err) {
        console.error("Failed to update donation:", err);
        throw err; // Re-throw the error for handling in the caller
    }
};


