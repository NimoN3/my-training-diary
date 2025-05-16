import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Entry = {
  date: string;
  menu: string;
  note: string;
};

export default function LogsPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('logEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    localStorage.setItem('logEntries', JSON.stringify(updated));
  };

  const handleEdit = (index: number) => {
    const entry = entries[index];
    localStorage.setItem('tempEntry', JSON.stringify(entry));
    localStorage.setItem('editIndex', index.toString());
    router.push('/');  // ここもパスを合わせてください
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">練習記録一覧</h1>
      {entries.length === 0 ? (
        <p>まだ投稿がありません。</p>
      ) : (
        entries.map((entry, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <div className="font-semibold">📅 {entry.date}</div>
            <div>🏋️ {entry.menu}</div>
            <div className="text-sm text-gray-700 mt-2">📝 {entry.note}</div>

            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(index)} className="text-blue-500">編集</button>
              <button onClick={() => handleDelete(index)} className="text-red-500">削除</button>
            </div>
          </div>
        ))
      )}

      <button
        onClick={() => router.push('/')}  // 投稿画面のパスに合わせてね
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        新しく投稿する
      </button>
    </div>
  );
}
