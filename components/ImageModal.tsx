'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  X, 
  Download, 
  Eye, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ImageDocument } from '@/types/image';
import { responsiveSizes } from '@/lib/imageUtils';

interface ImageModalProps {
  image: ImageDocument | null;
  onClose: () => void;
  images?: ImageDocument[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

export default function ImageModal({ 
  image, 
  onClose, 
  images, 
  currentIndex, 
  onNavigate 
}: ImageModalProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // キーボードナビゲーション
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!image || !images || !onNavigate) return;

    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        if (currentIndex! > 0) {
          onNavigate(currentIndex! - 1);
        }
        break;
      case 'ArrowRight':
        if (currentIndex! < images.length - 1) {
          onNavigate(currentIndex! + 1);
        }
        break;
    }
  }, [image, images, currentIndex, onNavigate, onClose]);

  useEffect(() => {
    if (image) {
      setImageError(false);
      setImageLoading(true);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [image, handleKeyDown]);

  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.image_data.storage_url;
    link.download = image.image_data.original_filename || 'image.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrevious = () => {
    if (images && onNavigate && currentIndex! > 0) {
      onNavigate(currentIndex! - 1);
    }
  };

  const handleNext = () => {
    if (images && onNavigate && currentIndex! < images.length - 1) {
      onNavigate(currentIndex! + 1);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation buttons */}
        {images && onNavigate && (
          <>
            {currentIndex! > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            {currentIndex! < images.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </>
        )}

        {/* Main image */}
        <div className="relative w-full h-full flex items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
          )}
          
          {!imageError ? (
            <Image
              src={image.image_data.storage_url}
              alt={image.image_data.original_filename || 'Generated image'}
              width={1200}
              height={800}
              sizes={responsiveSizes.modal}
              className="max-w-full max-h-full object-contain"
              unoptimized
              onLoad={() => {
                setImageLoading(false);
                console.log('✅ Modal image loaded successfully');
              }}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
                console.error('❌ Modal image load error');
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-white">
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">画像を読み込めませんでした</p>
            </div>
          )}
        </div>

        {/* Image info panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{image.image_data.views || 0} views</span>
                </div>
                {images && onNavigate && (
                  <span className="text-sm opacity-75">
                    {(currentIndex! + 1)} / {images.length}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                ダウンロード
              </button>
            </div>
            
            {image.image_data.prompt && (
              <div className="mb-3">
                <h3 className="text-lg font-semibold mb-1">プロンプト</h3>
                <p className="text-gray-300">{image.image_data.prompt}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {image.image_data.original_filename && (
                <div>
                  <span className="text-gray-400">ファイル名:</span>
                  <span className="ml-2">{image.image_data.original_filename}</span>
                </div>
              )}
              
              {image.image_data.created_at && (
                <div>
                  <span className="text-gray-400">作成日:</span>
                  <span className="ml-2">
                    {new Date(image.image_data.created_at).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              )}
              
              {image.image_data.rating && (
                <div>
                  <span className="text-gray-400">レーティング:</span>
                  <span className="ml-2">{image.image_data.rating}</span>
                </div>
              )}
              
              <div>
                <span className="text-gray-400">ID:</span>
                <span className="ml-2 font-mono text-xs">{image.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}