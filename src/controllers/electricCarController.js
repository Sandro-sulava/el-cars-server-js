const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { PrismaClient } = require("@prisma/client");
const { cloudinary, safeUpload } = require("../lib/cloudinary");

const prisma = new PrismaClient();

const GetAllElectricCar = asyncHandler(async (req, res) => {
  const { limit = 3, page = 1, cartype } = req.query;
  const take = parseInt(limit);
  const skip = (parseInt(page) - 1) * take;

  const filter = {};
  if (cartype) filter.cartype = cartype;

  const electricCars = await prisma.electricCar.findMany({
    where: filter,
    take,
    skip,
  });

  if (!electricCars || electricCars.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No electricCars found" });
  }

  res.status(StatusCodes.OK).json(electricCars);
});

const GetElectricCarById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const electricCar = await prisma.electricCar.findUnique({
    where: { id: Number(id) },
  });
  if (!electricCar) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Car not Found" });
  }
  res.status(StatusCodes.OK).json(electricCar);
});

const CreateElectricCar = asyncHandler(async (req, res) => {
  const { name, model, topSpeed, engineType, zeroToHundred, price, image } =
    req.body;

  if (
    !name ||
    !model ||
    !topSpeed ||
    !engineType ||
    !zeroToHundred ||
    !price ||
    !image
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message:
        "All fields are required: name, model, topSpeed, engineType, zeroToHundred, price, image",
    });
  }

  let uploadedImage;

  try {
    uploadedImage = image.startsWith("http") ? image : await safeUpload(image);
  } catch (err) {
    console.error("Upload error:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Image upload failed",
      error: err.message,
    });
  }

  const newElectricCar = await prisma.electricCar.create({
    data: {
      name,
      model,
      topSpeed,
      engineType,
      zeroToHundred,
      price,
      image: uploadedImage,
    },
  });

  res.status(StatusCodes.CREATED).json(newElectricCar);
});

const DeleteElectricCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedCar = await prisma.electricCar.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({
    message: "Car deleted successfully",
    deletedCar,
  });
});

const UpdateElectricCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, model, topSpeed, engineType, zeroToHundred, price, image } =
    req.body;

  let updatedData = {
    name,
    model,
    topSpeed,
    engineType,
    zeroToHundred,
    price,
  };

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    updatedData.image = uploadResponse.secure_url;
  }

  const updatedCar = await prisma.electricCar.update({
    where: { id: Number(id) },
    data: updatedData,
  });
  res.status(StatusCodes.OK).json({
    message: "Electric car updated successfully",
    updatedCar,
  });
});

module.exports = {
  GetAllElectricCar,
  UpdateElectricCar,
  GetElectricCarById,
  CreateElectricCar,
  DeleteElectricCar,
};
