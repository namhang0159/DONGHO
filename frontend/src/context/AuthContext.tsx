"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { WatchItem, WATCHES } from "@/data/watches";
import { watchAudio } from "@/utils/audio";
import apiClient from "@/lib/axios";

export type VipTier = "Emerald VIP" | "Platinum Elite" | "Diamond Solitaire";

export interface UserAddress {
  id: string;
  receiverName: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
  tag: "Tư gia" | "Dinh thự" | "Văn phòng VIP";
}

export interface UserOrder {
  id: string;
  createdAt: string;
  items: {
    watch: WatchItem;
    quantity: number;
    serialNumber: string;
  }[];
  totalVND: number;
  totalUSD: number;
  status: "pending" | "confirmed" | "armored_transit" | "delivered" | "cancelled";
  paymentMethod: "bank_transfer_qr" | "armored_cod" | "credit_card";
  paymentStatus: "paid" | "pending";
  shippingAddress: UserAddress;
  armoredTrackingCode: string;
  securityGuardNotes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  vipTier: VipTier;
  privilegeCardNumber: string;
  memberSince: string;
  spendingTotalVND: number;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  addresses: UserAddress[];
  orders: UserOrder[];
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register";
  openAuthModal: (mode?: "login" | "register") => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: (data: { email?: string; name?: string; credential?: string; googleId?: string; avatar?: string; accessToken?: string; idToken?: string }) => Promise<{ success: boolean; message?: string }>;
  openGoogleOAuthPopup: () => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (addr: Omit<UserAddress, "id">) => void;
  updateAddress: (id: string, addr: Partial<UserAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  createOrder: (order: {
    items: { watch: WatchItem; quantity: number }[];
    totalVND: number;
    totalUSD: number;
    paymentMethod: "bank_transfer_qr" | "armored_cod" | "credit_card";
    shippingAddress: UserAddress;
  }) => UserOrder;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  // Load from localStorage on mount & clean up legacy mock users
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("customer_token");
      const savedUser = localStorage.getItem("mdm_auth_user");
      if (savedToken && savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.email === "alexander.vu@maison.ch" || parsed.id === "USR-VIP-8899") {
          localStorage.removeItem("customer_token");
          localStorage.removeItem("customer_refresh_token");
          localStorage.removeItem("mdm_auth_user");
          setUser(null);
          setToken(null);
        } else {
          setToken(savedToken);
          setUser(parsed);
        }
      } else {
        setUser(null);
        setToken(null);
      }

