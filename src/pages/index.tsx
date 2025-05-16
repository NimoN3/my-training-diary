import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [menu, setMenu] = useState('');
  const [note, setNote] = useState('');

  const handleNext = () => {
  const entry = { date, menu, note };
  localStorage.setItem('tempEntry', JSON.stringify(entry));

  const editIndex = localStorage.getItem('editIndex');
  if (editIndex !== null) {
    localStorage.setItem('editMode', 'true');
  }

  router.push('/confirm');
};

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">練習日誌入力</h1>

      <label className="block mb-2">
        日付:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <label className="block mb-2">
        練習メニュー:
        <input type="text" value={menu} onChange={e => setMenu(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <label className="block mb-4">
        感想:
        <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">
        次へ
      </button>
    </div>
  );
}
