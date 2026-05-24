const prisma = require("../config/db");

const getFoods = async (req, res) => {
  try {
    const foods = await prisma.food.findMany();

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createFood = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
    } = req.body;

    const food = await prisma.food.create({
      data: {
        name,
        description,
        price,
        category,
        image,
      },
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.food.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getFoods,
  createFood,
  deleteFood,
};