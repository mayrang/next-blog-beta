import NavBar from "@/components/NavBar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Recoil from "@/components/Recoil";
import Notification from "@/components/Notification";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Mayrang's Blog",
  description: "This is Mayrang's Blog.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Recoil>
          <div className="fixed z-20">
            <Notification />
          </div>

          <NavBar />
          <div className="pt-14">{children}</div>
        </Recoil>
      </body>
    </html>
  );
}
