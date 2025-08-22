import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 下スクロール時（かつ少しスクロールしている場合）
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      }
      // 上スクロール時
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // 一番上まで戻った場合
      else if (currentScrollY <= 10) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 xl:px-12 py-3 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hover:bg-gray-100 transition-transform duration-200"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        <h1 className="text-xl font-semibold">画像ギャラリー</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </header>
  );
}