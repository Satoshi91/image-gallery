import { ImageDocument } from '@/types/image';

/**
 * 画像URLを取得する関数
 */
export const getImageUrls = (image: ImageDocument) => {
  const baseUrl = image.image_data.storage_url;
  
  // Cloudflare Images用のバリアント対応
  const getVariantUrl = (variant: string) => {
    if (baseUrl.includes('imagedelivery.net')) {
      return baseUrl.replace('/public', `/${variant}`);
    }
    return baseUrl;
  };

  return {
    original: baseUrl,
    medium: getVariantUrl('medium'),
    thumbnail: getVariantUrl('thumbnail'),
    public: getVariantUrl('public')
  };
};

/**
 * レスポンシブ画像のサイズ設定
 */
export const responsiveSizes = {
  gallery: '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw',
  modal: '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw',
  thumbnail: '(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw'
};

/**
 * 画像のアスペクト比を計算
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  return height / width;
};

/**
 * マサリーレイアウト用のグリッド設定
 */
export const getMasonryGridConfig = () => {
  return {
    columns: {
      default: 5,
      xl: 4,
      lg: 3,
      md: 2,
      sm: 1
    },
    gap: 16
  };
};