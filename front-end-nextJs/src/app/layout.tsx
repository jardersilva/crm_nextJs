"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import api from '@/lib/api';
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';
import { useAxiosInterceptors } from '@/contexts/useAxiosInterceptors';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { loading } = useLoading(); // Acesso ao estado de carregamento
  useAxiosInterceptors(api); // Configurar interceptores do Axios
  

  return (
    <html lang="pt">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <Toaster
            position="top-center"
            toastOptions={{ duration: 5000 }}
          />
          <AuthProvider>
            {loading ? <Loader /> : children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
