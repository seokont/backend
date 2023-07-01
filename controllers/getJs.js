import { Doctors } from "../models/Doctors.js";
import { Appointments } from "../models/Appointments.js";
import { Patients } from "../models/Patients.js";
import { functionGetDb, functionPreparid } from "../service/service.js";

export const functionGet = async (req, res, next) => {
  const allPatient = await Patients.find({});
  const allDoctors = await Doctors.find({});
  const appoIntments = await Appointments.find({});

  const result = {
    patient: allPatient,
    doctors: allDoctors,
    appointments: appoIntments,
  };

  await functionGetDb(req.body.pacients, allPatient, "patient")
    .then((data) => (result.patient = data))
    .catch((err) => res.status(400).send(err));

  await functionGetDb(req.body.doctors, allDoctors, "doctors")
    .then((data) => (result.doctors = data))
    .catch((err) => res.status(400).send(err));

  await functionGetDb(req.body.appointments, appoIntments, "appointments")
    .then((data) => (result.appointments = data))
    .catch((err) => res.status(400).send(err));

  let dataAppoIntments = functionPreparid(allPatient, allDoctors, appoIntments);

  return res.status(200).json({
    allPatient,
    allDoctors,
    appoIntments,
    dataAppoIntments,
  });
};

export const functionDelete = async (req, res, next) => {
  await Patients.deleteMany({});
  await Doctors.deleteMany({});
  await Appointments.deleteMany({});

  return res.status(200).send("ok");
};

export const getItems = async (req, res, next) => {
  const allPatient = await Patients.find({});
  const allDoctors = await Doctors.find({});
  const appoIntments = await Appointments.find({});
  let dataAppoIntments = functionPreparid(allPatient, allDoctors, appoIntments);
  return res
    .status(200)
    .json({ allPatient, allDoctors, appoIntments, dataAppoIntments });
};

export const saveNewAppo = async (req, res, next) => {
  console.log(req.body.data);

  const appoIntments = await Appointments.find({ name: req.query.name });

  for (let item of req.body.data) {
    await Appointments.findByIdAndUpdate(item.id, {
      time: item.time,
    });
  }

  // await functionGetDb(req.body.data, [], "appointments")
  //   .then((data) => (result.appointments = data))
  //   .catch((err) => res.status(400).send(err));
  // return res.status(200).json({ status: "ok" });

  return res.send(req.body.data);
};
