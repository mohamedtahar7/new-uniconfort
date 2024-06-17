import BrowseProducts from "@/components/main/BrowseProducts";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrowseProducts />
    </main>
  );
}
