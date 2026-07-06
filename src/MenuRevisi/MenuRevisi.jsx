export default function MenuRevisi({ items, handleItemChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Form Kuantitas Revisi</h2>
      <p className="text-sm text-gray-500 mb-4">Gunakan halaman ini pasca-pengecekan apabila terdapat kekeliruan hitung atau penyesuaian angka final item di outlet.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-gray-300 font-semibold">
              <th className="p-3 w-16 text-center">No</th>
              <th className="p-3">Nama Barang</th>
              <th className="p-3 bg-purple-50 w-44 text-center">Fisik Sebelum</th>
              <th className="p-3 bg-amber-50 w-48 text-center">Fisik Hasil Revisi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-slate-50">
                <td className="p-3 text-center text-gray-400 font-mono">{index + 1}</td>
                <td className="p-3 font-medium text-gray-800">{item.nama}</td>
                <td className="p-3 bg-purple-50/40 text-center text-purple-700 font-medium">{item.fisikCek !== null ? item.fisikCek : "Belum di-Cek"}</td>
                <td className="p-3 bg-amber-50/30 text-center">
                  <input type="number" min="0" value={item.fisikRevisi !== null ? item.fisikRevisi : ""} onChange={(e) => handleItemChange(item.id, 'fisikRevisi', e.target.value)} className="border rounded px-3 py-1 text-center w-32 focus:ring-amber-500 focus:outline-none" placeholder="Sesuai Hasil Cek" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}