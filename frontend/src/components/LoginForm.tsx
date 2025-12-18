import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      toast.success("ログイン成功🎉");
      onLogin();
    } catch {
      toast.error("ログイン失敗💦 ユーザー名またはパスワードを確認してください。");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-gray-700">🔐 ログイン</h2>

      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
      />

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        ログイン
      </button>
    </form>
  );
};

export default LoginForm;
