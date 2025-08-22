"use client"

import { useState, useEffect } from 'react';

export default function DebugPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Debug Page</h1>
          <p className="text-gray-600">このページでTailwind CSSが正しく動作しているかテストします。</p>
        </div>

        {/* カラーテスト */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">カラーテスト</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-500 text-white p-4 rounded text-center">Red 500</div>
            <div className="bg-blue-500 text-white p-4 rounded text-center">Blue 500</div>
            <div className="bg-green-500 text-white p-4 rounded text-center">Green 500</div>
            <div className="bg-yellow-500 text-white p-4 rounded text-center">Yellow 500</div>
            <div className="bg-purple-500 text-white p-4 rounded text-center">Purple 500</div>
            <div className="bg-pink-500 text-white p-4 rounded text-center">Pink 500</div>
            <div className="bg-indigo-500 text-white p-4 rounded text-center">Indigo 500</div>
            <div className="bg-gray-500 text-white p-4 rounded text-center">Gray 500</div>
          </div>
        </div>

        {/* グリッドテスト */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">グリッドテスト</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-4 rounded-lg text-center font-semibold">
                Item {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* フレックスボックステスト */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">フレックスボックステスト</h2>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex-1 min-w-0 bg-red-100 p-4 rounded">Flex 1</div>
            <div className="flex-2 min-w-0 bg-green-100 p-4 rounded">Flex 2</div>
            <div className="flex-1 min-w-0 bg-blue-100 p-4 rounded">Flex 1</div>
          </div>
        </div>

        {/* ボタンテスト */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">ボタンテスト</h2>
          <div className="space-x-4 space-y-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Primary Button
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Secondary Button
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Success Button
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Danger Button
            </button>
            <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded transition-all">
              Outline Button
            </button>
          </div>
        </div>

        {/* レスポンシブテスト */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">レスポンシブテスト</h2>
          <div className="bg-gray-200 p-4 rounded mb-4">
            <div className="block sm:hidden bg-red-500 text-white p-2 rounded text-center">XS サイズ (モバイル)</div>
            <div className="hidden sm:block md:hidden bg-green-500 text-white p-2 rounded text-center">SM サイズ (小さいタブレット)</div>
            <div className="hidden md:block lg:hidden bg-blue-500 text-white p-2 rounded text-center">MD サイズ (タブレット)</div>
            <div className="hidden lg:block xl:hidden bg-purple-500 text-white p-2 rounded text-center">LG サイズ (小さいデスクトップ)</div>
            <div className="hidden xl:block bg-indigo-500 text-white p-2 rounded text-center">XL サイズ (大きいデスクトップ)</div>
          </div>
        </div>

        {/* アニメーションテスト */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">アニメーションテスト</h2>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full animate-bounce mx-auto"></div>
            <div className="w-16 h-16 bg-green-500 rounded-full animate-pulse mx-auto"></div>
            <div className="w-16 h-16 bg-red-500 rounded-full animate-spin mx-auto"></div>
            <div className="w-16 h-16 bg-purple-500 rounded-full animate-ping mx-auto"></div>
          </div>
        </div>

        {/* シャドウとボーダーテスト */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">シャドウとボーダーテスト</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow-sm border rounded">Shadow SM</div>
            <div className="bg-white p-4 shadow-md border rounded">Shadow MD</div>
            <div className="bg-white p-4 shadow-lg border rounded">Shadow LG</div>
            <div className="bg-white p-4 shadow-xl border-2 border-blue-300 rounded">Shadow XL + Border</div>
            <div className="bg-white p-4 shadow-2xl border-4 border-red-300 rounded-lg">Shadow 2XL + Thick Border</div>
            <div className="bg-white p-4 shadow-inner border border-gray-300 rounded-xl">Shadow Inner</div>
          </div>
        </div>

        {/* タイポグラフィテスト */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">タイポグラフィテスト</h2>
          <div className="space-y-2">
            <p className="text-xs">Extra Small Text (text-xs)</p>
            <p className="text-sm">Small Text (text-sm)</p>
            <p className="text-base">Base Text (text-base)</p>
            <p className="text-lg">Large Text (text-lg)</p>
            <p className="text-xl">Extra Large Text (text-xl)</p>
            <p className="text-2xl font-bold">2XL Bold Text (text-2xl font-bold)</p>
            <p className="text-3xl font-semibold">3XL Semibold Text (text-3xl font-semibold)</p>
            <p className="text-4xl font-light">4XL Light Text (text-4xl font-light)</p>
          </div>
        </div>

        {/* 画像テスト（マサリー風） */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">画像プレースホルダーテスト（マサリー風）</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 15 }, (_, i) => {
              const heights = ['h-32', 'h-40', 'h-48', 'h-56', 'h-64'];
              const height = heights[i % heights.length];
              const colors = ['bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-purple-300'];
              const color = colors[i % colors.length];
              
              return (
                <div key={i} className={`${color} ${height} rounded-lg flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-shadow cursor-pointer`}>
                  Image {i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* CSS情報 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">CSS情報</h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <p><strong>Tailwind CSS Version:</strong> 確認中...</p>
            <p><strong>Build Mode:</strong> {process.env.NODE_ENV}</p>
            <p><strong>プロジェクト:</strong> image-gallery</p>
            <p><strong>デバッグ時刻:</strong> {mounted ? new Date().toLocaleString('ja-JP') : 'Loading...'}</p>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="text-center">
          <a 
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            ← メインページに戻る
          </a>
        </div>
      </div>
    </div>
  );
}