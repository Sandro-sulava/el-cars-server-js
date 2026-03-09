const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { PrismaClient } = require("@prisma/client");
const { cloudinary, safeUpload } = require("../lib/cloudinary");

const prisma = new PrismaClient();

const getAllLuxuryCar = asyncHandler(async (req, res) => {
  const { brand } = req.query;
  const filter = {};
  if (brand) filter.brand = brand;

  const luxuryCar = await prisma.luxuryCar.findMany({
    where: filter,
  });

  if (!luxuryCar || luxuryCar.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No luxury cars found" });
  }

  res.status(StatusCodes.OK).json(luxuryCar);
});

const GetLuxuryCarById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const luxuryCar = await prisma.luxuryCar.findUnique({
    where: { id: Number(id) },
  });
  if (!luxuryCar) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Car not Found" });
  }
  res.status(StatusCodes.OK).json(luxuryCar);
});

const CreateLuxuryCar = asyncHandler(async (req, res) => {
  const { brand, name, model, image, price } = req.body;

  // 1️⃣ Validate fields
  if (!brand || !name || !model || !image || !price) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required: brand, name, model, image, and price",
    });
  }

  // 2️⃣ Upload or reuse image safely
  let uploadedImage;
  try {
    uploadedImage = await safeUpload(image); // ✅ Call safeUpload directly, not cloudinary.safeUpload
  } catch (err) {
    console.error("safeUpload error:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Image upload failed",
      error: err.message,
    });
  }

  // 3️⃣ Save new luxury car to the database
  const newLuxuryCar = await prisma.luxuryCar.create({
    data: {
      brand,
      name,
      model,
      price: Number(price),
      image: uploadedImage,
    },
  });

  // 4️⃣ Respond clearly
  res.status(StatusCodes.CREATED).json({
    message: "Luxury car created successfully",
    car: newLuxuryCar,
  });
});

const DeleteLuxuryCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedCar = await prisma.luxuryCar.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({
    message: "Car deleted successfully",
    deletedCar,
  });
});

const UpdateLuxuryCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { brand, name, model, image, price } = req.body;

  let updatedData = {
    brand,
    name,
    model,
    price,
  };

  if (image) {
    try {
      updatedData.image = await safeUpload(image); // ✅ Use safeUpload for consistency
    } catch (err) {
      console.error("Image upload error:", err.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Image upload failed",
        error: err.message,
      });
    }
  }

  const updatedCar = await prisma.luxuryCar.update({
    where: { id: Number(id) },
    data: updatedData,
  });

  res.status(StatusCodes.OK).json({
    message: "Luxury car updated successfully",
    updatedCar,
  });
});

module.exports = {
  getAllLuxuryCar,
  GetLuxuryCarById,
  CreateLuxuryCar,
  DeleteLuxuryCar,
  UpdateLuxuryCar,
};
