"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Loader2, Image as ImageIcon } from "lucide-react";
import { ImageDocument } from "@/types/image";
import { getAllImages, getSampleImages } from "@/lib/firestore";
import { responsiveSizes } from "@/lib/imageUtils";
import { QueryDocumentSnapshot } from 'firebase/firestore';

interface ImageGridProps {
  onImageClick: (image: ImageDocument, index: number) => void;
  onImagesUpdate?: (images: ImageDocument[]) => void;
}

export function ImageGrid({ onImageClick, onImagesUpdate }: ImageGridProps) {
  const [images, setImages] = useState<ImageDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [useFirebase, setUseFirebase] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageElementRef = useRef<HTMLDivElement | null>(null);

  console.log('🎨 ImageGrid render:', { 
    imagesCount: images.length, 
    loading, 
    hasMore, 
    hasLastVisible: !!lastVisible,
    useFirebase
  });

  const fetchImages = useCallback(async () => {
    console.log('🚀 fetchImages called:', { hasMore, loading, hasLastVisible: !!lastVisible, useFirebase });
    
    if (loading) {
      console.log('⏹️ fetchImages early return due to loading');
      return;
    }

    console.log('🔄 Starting image fetch...');
    setLoading(true);
    
    try {
      if (useFirebase) {
        const { images: newImages, lastVisible: newLastVisible } = await getAllImages(20, lastVisible);
        
        console.log('📦 New images received:', { 
          newImagesCount: newImages.length, 
          hasNewLastVisible: !!newLastVisible,
          currentImagesCount: images.length,
          sampleImageData: newImages[0] ? {
            id: newImages[0].id,
            storage_url: newImages[0].image_data.storage_url,
            filename: newImages[0].image_data.original_filename
          } : null
        });
        
        setImages(prevImages => {
          const existingIds = new Set(prevImages.map(img => img.id));
          const uniqueNewImages = newImages.filter(img => !existingIds.has(img.id));
          const updatedImages = [...prevImages, ...uniqueNewImages];
          
          console.log('📊 Images state updated:', { 
            previousCount: prevImages.length, 
            newImagesCount: newImages.length,
            uniqueNewImagesCount: uniqueNewImages.length,
            newCount: updatedImages.length,
            duplicatesFiltered: newImages.length - uniqueNewImages.length
          });
          
          // 親コンポーネントに画像配列を通知
          if (onImagesUpdate) {
            onImagesUpdate(updatedImages);
          }
          
          return updatedImages;
        });
        
        setLastVisible(newLastVisible);
        
        const hasMoreData = newImages.length === 20;
        console.log('🔍 hasMore decision:', { 
          receivedCount: newImages.length, 
          expectedCount: 20, 
          hasMoreData 
        });
        setHasMore(hasMoreData);
      } else {
        // フォールバック: サンプル画像を使用
        if (images.length === 0) {
          const sampleImages = getSampleImages();
          setImages(sampleImages);
          if (onImagesUpdate) {
            onImagesUpdate(sampleImages);
          }
        }
        setHasMore(false);
      }
    } catch (error) {
      console.error('❌ Error fetching images:', error);
      console.log('🔄 Falling back to sample images');
      
      // エラー時はサンプル画像を使用
      if (images.length === 0) {
        setUseFirebase(false);
        const sampleImages = getSampleImages();
        setImages(sampleImages);
        if (onImagesUpdate) {
          onImagesUpdate(sampleImages);
        }
      }
      setHasMore(false);
    } finally {
      console.log('✅ fetchImages completed');
      setLoading(false);
    }
  }, [hasMore, loading, lastVisible, useFirebase, images.length, onImagesUpdate]);

  // 初回ロード
  useEffect(() => {
    console.log('🎬 Initial load effect:', { imagesLength: images.length, loading });
    console.log('🎯 Force triggering initial fetchImages');
    if (images.length === 0 && !loading) {
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer用のコールバック
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    console.log('👀 Intersection observed:', { 
      isIntersecting: entries[0].isIntersecting, 
      hasMore, 
      loading 
    });
    
    if (entries[0].isIntersecting && hasMore && !loading) {
      console.log('🎯 Triggering fetchImages from intersection');
      fetchImages();
    }
  }, [hasMore, loading, fetchImages]);

  useEffect(() => {
    console.log('🔧 Setting up IntersectionObserver:', { 
      loading, 
      hasMore, 
      hasLastImageRef: !!lastImageElementRef.current 
    });
    
    if (loading) {
      console.log('⏸️ Skipping observer setup (loading)');
      return;
    }
    
    if (observer.current) {
      console.log('🗑️ Disconnecting existing observer');
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px',
    });
    console.log('✅ IntersectionObserver created');

    if (lastImageElementRef.current) {
      console.log('👁️ Observing last image element');
      observer.current.observe(lastImageElementRef.current);
    } else {
      console.log('⚠️ No last image element to observe');
    }

    return () => {
      console.log('🧹 Cleaning up IntersectionObserver');
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, handleIntersection]);

  return (
    <div className="pt-16 pb-4 px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((image, index) => {
          const isLastImage = index === images.length - 1;
          if (isLastImage) {
            console.log('🔄 Rendering last image:', { index, imageId: image.id });
          }
          
          return (
            <div 
              key={image.id} 
              ref={isLastImage ? lastImageElementRef : null}
              className="relative"
            >
              <Image
                src={image.image_data.storage_url}
                alt={image.image_data.original_filename || 'Generated image'}
                width={300}
                height={300}
                sizes={responsiveSizes.gallery}
                className="cursor-pointer w-full h-auto"
                unoptimized
                onClick={() => onImageClick(image, index)}
                onLoad={(e) => {
                  console.log('✅ Image loaded successfully:', image.image_data.storage_url);
                  const target = e.target as HTMLImageElement;
                  console.log('Image dimensions:', { 
                    naturalWidth: target.naturalWidth, 
                    naturalHeight: target.naturalHeight,
                    displayWidth: target.offsetWidth,
                    displayHeight: target.offsetHeight
                  });
                }}
                onError={(e) => {
                  console.error('❌ Image load error:', {
                    originalUrl: image.image_data.storage_url,
                    imageId: image.id,
                    errorDetails: 'Using original URL (public variant) due to potential missing medium variant'
                  });
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-gray-600">画像を読み込み中...</span>
        </div>
      )}

      {!hasMore && !loading && images.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          すべての画像を読み込みました。
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            画像が見つかりません
          </h3>
          <p className="text-gray-500">
            まだ画像が生成されていないようです。
          </p>
        </div>
      )}
    </div>
  );
}