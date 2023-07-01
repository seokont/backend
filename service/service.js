import { Appointments } from "../models/Appointments.js";
import { Doctors } from "../models/Doctors.js";
import { Patients } from "../models/Patients.js";

export const functionGetDb = async (data, items, why) => {
  const arrayFunc = [];
  let arraySplit = [];
  const array = [];

  if (why === "appointments") {
    for (let variable of data.split("\n")) {
      const array = variable.split(", ");

      if (array[0] && array[0] !== 0) {
        const patients = {
          pacient: array[0],
          doctor: array[1],
          time: array[2],
          color: "",
        };
        arrayFunc.push(patients);
      }
    }

    switch (why) {
      case "appointments":
        await Appointments.deleteMany({ type: [...array] });
        break;

      default:
        break;
    }
  } else {
    for (let variable of data.split("\n")) {
      const array = variable.split(", ");
      if (array[3]) {
        arraySplit = array[3].split(".").reverse();
      }
      if (array[0] && array[0] !== 0) {
        const patients = {
          type: array[0],
          time: array[1],
          name: array[2],
          data: array[3]
            ? arraySplit[0] + "." + arraySplit[1] + "." + arraySplit[2]
            : "",
        };
        arrayFunc.push(patients);
      }
    }

    if (items.length > 0) {
      items.forEach((element) => {
        arrayFunc.forEach((element2) => {
          if (element.type === element2.type) {
            array.push(element.type);
          }
        });
      });
    }

    switch (why) {
      case "patient":
        await Patients.deleteMany({ type: [...array] });
        break;
      case "doctors":
        await Doctors.deleteMany({ type: [...array] });
        break;
      default:
        break;
    }
  }

  const rsult = {};

  switch (why) {
    case "patient":
      await Patients.insertMany([...arrayFunc]);
      break;
    case "doctors":
      await Doctors.insertMany([...arrayFunc]);
      break;
    case "appointments":
      await Appointments.insertMany([...arrayFunc]);
      break;

    default:
      break;
  }

  return "ok";
};

export const functionPreparid = (patients, doctors, appointments) => {
  let pac = [];

  for (let i = 0; i < appointments.length; i++) {
    const p = patients.find((d) => d.type === appointments[i].pacient);
    const d = doctors.find((d) => d.type === appointments[i].doctor);

    if (
      Number(appointments[i].time) >= Number(p.time.split("-")[0]) &&
      Number(appointments[i].time) < Number(p.time.split("-")[1]) &&
      Number(appointments[i].time) >= Number(d.time.split("-")[0]) &&
      Number(appointments[i].time) < Number(d.time.split("-")[1])
    ) {
      pac.push({
        id: appointments[i]._id,
        pacient: appointments[i].pacient,
        doctor: appointments[i].doctor,
        time: appointments[i].time,
        color: "green",
      });
    }

    if (
      Number(appointments[i].time) < Number(p.time.split("-")[0]) ||
      Number(appointments[i].time) > Number(p.time.split("-")[1]) ||
      Number(appointments[i].time) < Number(d.time.split("-")[0]) ||
      Number(appointments[i].time) > Number(d.time.split("-")[1])
    ) {
      pac.push({
        id: appointments[i]._id,
        pacient: appointments[i].pacient,
        doctor: appointments[i].doctor,
        time: appointments[i].time,
        color: "red",
      });
    }
  }

  let duplicateIds = [];

  for (let i = 0; i < pac.length; i++) {
    for (let j = i + 1; j < pac.length; j++) {
      if (
        pac[i]["type"] == pac[j]["type"] &&
        pac[i]["time"] == pac[j]["time"]
      ) {
        pac[i]["color"] = "yellow";
        pac[j]["color"] = "yellow";
        duplicateIds.push(appointments[i], appointments[j]);
      }
    }
  }

  console.log(pac);

  return pac;
};
