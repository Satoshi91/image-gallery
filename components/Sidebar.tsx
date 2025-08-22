import { Home, Search, Heart, User, Settings, Image, Star, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: "ホーム", href: "/" },
  { icon: Search, label: "検索", href: "/search" },
  { icon: Image, label: "作品", href: "/works" },
  { icon: Star, label: "ランキング", href: "/ranking" },
  { icon: Heart, label: "お気に入り", href: "/favorites" },
  { icon: User, label: "プロフィール", href: "/profile" },
  { icon: Settings, label: "設定", href: "/settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* サイドバー */}
      <div 
        className={`fixed top-0 left-0 z-40 w-72 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">メニュー</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* メニューアイテム */}
        <nav className="flex flex-col py-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <item.icon className="h-5 w-5 mr-3 text-gray-600" />
              <span className="text-gray-800">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 背景クリック用の透明オーバーレイ（画面を暗くしない） */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-transparent"
          onClick={onClose}
        />
      )}
    </>
  );
}