import NavBar from "@/components/NavBar";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Mayrang's Blog",
  description: "This is Mayrang's Blog.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NavBar />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
