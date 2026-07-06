export default function MenuCek({ items, handleItemChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Form Pengecekan Fisik di Outlet</h2>
      <p className="text-sm text-gray-500 mb-4">Masukkan jumlah kuantitas fisik riil item yang ditemukan di dalam outlet saat pemeriksaan lapangan.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-gray-300 font-semibold">
              <th className="p-3 w-16 text-center">No</th>
              <th className="p-3">Nama Barang</th>
              <th className="p-3 bg-yellow-50 w-32 text-center">Saldo Awal</th>
              <th className="p-3 bg-purple-50 w-48 text-center">Kuantitas Fisik Outlet</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-slate-50">
                <td className="p-3 text-center text-gray-400 font-mono">{index + 1}</td>
                <td className="p-3 font-medium text-gray-800">{item.nama}</td>
                <td className="p-3 bg-yellow-50/40 text-center text-gray-600">{item.saldoAwal}</td>
                <td className="p-3 bg-purple-50/30 text-center">
                  <input type="number" min="0" value={item.fisikCek !== null ? item.fisikCek : ""} onChange={(e) => handleItemChange(item.id, 'fisikCek', e.target.value)} className="border rounded px-3 py-1 text-center w-28 focus:ring-purple-500 focus:outline-none" placeholder="Belum Cek" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}