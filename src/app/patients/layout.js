"use client";

import React from "react";
import { Providers } from "@/store/providers";

export default function PatientsLayout({ children }) {
  return <Providers>{children}</Providers>;
}
