import Header from "../components/header";
import CarouselComponent from "../components/carousel";
import "../style/homePage.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <CarouselComponent />
        {/* resto da home */}
      </main>
    </>
  );
}
