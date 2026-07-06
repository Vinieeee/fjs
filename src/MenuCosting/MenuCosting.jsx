export default function MenuCosting({ items, costingLogs, selectedItemId, setSelectedItemId, costQty, setCostQty, costCategory, setCostCategory, submitCosting, deleteCosting }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Form Pembuangan Barang Outlet (Costing Report)</h2>
      <p className="text-sm text-gray-500 mb-6">Mencatat barang yang dibuang/dihapuskan dari outlet berdasarkan penggolongan jenis kondisi.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg border mb-6">
        <div>
          <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Pilih Item Barang</label>
          <select value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)} className="w-full border rounded p-2 text-sm bg-white focus:ring-emerald-500">
            {items.map(it => <option key={it.id} value={it.id}>{it.nama}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Jumlah (Qty)</label>
          <input type="number" min="1" value={costQty} onChange={(e) => setCostQty(parseInt(e.target.value) || 1)} className="w-full border rounded p-2 text-sm focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Golongan Kondisi</label>
          <select value={costCategory} onChange={(e) => setCostCategory(e.target.value)} className="w-full border rounded p-2 text-sm bg-white focus:ring-emerald-500">
            <option value="pecah">Pecah</option>
            <option value="rusak">Rusak</option>
            <option value="tamu">Tamu (Dirusak Tamu)</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={submitCosting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded font-medium text-sm shadow transition">Tambah ke Record</button>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-700 mb-2">Riwayat Input Penggolongan Pembuangan Barang:</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-100 border-b font-bold text-gray-600">
              <th className="p-2 w-12 text-center">No</th>
              <th className="p-2">Nama Barang</th>
              <th className="p-2 text-center w-24">Qty</th>
              <th className="p-2 text-center w-32">Kondisi</th>
              <th className="p-2 text-center w-20">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {costingLogs.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-400 italic">Belum ada record barang dibuang.</td></tr>
            ) : (
              costingLogs.map((log, index) => {
                const targetItem = items.find(it => it.id === log.barangId);
                return (
                  <tr key={index} className="border-b hover:bg-slate-50">
                    <td className="p-2 text-center text-gray-400 font-mono">{index + 1}</td>
                    <td className="p-2 font-medium">{targetItem ? targetItem.nama : 'Tidak Diketahui'}</td>
                    <td className="p-2 text-center font-bold text-gray-700">{log.qty}</td>
                    <td className="p-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${log.kategori === 'pecah' ? 'bg-red-100 text-red-700' : log.kategori === 'rusak' ? 'bg-orange-100 text-orange-700' : log.kategori === 'tamu' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{log.kategori}</span>
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => deleteCosting(index)} className="text-red-500 hover:text-red-700 font-medium">Hapus</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}