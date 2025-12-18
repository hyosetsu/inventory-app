// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import ItemList from "./components/ItemList"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl font-bold">🏠 家の持ち物リスト</h1>
      </header>
      <main className="p-6">
        <ItemList />
      </main>
    </div>
  );
}

export default App
