import { useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

const ItemForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // プレビューURL生成
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return toast.error("画像を選択してください！");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);
      await api.post("/items/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("🎉 登録が完了しました！");
      onSuccess();

      // 入力リセット
      setName("");
      setCategory("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
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
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />

        <input
          type="text"
          placeholder="カテゴリ"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />

        <textarea
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          rows={3}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />

        {/* プレビュー表示 */}
        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="プレビュー"
              className="max-h-48 object-contain rounded-lg shadow-md"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-semibold py-2 rounded-lg transition ${
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
