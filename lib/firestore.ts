import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  startAfter,
  getDocs,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';
import { ImageDocument } from '@/types/image';

const IMAGES_COLLECTION_NAME = 'images';

/**
 * 全ての画像データを取得（ページネーション対応）
 */
export const getAllImages = async (
  limitCount: number = 100,
  lastVisible?: QueryDocumentSnapshot | null
): Promise<{ images: ImageDocument[]; lastVisible: QueryDocumentSnapshot | null }> => {
  console.log('🔍 getAllImages called:', { limitCount, hasLastVisible: !!lastVisible });
  
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    let q = query(
      collection(db, IMAGES_COLLECTION_NAME),
      orderBy('created_at', 'desc'),
      limit(limitCount)
    );
    
    // ページネーション用のstartAfterを追加
    if (lastVisible) {
      q = query(
        collection(db, IMAGES_COLLECTION_NAME),
        orderBy('created_at', 'desc'),
        startAfter(lastVisible),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    
    const images: ImageDocument[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ImageDocument));

    // 最後のドキュメントを取得（次のページネーション用）
    const newLastVisible = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1] 
      : null;
      
    console.log('📊 getAllImages result:', { 
      imagesCount: images.length, 
      hasNewLastVisible: !!newLastVisible,
      requestedLimit: limitCount
    });
    
    return {
      images,
      lastVisible: newLastVisible
    };
  } catch (error) {
    console.error('❌ Error in getAllImages:', error);
    throw error;
  }
};

/**
 * サンプル画像データを生成（Firebase接続がない場合のフォールバック）
 */
export const getSampleImages = (): ImageDocument[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `sample-${i + 1}`,
    image_data: {
      id: `sample-${i + 1}`,
      request_id: `req-${i + 1}`,
      storage_url: `https://picsum.photos/300/400?random=${i + 1}`,
      prompt: `Sample prompt ${i + 1}`,
      original_filename: `sample_${i + 1}.jpg`,
      created_at: new Date().toISOString(),
      is_public: true,
      views: Math.floor(Math.random() * 1000) + 10,
    },
    created_at: new Date(),
    updated_at: new Date(),
  }));
};