import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

interface LoginFormProps {
  onLogin: () => void; // ← 型を明示！
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      toast.success("ログイン成功！");
      onLogin(); // ← 型OK
    } catch (error) {
      toast.error("ログイン失敗！");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">ログイン</h2>
      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-4 rounded"
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
      >
        ログイン
      </button>
    </form>
  );
};

export default LoginForm;
