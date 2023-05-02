import Image from "next/image";
import { Inter } from "next/font/google";
import AvatarCard from "@/components/AvatarCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <AvatarCard />
    </main>
  );
}
