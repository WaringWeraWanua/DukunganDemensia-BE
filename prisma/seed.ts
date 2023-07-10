import { Role } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { IRegisterParams } from "../src/usecases";
import { prisma } from "../src/services";
import {
  userUsecase,
  newsUsecase,
  locationUsecase,
  eventUsecase,
  careRelationUsecase,
} from "../src/usecases";
import { OptionalLocationModel, OptionalEventModel } from "../src/models";
import { newsSeeds as news } from "./data/news";

const admin: IRegisterParams = {
  username: "admin",
  password: "admin",
  name: "admin",
  email: "admin@gmail.com",
  phoneNumber: "+6281329071082",
  role: Role.ADMIN,
};

const careGiver: IRegisterParams = {
  username: "caregiver",
  password: "caregiver",
  name: "caregiver",
  email: "caregiver@gmail.com",
  phoneNumber: "+6285326502041",
  role: Role.CARE_GIVER,
};

const patient: {
  data: IRegisterParams;
  location: OptionalLocationModel;
} = {
  data: {
    username: "patient",
    password: "patient",
    name: "patient",
    email: "patient@gmail.com",
    phoneNumber: "+6281329711104",
    role: Role.PATIENT,
    careGiverUsername: careGiver.username,
  },
  location: {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    patientId: "",
  },
};

const events: OptionalEventModel[] = Array(10)
  .fill({})
  .map((_) => {
    const startTime = faker.date.future();

    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs({
        min: 1,
        max: 3,
      }),
      startTime,
      proofImageUrl: "",
      careRelationId: "",
      doneTime: null,
      ringtoneType: faker.lorem.sentence(),
    };
  });

const clearDB = async () => {
  const ops = [
    await prisma.location.deleteMany(),
    await prisma.event.deleteMany(),
    await prisma.careRelation.deleteMany(),
    await prisma.user.deleteMany(),
    await prisma.news.deleteMany(),
  ];

  await Promise.all(ops);
};

const seedUser = async () => {
  const registeredAdmin = await userUsecase.register(admin);
  const registeredCareGiver = await userUsecase.register(careGiver);
  const registeredPatient = await userUsecase.register(patient.data);

  patient.location.patientId = registeredPatient.id;
  await locationUsecase.create(patient.location);

  return {
    admin: registeredAdmin,
    careGiver: registeredCareGiver,
    patient: registeredPatient,
  };
};

const seedNews = async () => {
  return await Promise.all(news.map((n) => newsUsecase.create(n)));
};

const seedEvent = async (props: { careRelationId: string }) => {
  const { careRelationId } = props;

  const filledId = events.map((e) => {
    e.careRelationId = careRelationId;
    return e;
  });

  const DONE_THRESHOLD = 4;

  const opsEvent = [
    {
      title: "Minum obat pagi",
      description:
        "Minum obat batuk sesuai dengan resep dokter, pada kemasan warna hijau",
      hour: 8,
      ringtoneType: "Mozart",
    },
    {
      title: "Makan siang",
      description:
        "Lakukan makan siang dengan porsi yang cukup dan buah-buahan sebagai pelengkap",
      hour: 11,
      ringtoneType: "Marimba",
    },
    {
      title: "Minum obat sore",
      description:
        "Minum obat batuk sesuai dengan resep dokter, pada kemasan warna hijau",
      hour: 17,
      ringtoneType: "One Piece",
    },
    {
      title: "Minum jus",
      description:
        "Minum jus buah-buahan untuk menjaga kesehatan tubuh dan meningkatkan imun",
      hour: 15,
      ringtoneType: "One Piece",
    },
    {
      title: "Makan malam",
      description:
        "Lakukan makan malam dengan porsi yang cukup dan buah-buahan sebagai pelengkap",
      hour: 19,
      ringtoneType: "Nokia",
    },
  ];

  const doneEvents = filledId.map((e, idx) => {
    const randOps = Math.floor(Math.random() * opsEvent.length);
    const { title, description, hour, ringtoneType } = opsEvent[randOps];

    e.title = title;
    e.description = description;
    e.startTime = new Date(
      e.startTime.setHours(hour, 0, 0, 0)
    )
    e.ringtoneType = ringtoneType;

    if (idx + 1 >= DONE_THRESHOLD) {
      return e;
    }

    const doneTime = new Date(
      e.startTime.getTime() + Math.random() * 120 * 60_000
    );
    e.startTime = new Date(e.startTime.setHours(hour, 0, 0, 0));
    e.doneTime = doneTime;
    e.proofImageUrl = "https://picsum.photos/200/300";

    return e;
  });

  return await Promise.all(doneEvents.map((e) => eventUsecase.create(e)));
};

const main = async () => {
  try {
    await clearDB();

    const { patient } = await seedUser();
    await seedNews();

    const careRelation = await careRelationUsecase.findByPatientId(patient.id);

    if (!careRelation) {
      throw new Error("Care relation not found");
    }

    await seedEvent({ careRelationId: careRelation.id });
  } catch (err) {
    console.log(err);
  }
};

main();
