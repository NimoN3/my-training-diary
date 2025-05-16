import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Entry = {
  date: string;
  menu: string;
  note: string;
};

export default function ConfirmPage() {
  const router = useRouter();
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const temp = localStorage.getItem('tempEntry');
    if (temp) {
      setEntry(JSON.parse(temp));
    }
  }, []);

  const handleSubmit = () => {
  if (!entry) return;

  const existing = JSON.parse(localStorage.getItem('logEntries') || '[]');
  const editMode = localStorage.getItem('editMode');
  const editIndex = parseInt(localStorage.getItem('editIndex') || '-1');

  if (editMode && !isNaN(editIndex)) {
    existing[editIndex] = entry;
  } else {
    existing.push(entry);
  }

  localStorage.setItem('logEntries', JSON.stringify(existing));
  localStorage.removeItem('tempEntry');
  localStorage.removeItem('editMode');
  localStorage.removeItem('editIndex');

  router.push('/logs');
};

  if (!entry) return <p>読み込み中...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">確認画面</h1>
      <div className="mb-2">📅 日付: {entry.date}</div>
      <div className="mb-2">🏋️ 練習メニュー: {entry.menu}</div>
      <div className="mb-4">📝 感想: {entry.note}</div>

      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
        投稿する
      </button>
      <button onClick={() => router.back()} className="bg-gray-400 text-white px-4 py-2 rounded">
        戻る
      </button>
    </div>
  );
}
