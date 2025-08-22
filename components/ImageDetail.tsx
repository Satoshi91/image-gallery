import { ArrowLeft, Heart, Bookmark, Share, Eye, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ImageDocument } from "../types/image";

interface ImageDetailProps {
  image: ImageDocument;
  onBack: () => void;
}

export function ImageDetail({ image, onBack }: ImageDetailProps) {
  // サンプルの詳細データを生成
  const detailData = {
    title: image.image_data.prompt || "無題",
    author: "生成AI",
    description: image.image_data.prompt ? `${image.image_data.prompt}によって生成された画像です。` : "AIによって生成された画像です。",
    uploadDate: image.image_data.created_at ? new Date(image.image_data.created_at).toLocaleDateString('ja-JP') : "不明",
    src: image.image_data.storage_url,
    likes: 0,
    views: image.image_data.views || 0,
    tags: ["AI生成", "デジタルアート"]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-medium truncate max-w-48">{detailData.title}</h1>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
          >
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="pt-16 pb-6">
        {/* Image */}
        <div className="relative bg-black">
          <ImageWithFallback
            src={detailData.src}
            alt={detailData.title}
            width={800}
            height={600}
            className="w-full h-auto max-h-[60vh] object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Image Info */}
        <div className="p-4">
          {/* Title and Author */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">{detailData.title}</h2>
            <p className="text-gray-600">{detailData.author}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Heart className="h-4 w-4" />
              <span>{detailData.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Eye className="h-4 w-4" />
              <span>{detailData.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{detailData.uploadDate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <Button variant="outline" className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              いいね
            </Button>
            <Button variant="outline" className="flex-1">
              <Bookmark className="h-4 w-4 mr-2" />
              ブックマーク
            </Button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">作品について</h3>
            <p className="text-gray-700 leading-relaxed">{detailData.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-medium mb-2">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {detailData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}