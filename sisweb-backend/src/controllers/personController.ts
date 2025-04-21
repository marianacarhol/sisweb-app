import { RequestHandler, Request, Response } from "express";
import { Person } from "../models/person";
import { Donation } from "../models/donation";


// Create and Save a new Person
export const createPerson: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }

  try {
    const person = { ...req.body };
    const data = await Person.create(person);
    res.status(200).json({
      status: "success",
      message: "Product successfully created",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened creating a person. " + err.message,
      payload: null,
    });
  }
};
  

// Retrieve all People from the database.
export const getAllPerson: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Person.findAll({include: [Donation]});
    res.status(200).json({
      status: "success",
      message: "All people successfully retrieved",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened retrieving all people. " + err.message,
      payload: null,
    });
  }
};

// Find a single Person with an id
export const getPersonById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Person | null = await Person.findByPk(req.params.id, {include: [Donation]});
    res.status(200).json({
      status: "success",
      message: "Person successfully retrieved",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened retrieving person. " + err.message,
      payload: null,
    });
  }
};
  
// Update a Person by the id in the request
export const modifyPerson: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
    return;
  }

  try {
    const [updated] = await Person.update({ ...req.body }, { where: { id: req.params.id } });
    if (updated) {
      res.status(200).json({
        status: "success",
        message: "Person successfully updated",
        payload: { ...req.body },
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something happened updating person.",
        payload: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened updating person. " + err.message,
      payload: null,
    });
  }
}; 

// Delete a Person with the specified id in the request
export const deletePerson: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  try {
    await Person.destroy({ where: { id } });
    res.status(200).json({ message: "Person deleted" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error deleting person",
      error: error.message || error,
    });
  }
};
