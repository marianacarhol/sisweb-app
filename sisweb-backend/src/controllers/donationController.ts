import { RequestHandler, Request, Response } from "express";
import { Donation } from "../models/donation";
import { Person } from "../models/person";
import { Product } from "../models/product";


// Create and Save a new Donation
export const createDonation: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }

  try {
    const donation = { ...req.body };
    const data = await Donation.create(donation);
    res.status(200).json({
      status: "success",
      message: "Donation successfully created",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened creating a donation. " + err.message,
      payload: null,
    });
  }
};
  

// Retrieve all Donations from the database.
export const getAllDonations: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Donation.findAll({ include: [Person, Product] });
    res.status(200).json({
      status: "success",
      message: "All donations successfully retrieved",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened retrieving all donations. " + err.message,
      payload: null,
    });
  }
};

// Find a single Donation with an id
export const getDonationById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Donation | null = await Donation.findByPk(req.params.id, { include: [Person, Product] });
    res.status(200).json({
      status: "success",
      message: "Donation successfully retrieved",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened retrieving donation. " + err.message,
      payload: null,
    });
  }
};
  
// Update a Donation by the id in the request
export const modifyDonation: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
    return;
  }

  try {
    const [updated] = await Donation.update({ ...req.body }, { where: { id: req.params.id } });
    if (updated) {
      res.status(200).json({
        status: "success",
        message: "Donation successfully updated",
        payload: { ...req.body },
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something happened updating donation.",
        payload: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened updating donation. " + err.message,
      payload: null,
    });
  }
}; 

// Delete a Donation with the specified id in the request
export const deleteDonation: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    await Donation.destroy({ where: { id } });
    res.status(200).json({ message: "Donation deleted" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error deleting donation",
      error: error.message || error,
    });
  }
};