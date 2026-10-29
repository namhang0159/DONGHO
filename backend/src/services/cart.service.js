import {
  Cart,
  CartItem,
  ProductVariant,
  Product,
  ProductVariantImage,
} from '../models/index.js';

export const getOrCreateCart = async (userId) => {
  const [cart] = await Cart.findOrCreate({
    where: { userId },
  });

  const fullCart = await Cart.findByPk(cart.id, {
    include: [
      {
        model: CartItem,
        as: 'items',
        include: [
          {
            model: ProductVariant,
            as: 'variant',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'slug', 'basePrice', 'imageUrl'],
              },
              {
                model: ProductVariantImage,
                as: 'images',
              },
            ],
          },
        ],
      },
    ],
  });

  // Tính toán tổng tiền
  let totalAmount = 0;
  let totalQuantity = 0;

  if (fullCart && fullCart.items) {
    fullCart.items.forEach((item) => {
      const price = Number(item.variant?.price || 0);
      totalAmount += price * item.quantity;
      totalQuantity += item.quantity;
    });
  }

  return {
    cart: fullCart,
    totalQuantity,
    totalAmount,
  };
};

export const addItemToCart = async (userId, variantId, quantity = 1) => {
  const [cart] = await Cart.findOrCreate({ where: { userId } });

  const variant = await ProductVariant.findByPk(variantId);
  if (!variant || variant.status !== 'active') {
    const error = new Error('Biến thể sản phẩm không tồn tại hoặc đã ngừng bán');
    error.statusCode = 400;
    throw error;
  }

  let cartItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      variantId,
    },
  });

  if (cartItem) {
    cartItem.quantity += Number(quantity);
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({
      cartId: cart.id,
      variantId,
      quantity: Number(quantity),
    });
  }

  return await getOrCreateCart(userId);
};

export const updateItemQuantity = async (userId, itemId, quantity) => {
  const [cart] = await Cart.findOrCreate({ where: { userId } });

  const cartItem = await CartItem.findOne({
    where: { id: itemId, cartId: cart.id },
  });

  if (!cartItem) {
    const error = new Error('Không tìm thấy sản phẩm trong giỏ hàng');
    error.statusCode = 404;
    throw error;
  }

  if (Number(quantity) <= 0) {
    await cartItem.destroy();
  } else {
    cartItem.quantity = Number(quantity);
    await cartItem.save();
  }

  return await getOrCreateCart(userId);
};

export const removeCartItem = async (userId, itemId) => {
  const [cart] = await Cart.findOrCreate({ where: { userId } });

  const cartItem = await CartItem.findOne({
    where: { id: itemId, cartId: cart.id },
  });

  if (!cartItem) {
    const error = new Error('Không tìm thấy sản phẩm trong giỏ hàng');
    error.statusCode = 404;
    throw error;
  }

  await cartItem.destroy();
  return await getOrCreateCart(userId);
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ where: { userId } });
  if (cart) {
    await CartItem.destroy({ where: { cartId: cart.id } });
  }
  return await getOrCreateCart(userId);
};

export default {
  getOrCreateCart,
  addItemToCart,
  updateItemQuantity,
  removeCartItem,
  clearCart,
};