      const savedAddresses = localStorage.getItem("mdm_user_addresses");
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      } else {
        setAddresses([]);
      }

      const savedOrders = localStorage.getItem("mdm_user_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders([]);
      }
    } catch {
      setUser(null);
      setToken(null);
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem("mdm_auth_user", JSON.stringify(u));
      } else {
        localStorage.removeItem("mdm_auth_user");
      }
    } catch {}
  };

  const saveAddresses = (list: UserAddress[]) => {
    setAddresses(list);
    try {
      localStorage.setItem("mdm_user_addresses", JSON.stringify(list));
    } catch {}
  };

  const saveOrders = (list: UserOrder[]) => {
    setOrders(list);
    try {
      localStorage.setItem("mdm_user_orders", JSON.stringify(list));
    } catch {}
  };

  const openAuthModal = (mode: "login" | "register" = "login") => {
    watchAudio.click();
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    watchAudio.click();
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    watchAudio.chime();
    try {
      const res = await apiClient.post("/auth/login", {
        email: email.trim(),
        password: pass,
      });
      const data = res.data?.data;
      const accessToken = data?.accessToken || data?.token;
      const refreshToken = data?.refreshToken;

      if (accessToken) {
        setToken(accessToken);
        localStorage.setItem("customer_token", accessToken);
        if (refreshToken) {
          localStorage.setItem("customer_refresh_token", refreshToken);
        }
        const account = data.account || {};
        const loggedUser: UserProfile = {
          id: String(account.id || Date.now()),
          name: account.name || email.split("@")[0],
          email: account.email || email,
          phone: account.phone || "",
          vipTier: "Emerald VIP",
          privilegeCardNumber: `MDM-EME-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          memberSince: account.createdAt
            ? new Date(account.createdAt).toLocaleDateString("vi-VN", { month: "long", year: "numeric" })
            : "Hôm nay",
          spendingTotalVND: 0,
        };
        saveUser(loggedUser);
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, message: "Không nhận được phản hồi hợp lệ từ máy chủ." };
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.";
      return { success: false, message: errorMsg };
    }
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    pass: string
  ): Promise<{ success: boolean; message?: string }> => {
    watchAudio.chime();
    try {
      const res = await apiClient.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : undefined,
        password: pass,
      });
      const data = res.data?.data;
      const accessToken = data?.accessToken || data?.token;
      const refreshToken = data?.refreshToken;

      if (accessToken) {
        setToken(accessToken);
        localStorage.setItem("customer_token", accessToken);
        if (refreshToken) {
          localStorage.setItem("customer_refresh_token", refreshToken);
        }
        const userItem = data.user || {};
        const newUser: UserProfile = {
          id: String(userItem.id || Date.now()),
          name: userItem.name || name.trim(),
          email: userItem.email || email.trim(),
          phone: userItem.phone || phone.trim() || "",
          vipTier: "Emerald VIP",
          privilegeCardNumber: `MDM-EME-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          memberSince: "Hôm nay",
          spendingTotalVND: 0,
        };
        saveUser(newUser);
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, message: "Đăng ký không thành công. Vui lòng thử lại." };
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.";
      return { success: false, message: errorMsg };
    }
  };

  const loginWithGoogle = async (
    googleData: { email?: string; name?: string; credential?: string; googleId?: string; avatar?: string; accessToken?: string; idToken?: string }
  ): Promise<{ success: boolean; message?: string }> => {
    watchAudio.chime();
    try {
      const res = await apiClient.post("/auth/google", googleData);
      const data = res.data?.data;
      const accessToken = data?.accessToken || data?.token;
      const refreshToken = data?.refreshToken;

      if (accessToken) {
        setToken(accessToken);
        localStorage.setItem("customer_token", accessToken);
        if (refreshToken) {
          localStorage.setItem("customer_refresh_token", refreshToken);
        }
        const account = data.account || data.user || {};
        const loggedUser: UserProfile = {
          id: String(account.id || Date.now()),
          name: account.name || googleData.name || "Quý Khách Google VIP",
          email: account.email || googleData.email || "",
          phone: account.phone || "",
          vipTier: "Emerald VIP",
          privilegeCardNumber: `MDM-EME-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          memberSince: account.createdAt
            ? new Date(account.createdAt).toLocaleDateString("vi-VN", { month: "long", year: "numeric" })
            : "Hôm nay",
          spendingTotalVND: 0,
        };
        saveUser(loggedUser);
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, message: "Không nhận được phản hồi hợp lệ từ máy chủ." };
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Đăng nhập bằng Google thất bại. Vui lòng thử lại.";
      return { success: false, message: errorMsg };
    }
  };

  const openGoogleOAuthPopup = (): Promise<{ success: boolean; message?: string }> => {
    watchAudio.click();
    return new Promise((resolve) => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId || clientId.trim() === "" || clientId.includes("watchshopluxury2026")) {
        resolve({
          success: false,
          message: "Chưa thiết lập NEXT_PUBLIC_GOOGLE_CLIENT_ID trong file frontend/.env.local. Vui lòng tạo Client ID trên Google Cloud Console theo hướng dẫn.",
        });
        return;
      }

      const redirectUri = `${window.location.origin}/auth/google/callback`;
      const scope = encodeURIComponent("openid email profile");
      const nonce = Math.random().toString(36).substring(2);

      const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=token id_token&scope=${scope}&nonce=${nonce}&prompt=select_account`;

      const width = 500;
      const height = 620;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        googleOAuthUrl,
        "GoogleSignInPopup",
        `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
      );

      if (!popup) {
        resolve({
          success: false,
          message: "Trình duyệt đã chặn cửa sổ Popup. Vui lòng cho phép popup để tiếp tục đăng nhập với Google.",
        });
        return;
      }

      let isResolved = false;

      const messageListener = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data?.type === "GOOGLE_AUTH_SUCCESS") {
          isResolved = true;
          window.removeEventListener("message", messageListener);
          const { accessToken, idToken } = event.data;
          const loginRes = await loginWithGoogle({ accessToken, idToken });
          resolve(loginRes);
        } else if (event.data?.type === "GOOGLE_AUTH_ERROR") {
          isResolved = true;
          window.removeEventListener("message", messageListener);
          resolve({
            success: false,
            message: event.data.message || "Đăng nhập Google thất bại hoặc bị hủy.",
          });
        }
      };

      window.addEventListener("message", messageListener);

      const timer = setInterval(() => {
        if (popup.closed) {
          clearInterval(timer);
          window.removeEventListener("message", messageListener);
          if (!isResolved) {
            setTimeout(() => {
              resolve({
                success: false,
                message: "Cửa sổ xác thực Google đã được đóng.",
              });
            }, 300);
          }
        }
      }, 1000);
    });
  };

  const logout = () => {
    watchAudio.ratchet();
    setToken(null);
    try {
      localStorage.removeItem("customer_token");
      localStorage.removeItem("customer_refresh_token");
    } catch {}
    saveUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    saveUser(updated);
  };

  const addAddress = (addr: Omit<UserAddress, "id">) => {
    watchAudio.click();
    const newId = `ADDR-${Date.now()}`;
    let newAddresses: UserAddress[];
    if (addr.isDefault || addresses.length === 0) {
      newAddresses = addresses.map((a) => ({ ...a, isDefault: false }));
      newAddresses.push({ ...addr, id: newId, isDefault: true });
    } else {
      newAddresses = [...addresses, { ...addr, id: newId }];
    }
    saveAddresses(newAddresses);
  };

  const updateAddress = (id: string, addr: Partial<UserAddress>) => {
    watchAudio.click();
    let newAddresses = addresses.map((a) => {
      if (a.id === id) {
        return { ...a, ...addr };
      }
      if (addr.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    });
    saveAddresses(newAddresses);
  };

  const deleteAddress = (id: string) => {
    watchAudio.tick();
    const filtered = addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    saveAddresses(filtered);
  };

  const setDefaultAddress = (id: string) => {
    watchAudio.click();
    const newAddresses = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveAddresses(newAddresses);
  };

  const createOrder = (orderData: {
    items: { watch: WatchItem; quantity: number }[];
    totalVND: number;
    totalUSD: number;
    paymentMethod: "bank_transfer_qr" | "armored_cod" | "credit_card";
    shippingAddress: UserAddress;
  }): UserOrder => {
    watchAudio.chime();
    const newOrderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeFormatted = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}, ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const serialPrefix = ["CHRONO", "TOURBILLON", "CALIBRE", "GENEVE"];

    const orderItems = orderData.items.map((item, idx) => ({
      watch: item.watch,
      quantity: item.quantity,
      serialNumber: `${item.watch.brand.slice(0, 3).toUpperCase()}-${serialPrefix[idx % serialPrefix.length]}-${Math.floor(10000 + Math.random() * 90000)}-CH`,
    }));

    const newOrder: UserOrder = {
      id: newOrderId,
      createdAt: timeFormatted,
      items: orderItems,
      totalVND: orderData.totalVND,
      totalUSD: orderData.totalUSD,
      status: "pending",
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === "bank_transfer_qr" ? "pending" : "pending",
      shippingAddress: orderData.shippingAddress,
      armoredTrackingCode: `BRINKS-SEC-${Math.floor(1000 + Math.random() * 9000)}VN`,
      securityGuardNotes: "Đang phân bổ xe bọc thép chuyên dụng và đội bảo an bàn giao tận tay.",
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);

    // Update user spending
    if (user) {
      updateProfile({
        spendingTotalVND: user.spendingTotalVND + orderData.totalVND,
      });
    }

    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        addresses,
        orders,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        loginWithGoogle,
        openGoogleOAuthPopup,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        createOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
