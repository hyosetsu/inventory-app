import { useEffect, useState } from "react";
import api from "../api";

interface Item {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // ✅ モーダル用state

  useEffect(() => {
    api
      .get<Item[]>("/items/")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 animate-pulse">📦 Loading items...</p>;

  if (items.length === 0)
    return <p className="text-center text-gray-400">まだ登録された持ち物がありません。</p>;

  return (
    <>
      {/* ===== カード一覧 ===== */}
      <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transform transition duration-300 cursor-pointer"
          >
            <div className="relative">
              <img
                src={
                    item.image.startsWith("http")
                    ? item.image
                    : `http://localhost:8000${item.image}`
                }
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow">
                {item.category}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-800 truncate">{item.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <button
                onClick={() => setSelectedItem(item)} // ✅ モーダル開く
                className="w-full mt-2 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                詳細を見る
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== モーダル ===== */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedItem(null)} // 背景クリックで閉じる
        >
          <div
            className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // 内側クリックは閉じない
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>

            <img
              src={
                selectedItem.image.startsWith("http")
                  ? selectedItem.image
                  : `http://localhost:8000${selectedItem.image}`
              }
              alt={selectedItem.name}
              className="w-full h-64 object-contain rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">{selectedItem.name}</h2>
            <p className="text-sm text-blue-600 font-semibold mt-1">{selectedItem.category}</p>
            <p className="text-gray-700 mt-3">{selectedItem.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemList;
