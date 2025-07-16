'use client';

import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo(a) à Home!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Você está logado como <span className="font-semibold">{user.email}</span>.
        </p>
      </div>
    </div>
  );
}