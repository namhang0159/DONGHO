'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';

export interface AdminAccount {
  id: number | string;
  name: string;
  email: string;
  staffCode?: string;
  role: 'admin' | 'staff';
  position?: 'manager' | 'sales' | 'warehouse' | 'technician' | string;
}

interface AdminAuthContextType {
  admin: AdminAccount | null;
  token: string | null;
  role: 'admin' | 'staff' | null;
  position: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminAccount | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state from localStorage on client mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('admin_token');
      const storedUser = localStorage.getItem('admin_user');

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Ensure only admin or staff roles are accepted
        if (parsedUser.role === 'admin' || parsedUser.role === 'staff') {
          setToken(storedToken);
          setAdmin(parsedUser);
        } else {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
        }
      }
    } catch (e) {
      console.error('Failed to parse admin session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await apiClient.post('/auth/login', {
        email: email.trim(),
        password: pass,
      });

      const data = res.data?.data;
      if (!data || !data.token) {
        throw new Error('Dữ liệu phản hồi từ máy chủ không hợp lệ');
      }

      // Role check: Reject customer accounts trying to enter admin portal
      if (data.userType !== 'admin' || (data.role !== 'admin' && data.role !== 'staff')) {
        return {
          success: false,
          message: 'Tài khoản khách hàng không có quyền truy cập Cổng Quản Trị. Vui lòng đăng nhập bằng tài khoản nhân viên hoặc ban quản lý.',
        };
      }

      const adminProfile: AdminAccount = {
        id: data.account?.id || 1,
        name: data.account?.name || 'Quản Trị Viên',
        email: data.account?.email || email,
        staffCode: data.account?.staffCode || 'STAFF',
        role: data.role,
        position: data.position || data.account?.position || 'manager',
      };

      const accessToken = data.accessToken || data.token;
      const refreshToken = data.refreshToken;

      // Persist to localStorage
      localStorage.setItem('admin_token', accessToken);
      if (refreshToken) {
        localStorage.setItem('admin_refresh_token', refreshToken);
      }
      localStorage.setItem('admin_user', JSON.stringify(adminProfile));

      setToken(accessToken);
      setAdmin(adminProfile);

      return { success: true };
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.';
      return { success: false, message: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
    setAdmin(null);
    setToken(null);
    router.push('/login');
  };

  const value: AdminAuthContextType = {
    admin,
    token,
    role: admin?.role || null,
    position: admin?.position || null,
    isAuthenticated: !!admin && !!token,
    isLoading,
    login,
    logout,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
