import { Op } from 'sequelize';
import {
  sequelize,
  Order,
  OrderItem,
  ProductVariant,
  Product,
  UserAddress,
  User,
  Admin,
  Shipment,
  OrderReturn,
  SerialNumber,
} from '../models/index.js';

export const createOrder = async ({
  userId,
  userAddressId,
  items, // array of { variantId, quantity }
  paymentMethod = 'cod',
  banOnlineHoacOffline = 'online',
  saleStaffId = null,
  shiftId = null,
}) => {
  const transaction = await sequelize.transaction();

  try {
    let tongTienBanDau = 0;
    const validatedItems = [];

    // Kiểm tra và tính giá từng sản phẩm
    for (const item of items) {
      const variant = await ProductVariant.findByPk(item.variantId, { transaction });
      if (!variant || variant.status !== 'active') {
        throw new Error(`Biến thể sản phẩm #${item.variantId} không hợp lệ hoặc ngừng bán`);
      }

      const itemPrice = Number(variant.price);
      const quantity = Number(item.quantity) || 1;
      tongTienBanDau += itemPrice * quantity;

      validatedItems.push({
        variantId: variant.id,
        giaSanPhamTaiLucDo: itemPrice,
        quantity,
      });
    }

    const orderCode = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await Order.create(
      {
        orderCode,
        banOnlineHoacOffline,
        userId,
        userAddressId,
        saleStaffId,
        shiftId,
        tongTienBanDau,
        tongTienDonHang: tongTienBanDau, // Mặc định chưa trừ voucher/giảm giá
        paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'paid' : 'unpaid',
        orderStatus: 'pending',
      },
      { transaction }
    );

    // Tạo các chi tiết đơn hàng
    for (const item of validatedItems) {
      await OrderItem.create(
        {
          orderId: order.id,
          variantId: item.variantId,
          giaSanPhamTaiLucDo: item.giaSanPhamTaiLucDo,
          quantity: item.quantity,
        },
        { transaction }
      );
    }

    await transaction.commit();

    return await getOrderById(order.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getOrders = async (query = {}, reqUser = null) => {
  const {
    page = 1,
    limit = 20,
    status,
    paymentStatus,
    banOnlineHoacOffline,
    search,
  } = query;

  const where = {};

  // Nếu là khách hàng, chỉ xem đơn của chính mình
  if (reqUser && reqUser.role === 'customer') {
    where.userId = reqUser.id;
  }

  if (status) {
    where.orderStatus = status;
  }

  if (paymentStatus) {
    where.paymentStatus = paymentStatus;
  }

  if (banOnlineHoacOffline) {
    where.banOnlineHoacOffline = banOnlineHoacOffline;
  }

  if (search) {
    where.orderCode = { [Op.like]: `%${search}%` };
  }

  const offset = (Number(page) - 1) * Number(limit);

  const { count, rows } = await Order.findAndCountAll({
    where,
    limit: Number(limit),
    offset: Number(offset),
    order: [['id', 'DESC']],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone'],
      },
      {
        model: UserAddress,
        as: 'address',
      },
      {
        model: OrderItem,
        as: 'items',
        include: [
          {
            model: ProductVariant,
            as: 'variant',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'slug', 'imageUrl'],
              },
            ],
          },
        ],
      },
      {
        model: Shipment,
        as: 'shipment',
      },
    ],
  });

  return {
    orders: rows,
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      limit: Number(limit),
    },
  };
};

export const getOrderById = async (orderId, reqUser = null) => {
  const where = { id: orderId };
  if (reqUser && reqUser.role === 'customer') {
    where.userId = reqUser.id;
  }

  const order = await Order.findOne({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone'],
      },
      {
        model: UserAddress,
        as: 'address',
      },
      {
        model: Admin,
        as: 'saleStaff',
        attributes: ['id', 'staffCode', 'name', 'email'],
      },
      {
        model: OrderItem,
        as: 'items',
        include: [
          {
            model: ProductVariant,
            as: 'variant',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'slug', 'imageUrl'],
              },
            ],
          },
          {
            model: SerialNumber,
            as: 'serials',
            attributes: ['id', 'serialNumber', 'status', 'location'],
          },
        ],
      },
      {
        model: Shipment,
        as: 'shipment',
      },
      {
        model: OrderReturn,
        as: 'returns',
      },
    ],
  });

  return order;
};

export const updateOrderStatus = async (orderId, { orderStatus, paymentStatus }) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();
  return order;
};

export const createOrderReturn = async ({
  orderId,
  oldSerialNumberId,
  newSerialNumberId,
  reason,
  phanTramKhauTru = 20.0,
  returnType = 'exchange',
}) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    const error = new Error('Đơn hàng không tồn tại');
    error.statusCode = 404;
    throw error;
  }

  const orderReturn = await OrderReturn.create({
    orderId,
    oldSerialNumberId,
    newSerialNumberId,
    reason,
    phanTramKhauTru,
    returnType,
    status: 'pending',
  });

  return orderReturn;
};

export const createOrUpdateShipment = async (orderId, shipmentData) => {
  const [shipment] = await Shipment.upsert({
    ...shipmentData,
    orderId,
  });
  return shipment;
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  createOrderReturn,
  createOrUpdateShipment,
};
