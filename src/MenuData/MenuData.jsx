export default function MenuData({ items, handleItemChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Master Data Master & Saldo Awal (Periode Lalu)</h2>
      <p className="text-sm text-gray-500 mb-4">Gunakan menu ini untuk mengonfigurasi katalog master barang beserta saldo bawaan dari stok opname periode sebelumnya.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-gray-300 font-semibold">
              <th className="p-3 w-16 text-center">No</th>
              <th className="p-3">Nama Barang</th>
              <th className="p-3 w-44 text-right">Harga Satuan (Rp)</th>
              <th className="p-3 w-36 text-center">Kuantitas Saldo Awal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-slate-50">
                <td className="p-3 text-center text-gray-400 font-mono">{index + 1}</td>
                <td className="p-3 font-medium text-gray-800">{item.nama}</td>
                <td className="p-3 text-right">
                  <input type="number" min="0" value={item.harga} onChange={(e) => handleItemChange(item.id, 'harga', e.target.value)} className="border rounded px-2 py-0.5 text-right w-36 focus:ring-emerald-500 focus:outline-none" />
                </td>
                <td className="p-3 text-center">
                  <input type="number" min="0" value={item.saldoAwal} onChange={(e) => handleItemChange(item.id, 'saldoAwal', e.target.value)} className="border rounded px-2 py-0.5 text-center w-24 bg-yellow-50/50 font-medium focus:ring-emerald-500 focus:outline-none" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}