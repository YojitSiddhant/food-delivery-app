const prisma = require("../config/db");

const createOrder = async (req, res) => {
  try {
    const { userId, totalAmount } = req.body;

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};