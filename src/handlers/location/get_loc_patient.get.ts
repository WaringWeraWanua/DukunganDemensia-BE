import { Request, Response } from "express";
import { IUserMiddleware } from "../../middlewares";
import { locationUsecase, careRelationUsecase } from "../../usecases";
import { GetLocationPatient } from "../../contracts/location";

export const getLocPatient = async (req: Request, res: Response) => {
  const user: IUserMiddleware | undefined = req.body.user;
  if (!user) {
    res.status(401).send("Please authenticate");
    return;
  }

  const patients = await careRelationUsecase.findByCareGiverId(user.id);

  if (patients.length === 0) {
    res.status(404).send("No patient found");
    return;
  }

  const locations = await Promise.all(
    patients.map(async (patient) => {
      const location = await locationUsecase.findPatientLocation(patient.id);

      return {
        patientId: patient.patientId,
        location,
      };
    })
  );

  const response: GetLocationPatient = {
    success: true,
    data: locations,
    message: "Get location patient successfully",
  }
  res.json(response);
};
