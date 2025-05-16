import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { saveLog } from '@/lib/saveLog';  // ← ここを追加

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

  // ここを async 関数に変更！
  const handleSubmit = async () => {
    if (!entry) return;

    // Supabaseに保存する
    const { data, error } = await saveLog(entry);

    if (error) {
      alert('保存に失敗しました。もう一度試してください。');
      return;
    }

    // 保存成功したらローカルの仮保存を消してリダイレクト
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
