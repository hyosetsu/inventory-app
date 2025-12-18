import { useState, useRef } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

const ItemForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("画像を選択してください！");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);

      // 👇 この位置に追加！
    console.log("🔥 送信テスト開始");
    for (let [key, value] of formData.entries()) {
        console.log("➡️", key, value);
    }

    try {
      setLoading(true);
      const response = await api.post("/items/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ アップロード成功:", response.data);
      toast.success("🎉 登録が完了しました！");
      onSuccess();

      // 入力リセット
      setName("");
      setCategory("");
      setDescription("");
      clearImage();
    } catch (error: any) {
      console.error("❌ アップロードエラー:", error.response || error);
      toast.error("アップロードに失敗しました💦");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6 space-y-4">
      <Toaster position="top-center" />
      <h2 className="text-xl font-bold text-gray-700 text-center">
        📦 新しい持ち物を登録
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          placeholder="カテゴリ"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          placeholder="説明（任意）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          rows={3}
        />

        <div className="space-y-2">
          <label className="block font-medium text-gray-600">
            画像を選択：
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
            required
          />
        </div>

        {preview && (
          <div className="relative mt-4 border rounded-xl shadow-md bg-gray-50 p-3">
            <img
              src={preview}
              alt="プレビュー"
              className="max-h-60 mx-auto object-contain rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600"
              title="画像を削除"
            >
              ✕
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-semibold py-2 rounded-lg transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "アップロード中..." : "登録する"}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
