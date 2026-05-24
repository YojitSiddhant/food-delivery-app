const prisma = require("../config/db");

const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { totalAmount } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const amountNumber = Number(totalAmount);
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      return res.status(400).json({
        message: "Invalid totalAmount",
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: amountNumber,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
