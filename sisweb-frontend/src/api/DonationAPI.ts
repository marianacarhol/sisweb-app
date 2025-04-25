import { Donation } from "my-types";
import api from ".";

// ADD A DONATION
export const addDonation = async (personId: number, productId: number, cantidad: number): Promise<void> => {
    try {
        await api.post(`/donation/`, { personId, productId, cantidad });
    } catch (err) {
        console.error("Failed to create donation:", err);
        throw err;
    }
};


export const getAllDonations = async () => {
try {
    const res = await api.get('/donation');
    console.log(res.data); 
    const donations: Donation[] = await res.data.payload;
    return donations;
    } catch (err) {
    console.log(err);
}
};

export const deleteDonation = async (id: number) => {
    try {
      const res = await api.delete(`/donation/${id}`);
      console.log("Donation deleted:", res.data);
    } catch (err) {
      console.error("Error deleting donation:", err);
      throw err;
    }
  };
