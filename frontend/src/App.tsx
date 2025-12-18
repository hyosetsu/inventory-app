import { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import LoginForm from "./components/LoginForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(false);

  // 🔹 ログアウト関数を追加
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4 shadow-md flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">
          🏠 家の持ち物リスト {loggedIn ? "（ログイン中）" : ""}
        </h1>

        {/* 🔹 ログイン中のみログアウトボタンを表示 */}
        {loggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            ログアウト
          </button>
        )}
      </header>

      <main className="p-6">
        {!loggedIn ? (
          <LoginForm onLogin={() => setLoggedIn(true)} />
        ) : (
          <>
            <ItemForm onSuccess={() => setRefresh(!refresh)} />
            <ItemList key={String(refresh)} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
