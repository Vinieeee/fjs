import { useState, useEffect } from "react";

export default function MenuSavedLaporan({ formatRupiah }) {
    const [historyKeys, setHistoryKeys] = useState([]);
    const [selectedKey, setSelectedKey] = useState("");
    const [viewData, setViewData] = useState(null);

    // Filter pencarian di dashboard ringkas
    const [filterOutlet, setFilterOutlet] = useState("Semua");
    const [availableOutlets, setAvailableOutlets] = useState([]);

    useEffect(() => {
        // Ambil semua kunci di localStorage yang menyimpan arsip final
        const keys = Object.keys(localStorage).filter(key => key.startsWith("archive_inventory_"));
        
        const uniqueOutlets = new Set();
        const loadedKeys = keys.map(key => {
            try {
                const parsed = JSON.parse(localStorage.getItem(key));
                if (parsed?.meta?.outlet) {
                    uniqueOutlets.add(parsed.meta.outlet);
                }
                return {
                    key: key,
                    outlet: parsed?.meta?.outlet || "Tidak Diketahui",
                    tglMulai: parsed?.meta?.tglMulai || "-",
                    tglSelesai: parsed?.meta?.tglSelesai || "-",
                    savedAt: parsed?.savedAt || "-"
                };
            } catch (e) {
                return null;
            }
        }).filter(Boolean);

        setHistoryKeys(loadedKeys);
        setAvailableOutlets(Array.from(uniqueOutlets));
    }, []);

    // Fungsi membaca data rekaman spesifik
    const handleLoadReport = (key) => {
        setSelectedKey(key);
        const rawData = localStorage.getItem(key);
        if (rawData) {
            setViewData(JSON.parse(rawData));
        }
    };

    // Filter daftar arsip berdasarkan outlet terpilih
    const filteredHistory = historyKeys.filter(item => {
        if (filterOutlet === "Semua") return true;
        return item.outlet === filterOutlet;
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-gray-800">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Riwayat & Arsip Stok Opname</h2>
            <p className="text-sm text-gray-500 mb-6">Pilih lokasi outlet dan periode kerja untuk melihat kembali lembar performa hasil kontrol inventaris sebelumnya.</p>

            {/* Panel Filter Navigasi */}
            <div className="bg-slate-50 p-4 rounded-lg border border-gray-200 flex flex-wrap gap-4 items-end mb-6 no-print">
                <div className="w-64">
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Filter Nama Outlet</label>
                    <select 
                        value={filterOutlet} 
                        onChange={(e) => setFilterOutlet(e.target.value)}
                        className="w-full border rounded p-2 text-sm bg-white focus:ring-emerald-500"
                    >
                        <option value="Semua">-- Tampilkan Semua Cabang --</option>
                        {availableOutlets.map((outlet, i) => (
                            <option key={i} value={outlet}>{outlet}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grid Split Halaman */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Kolom Kiri: Daftar Pilihan Periode Tersedia */}
                <div className="lg:col-span-1 border border-gray-200 rounded-lg overflow-hidden no-print">
                    <div className="bg-slate-800 text-white font-bold p-3 text-sm">
                        Daftar Periode Tersimpan ({filteredHistory.length})
                    </div>
                    <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                        {filteredHistory.length === 0 ? (
                            <div className="p-4 text-center text-gray-400 italic text-sm bg-slate-50/50">
                                Belum ada berkas laporan yang diarsipkan.
                            </div>
                        ) : (
                            filteredHistory.map((item) => (
                                <div 
                                    key={item.key}
                                    onClick={() => handleLoadReport(item.key)}
                                    className={`p-3 text-xs cursor-pointer transition ${selectedKey === item.key ? 'bg-emerald-50 border-l-4 border-emerald-500 font-semibold' : 'hover:bg-slate-50'}`}
                                >
                                    <div className="text-gray-900 font-bold mb-1 uppercase">{item.outlet}</div>
                                    <div className="text-gray-600 mb-1">Periode: {item.tglMulai} s/d {item.tglSelesai}</div>
                                    <div className="text-[10px] text-gray-400">Disimpan pada: {new Date(item.savedAt).toLocaleString('id-ID')}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Kolom Kanan: Viewer Dokumen Riwayat */}
                <div className="lg:col-span-2 border border-gray-200 rounded-lg p-4 bg-slate-50/30">
                    {!viewData ? (
                        <div className="h-48 flex flex-col items-center justify-center text-gray-400 italic text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v13a2 2 0 01-2 2z" />
                            </svg>
                            Silakan pilih salah satu data periode laporan di sebelah kiri untuk meninjau riwayat hasil.
                        </div>
                    ) : (
                        <div id="printArea" className="bg-white p-4 border rounded shadow-sm">
                            <div className="border border-gray-300 text-center py-2 mb-1 bg-slate-100 font-bold italic uppercase text-slate-700">
                                REKAP HISTORIS: {viewData.meta.outlet.toUpperCase()}
                            </div>
                            <div className="border-x border-b border-gray-300 px-4 py-1.5 mb-4 text-xs font-bold text-gray-600 bg-white">
                                PERIODE KERJA: {viewData.meta.tglMulai} s/d {viewData.meta.tglSelesai}
                            </div>

                            {/* Ringkasan Finansial Singkat */}
                            <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                                <div className="p-2 border rounded bg-slate-50">
                                    <span className="text-gray-500 block">Total Item Terdaftar:</span>
                                    <span className="font-bold text-gray-800">{viewData.items?.length || 0} entri barang</span>
                                </div>
                                <div className="p-2 border rounded bg-emerald-50">
                                    <span className="text-emerald-600 block">Waktu Penguncian Data:</span>
                                    <span className="font-bold text-emerald-800">{new Date(viewData.savedAt).toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            {/* Pratinjau Mini Tabel Historis */}
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-[11px]">
                                    <thead>
                                        <tr className="bg-slate-100 text-gray-700 font-bold">
                                            <th className="border border-gray-300 p-1 text-center">No</th>
                                            <th className="border border-gray-300 p-1">Nama Barang</th>
                                            <th className="border border-gray-300 p-1 text-center">Awal</th>
                                            <th className="border border-gray-300 p-1 text-center">GR</th>
                                            <th className="border border-gray-300 p-1 text-center text-red-500">Buang</th>
                                            <th className="border border-gray-300 p-1 text-center bg-purple-50">Fisik</th>
                                            <th className="border border-gray-300 p-1 text-right">Nilai Selisih</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewData.items?.map((item, idx) => {
                                            const buang = (item.pecah || 0) + (item.rusak || 0) + (item.tamu || 0) + (item.lainnya || 0);
                                            const sldAkhir = (item.saldoAwal || 0) + (item.gr || 0) - buang;
                                            const fisik = item.fisikRevisi !== null ? item.fisikRevisi : (item.fisikCek !== null ? item.fisikCek : 0);
                                            const selisih = fisik - sldAkhir;

                                            return (
                                                <tr key={idx} className="border-b border-gray-200 hover:bg-slate-50">
                                                    <td className="border border-gray-300 p-1 text-center text-gray-400">{idx + 1}</td>
                                                    <td className="border border-gray-300 p-1 font-medium">{item.nama}</td>
                                                    <td className="border border-gray-300 p-1 text-center">{item.saldoAwal}</td>
                                                    <td className="border border-gray-300 p-1 text-center text-blue-600">{item.gr || '-'}</td>
                                                    <td className="border border-gray-300 p-1 text-center text-red-400">{buang || '-'}</td>
                                                    <td className="border border-gray-300 p-1 text-center font-bold bg-purple-50/40">{fisik}</td>
                                                    <td className={`border border-gray-300 p-1 text-right font-bold ${selisih < 0 ? 'text-red-600' : 'text-gray-700'}`}>
                                                        {formatRupiah(selisih * item.harga)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}