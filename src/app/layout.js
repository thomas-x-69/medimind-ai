// src/app/layout.js
import "./globals.css";
import { Providers } from "@/store/providers";

export const metadata = {
  title: "Medimind.AI - Advanced Patient Management",
  description: "Streamline your medical practice with MediMind.AI dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-cascadia bg-black" suppressHydrationWarning={true}>
        <div className="app-container">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
