"use client";

import { useState } from "react";
import Navigation from "./components/Navigation";
import HeroChart from "./components/HeroChart";
import AboutSection from "./components/AboutSection";
import CategorySections from "./components/CategorySections";
import GallerySection from "./components/GallerySection";
import Footer from "./components/Footer";
import ImageModal, { ModalImageData } from "./components/ImageModal";

export default function Home() {
  const [modalData, setModalData] = useState<ModalImageData | null>(null);

  const handleOpenModal = (data: ModalImageData) => {
    setModalData(data);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <>
      <Navigation />
      <main>
        <HeroChart />
        <AboutSection />
        <div className="section-divider" />
        <CategorySections onOpenModal={handleOpenModal} />
        <div className="section-divider" />
        <GallerySection onOpenModal={handleOpenModal} />
      </main>
      <Footer />

      {/* Global Lightbox / Image Preview Modal */}
      <ImageModal data={modalData} onClose={handleCloseModal} />
    </>
  );
}
