import { OptionalEventModel } from "../../src/models";

const startTime = new Date();

export const eventSeeds = (params: {
  careRelationId: string;
}): OptionalEventModel[] => {
  const { careRelationId } = params;

  return [
    {
      title: "Minum obat pagi",
      description:
        "Minum obat batuk sesuai dengan resep dokter, pada kemasan warna hijau",
      startTime: new Date(
        new Date(startTime.setDate(startTime.getDate() + 10)).setHours(
          8,
          0,
          0,
          0
        )
      ),
      proofImageUrl: "",
      careRelationId,
      doneTime: null,
      ringtoneType: "Mozart",
    },
    {
      title: "Makan siang",
      description:
        "Lakukan makan siang dengan porsi yang cukup dan buah-buahan sebagai pelengkap",
      startTime: new Date(
        new Date(startTime.setDate(startTime.getDate() + 10)).setHours(
          11,
          0,
          0,
          0
        )
      ),
      proofImageUrl: "",
      careRelationId,
      doneTime: null,
      ringtoneType: "Marimba",
    },
    {
      title: "Minum obat sore",
      description:
        "Minum obat batuk sesuai dengan resep dokter, pada kemasan warna hijau",
      startTime: new Date(
        new Date(startTime.setDate(startTime.getDate() + 10)).setHours(
          17,
          0,
          0,
          0
        )
      ),
      careRelationId,
      proofImageUrl: "",
      doneTime: null,
      ringtoneType: "One Piece",
    },
  ];
};
