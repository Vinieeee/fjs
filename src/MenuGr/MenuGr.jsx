export default function MenuGr({ grInputText, setGrInputText, processGRInput }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Perekaman Data Barang Masuk (Goods Receipt)</h2>
      <p className="text-sm text-gray-500 mb-4">Salin (Copy) tabel baris data dari spreadsheet GR Anda, lalu tempelkan (Paste) langsung ke kotak area teks di bawah ini.</p>
      <textarea value={grInputText} onChange={(e) => setGrInputText(e.target.value)} rows="8" className="w-full border rounded p-3 font-mono text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contoh format tempel (Tab-Separated):&#10;STO0049&#10;FLAME GUN GAS KALENG..."></textarea>
      <button onClick={processGRInput} className="mt-3 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded font-medium text-sm shadow transition">Proses & Integrasikan Data GR</button>
    </div>
  );
}