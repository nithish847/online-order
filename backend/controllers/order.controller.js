import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";

// 1. Place Order
export const placeOrder = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const userRole = req.user.role;

    if (userRole !== "buyer") {
      return res.status(403).json({
        message: "Only buyers can place orders",
        success: false,
      });
    }

    const { address, products } = req.body;

    if (!address || !products || products.length === 0) {
      return res.status(400).json({
        message: "Address and products are required",
        success: false,
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.productId}`,
          success: false,
        });
      }

      const quantity = item.quantity || 1;
      totalAmount += product.price * quantity;

      orderItems.push({
        product: product._id,
        quantity,
      });
    }

    const newOrder = await Order.create({
      buyer: buyerId,
      products: orderItems,
      address,
      price: totalAmount, // ✅ save price here
      status: "placed",
    });

    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error while placing order",
      success: false,
    });
  }
};


// 2. Get user's own orders
export const getUserOrder = async (req, res) => {
  try {
    // Only buyers can access this
    if (req.user.role !== "buyer") {
      return res.status(403).json({
        message: "Only buyers can access their orders",
        success: false,
      });
    }

    const userId = req.user._id;

    const orders = await Order.find({ buyer: userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(400).json({
        message: "No orders found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
};
}


// 3. Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can view all orders",
        success: false,
      });
    }

    const orders = await Order.find()
      .populate("buyer", "fullname email")
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(400).json({
        message: "No orders found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
  }
};

// 4. Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can update order status",
        success: false,
      });
    }

    const orderId = req.params.id;
    const { status } = req.body;

    const allowedStatus = ["placed", "processing", "shipped", "delivered"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        success: false,
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }

}
// 5. Cancel/Delete an Order (only buyer can cancel their own order if not delivered)
export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;

    console.log("Cancel order called for:", orderId, "by user:", userId);

    if (userRole !== "buyer") {
      return res.status(403).json({
        message: "Only buyers can cancel their orders",
        success: false,
      });
    }

    const order = await Order.findById(orderId);
    console.log("Found order:", order);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    if (order.buyer.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You can only cancel your own orders",
        success: false,
      });
    }

    if (order.status.toLowerCase() === "delivered") {
      return res.status(400).json({
        message: "Cannot cancel a delivered order",
        success: false,
      });
    }

    await Order.findByIdAndDelete(orderId);
    console.log("Order deleted:", orderId);

    return res.status(200).json({
      message: "Order cancelled successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({
      message: "Error cancelling order",
      success: false,
    });
  }
};


