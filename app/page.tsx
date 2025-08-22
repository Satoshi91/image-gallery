"use client"

import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ImageGrid } from "@/components/ImageGrid";
import ImageModal from "@/components/ImageModal";
import { ImageDocument } from "@/types/image";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageDocument | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [images, setImages] = useState<ImageDocument[]>([]);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen); // トグル処理
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleImageSelect = (image: ImageDocument, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNavigate = (index: number) => {
    if (index >= 0 && index < images.length) {
      setSelectedImage(images[index]);
      setCurrentImageIndex(index);
    }
  };

  const handleImagesUpdate = (updatedImages: ImageDocument[]) => {
    setImages(updatedImages);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={handleMenuClick} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <main>
        <ImageGrid 
          onImageClick={handleImageSelect} 
          onImagesUpdate={handleImagesUpdate}
        />
      </main>
      
      <ImageModal 
        image={selectedImage} 
        onClose={handleCloseModal}
        images={images}
        currentIndex={currentImageIndex}
        onNavigate={handleNavigate}
      />
    </div>
  );
}