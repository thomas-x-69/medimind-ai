import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MediMind.AI - Advanced Patient Management",
  description: "Streamline your medical practice with MediMind.AI dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
