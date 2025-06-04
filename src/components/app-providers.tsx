"use client";

import React from 'react';

export function AppProviders({ children }: { children: React.ReactNode }) {
  // This component can be used to wrap your application with context providers
  // For now, it just returns children. Add providers like ThemeProvider here if needed.
  return <>{children}</>;
}
