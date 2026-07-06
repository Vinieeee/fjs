export default function MenuHasil({ items, meta, setMeta, formatDate, formatRupiah }) {

    const formatShortDate = (dateStr) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleDateString('id-ID', { month: 'long' });
        const year = date.getFullYear().toString().substring(2);
        return `${day} ${month}'${year}`;
    };

    const currentYear = meta.tglMulai ? new Date(meta.tglMulai).getFullYear() : new Date().getFullYear();

    // Filter item baru masuk (saldoAwal = 0 DAN gr > 0)
    const barangBaru = items.filter(item => item.saldoAwal === 0 && item.gr > 0);

    // Hitung total tabel utama
    let totalNilaiSelisihUtama = 0;
    items.forEach(item => {
        const totalBuang = item.pecah + item.rusak + item.tamu + item.lainnya;
        const saldoAkhir = item.saldoAwal + item.gr - totalBuang;
        let fisikAktual = item.fisikRevisi !== null ? item.fisikRevisi : (item.fisikCek !== null ? item.fisikCek : 0);
        const selisih = fisikAktual - saldoAkhir;
        totalNilaiSelisihUtama += (selisih * item.harga);
    });

    // Filter barang rentan beban 25%
    const kataKunciBahan = ['KACA', 'KERAMIK', 'CLAY', 'GELAS'];
    const barangBeban = items.filter(item => {
        const matchesBahan = kataKunciBahan.some(kunci => item.nama.toUpperCase().includes(kunci));
        const adaKerusakan = (item.pecah > 0 || item.rusak > 0);
        return matchesBahan && adaKerusakan;
    });

    let totalBeban25 = 0;
    barangBeban.forEach(item => {
        const qtyRusak = item.pecah + item.rusak;
        totalBeban25 += (qtyRusak * item.harga * 0.25);
    });

    const totalAkhirKeseluruhan = totalNilaiSelisihUtama - totalBeban25;
    const saveCurrentReportToArchive = () => {
        if (!meta.outlet || !meta.tglMulai || !meta.tglSelesai) {
            alert("Nama outlet dan berkas tanggal periode belum valid!");
            return;
        }

        // Gunakan penanda kunci unik berbasis timestamp arsip
        const archiveKey = `archive_inventory_${meta.outlet.replace(/\s+/g, '_')}_${meta.tglMulai}`;
        const payload = {
            meta,
            items,
            savedAt: new Date().toISOString()
        };

        localStorage.setItem(archiveKey, JSON.stringify(payload));
        alert(`Sukses! Laporan SO untuk ${meta.outlet} periode ini berhasil dikunci dan diarsipkan.`);
    };
    // Objek kamus untuk menerjemahkan value singkatan menjadi teks output panjang
    const namaOutletPanjang = {
        "NCBC": "NELAYAN CAFE BRASTAGI CEMARA",
        "NIS": "NELAYAN IRIAN",
        "J2MF": "JALA - JALA 2  MF",
        "SUKICP": "SUKI CENTER POINT",
        "MJ": "MIE JARING",
        "BSM": "JALA - JALA CAFE BINJAI",
        "MRL": "NELAYAN CAFE  MARELAN",
        "CMB": "SUKI CAMBRIDGE",
        "NKPM": "NKPM",
        "NFPM": "JL2 NF (FOOD COURT)",
        "RCW": "JALA - JALA CAFE RCW",
        "NS": "NELAYAN CORNER NUANSA",
        "MHT": "JALA - JALA MANHATAN",
        "LIUS-II": "LIUS II",
        "RESTO": "RESTO",
        "NBC": "NO BRAND CAFE",
        "LGC": "LIUS GARDEN"
    };

    // Ambil nama panjang berdasarkan apa yang sedang di-select, 
    // jika tidak terdaftar di kamus, gunakan teks asli dari input meta.outlet
    const outletDisplay = namaOutletPanjang[meta.outlet] || meta.outlet;
    return (
        <>


            {/* Area Cetak Laporan */}
            <div id="printArea" className="max-w-7xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 text-gray-800">
                <div className="flex bg-white p-4 rounded-lg shadow-sm border border-gray-200 justify-between items-center">
                    <div className="flex flex-wrap gap-4 ">
                        {/* Meta Konfigurasi Outlet & Tanggal */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nama Outlet</label>
                            <select
                                value={meta.outlet}
                                onChange={(e) => setMeta({ ...meta, outlet: e.target.value })}
                                className="border rounded px-3 py-1.5 w-64 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm h-[38px]"
                            >
                                {/* value menggunakan singkatan, teks di dalam option menggunakan nama yang rapi */}
                                <option value="NCBC">BSM</option>
                                <option value="NIS">NIS</option>
                                <option value="J2MF">J2MF</option>
                                <option value="SUKICP">SUKICP</option>
                                <option value="MJ">MJ</option>
                                <option value="BSM">BSM</option>
                                <option value="MRL">MRL</option>
                                <option value="CMB">CMB</option>
                                <option value="SKCP">SKCP</option>
                                <option value="NKPM">NKPM</option>
                                <option value="NFPM">NFPM</option>
                                <option value="RCW">RCW</option>
                                <option value="NS">NS</option>
                                <option value="MHT">MHT</option>
                                <option value="LIUS-II">LIUS II</option>
                                <option value="RESTO">RESTO</option>
                                <option value="NBC">NBC</option>
                                <option value="LGC">LGC</option>

                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tanggal Mulai</label>
                            <input
                                type="date"
                                value={meta.tglMulai}
                                onChange={(e) => setMeta({ ...meta, tglMulai: e.target.value })}
                                className="border rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tanggal Selesai</label>
                            <input
                                type="date"
                                value={meta.tglSelesai}
                                onChange={(e) => setMeta({ ...meta, tglSelesai: e.target.value })}
                                className="border rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>
                    <div className="no-print flex flex-col items-end gap-2">
                        <button onClick={saveCurrentReportToArchive} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium shadow flex items-center gap-2 transition">
                            💾 Simpan Lembar Arsip
                        </button>
                        <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium shadow flex items-center gap-2 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="2 2 20 20" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Cetak / Print Laporan
                        </button>
                    </div>
                </div>
            </div>
            <div id="printArea" className="max-w-7xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 text-gray-800">
                {/* --- Bagian Judul Laporan --- */}
                <div className="border border-gray-300 text-center py-2 mb-1 rounded-t-lg bg-slate-50">
                    <h1 className="text-xl font-bold italic tracking-wide uppercase text-slate-700">
                        DAFTAR INVENTORY {outletDisplay.toUpperCase()} / {currentYear}
                    </h1>
                </div>

                {/* --- Bagian Tanggal Periode Laporan --- */}
                <div className="border-x border-b border-gray-300 px-4 py-1.5 mb-6 text-sm font-bold flex bg-white rounded-b-lg">
                    <span className="w-12 text-gray-500">TGL:</span>
                    <span className="text-gray-700">{formatShortDate(meta.tglMulai)}  -  {formatShortDate(meta.tglSelesai)}</span>
                </div>

                {/* --- TABEL UTAMA --- */}
                <div className="overflow-x-auto mb-6">
                    <table className="w-full text-left border-collapse border border-gray-300 text-xs">
                        <thead>
                            <tr className="text-center font-bold border-b border-gray-300 text-slate-700 bg-slate-100">
                                <th rowSpan="2" className="border border-gray-300 p-2 w-10">No.</th>
                                <th rowSpan="2" className="border border-gray-300 p-2 w-72 text-left">Nama Barang</th>
                                <th rowSpan="2" className="border border-gray-300 p-2 w-24 text-right">Harga</th>
                                <th rowSpan="2" className="border border-gray-300 p-2 w-16 bg-yellow-50/60">Saldo Awal</th>
                                <th rowSpan="2" className="border border-gray-300 p-2 w-16 bg-blue-50/60">G.INV</th>
                                <th colSpan="2" className="border border-gray-300 p-1 bg-slate-50">B T G I</th>
                                <th colSpan="4" className="border border-gray-300 p-1 bg-red-50/60">COSTING REPORT</th>
                                <th colSpan="2" className="border border-gray-300 p-1 bg-slate-50">B T C R</th>
                                <th rowSpan="2" className="border border-gray-300 p-2 w-16 bg-emerald-50/60">Saldo Akhir</th>
                                <th rowSpan="2" className="border border-gray-300 p-2 w-16 bg-purple-50/60">Fisik</th>
                                <th rowSpan="2" className="border border-gray-300 p-2 w-12">=+/-</th>
                                <th rowSpan="2" className="border border-gray-300 p-2 w-24 text-right">Jumlah</th>
                            </tr>
                            <tr className="bg-slate-50 text-center text-[10px] font-bold border-b border-gray-300 text-slate-600">
                                <th className="border border-gray-300 p-1 w-10">No</th>
                                <th className="border border-gray-300 p-1 w-12">Tgl</th>
                                <th className="border border-gray-300 p-1 w-12 bg-red-50/30">Pecah</th>
                                <th className="border border-gray-300 p-1 w-12 bg-red-50/30">Rusak</th>
                                <th className="border border-gray-300 p-1 w-12 bg-red-50/30">Tamu</th>
                                <th className="border border-gray-300 p-1 w-12 bg-red-50/30">Lain2</th>
                                <th className="border border-gray-300 p-1 w-10">No</th>
                                <th className="border border-gray-300 p-1 w-12">Tgl</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => {
                                const totalBuang = item.pecah + item.rusak + item.tamu + item.lainnya;
                                const saldoAkhir = item.saldoAwal + item.gr - totalBuang;
                                let fisikAktual = item.fisikRevisi !== null ? item.fisikRevisi : (item.fisikCek !== null ? item.fisikCek : 0);
                                const selisih = fisikAktual - saldoAkhir;
                                const nilaiSelisih = selisih * item.harga;

                                return (
                                    <tr key={item.id} className="border-b border-gray-200 hover:bg-slate-50/80 text-gray-700">
                                        <td className="border border-gray-300 p-1.5 text-center text-gray-400">{index + 1}</td>
                                        <td className="border border-gray-300 p-1.5 font-medium text-gray-900">{item.nama}</td>
                                        <td className="border border-gray-300 p-1.5 text-right">{formatRupiah(item.harga)}</td>
                                        <td className="border border-gray-300 p-1.5 text-center">{item.saldoAwal}</td>
                                        <td className="border border-gray-300 p-1.5 text-center font-semibold text-blue-600">{item.gr || '-'}</td>
                                        <td className="border border-gray-300 p-1.5 text-center text-gray-300">-</td>
                                        <td className="border border-gray-300 p-1.5 text-center text-gray-300">-</td>
                                        <td className="border border-gray-300 p-1.5 text-center text-red-500">{item.pecah || '-'}</td>
                                        <td className="border border-gray-300 p-1.5 text-center text-red-500">{item.rusak || '-'}</td>
                                        <td className="border border-gray-300 p-1.5 text-center text-red-500">{item.tamu || '-'}</td>
                                        <td className="border border-gray-300 p-1.5 text-center text-red-500">{item.lainnya || '-'}</td>
                                        <td className="border border-gray-300 p-1.5 text-center text-gray-300">-</td>
                                        <td className="border border-gray-300 p-1.5 text-center text-gray-300">-</td>
                                        <td className="border border-gray-300 p-1.5 text-center font-bold bg-emerald-50/10">{saldoAkhir}</td>
                                        <td className="border border-gray-300 p-1.5 text-center font-bold bg-purple-50/10">{fisikAktual}</td>
                                        <td className={`border border-gray-300 p-1.5 text-center font-bold ${selisih < 0 ? 'text-red-600' : selisih > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                                            {selisih === 0 ? '-' : selisih > 0 ? `+${selisih}` : selisih}
                                        </td>
                                        <td className={`border border-gray-300 p-1.5 text-right font-bold ${nilaiSelisih < 0 ? 'text-red-600' : nilaiSelisih > 0 ? 'text-blue-600' : 'text-gray-900'}`}>
                                            {formatRupiah(nilaiSelisih)}
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* Baris Total Utama */}
                            <tr className="bg-slate-100 font-bold border-t border-gray-300">
                                <td colSpan="16" className="border border-gray-300 p-2 text-right uppercase text-gray-600 text-[11px]">TOTAL SELISIH UTAMA</td>
                                <td className={`border border-gray-300 p-2 text-right text-[13px] ${totalNilaiSelisihUtama < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                                    {formatRupiah(totalNilaiSelisihUtama)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* --- KELOMPOK TABEL BARANG BARU BELUM DI DAFTARKAN --- */}
                <div className="mb-6">
                    <div className="bg-slate-100 border border-gray-300 border-b-0 text-center font-bold p-1.5 text-xs uppercase text-slate-700 rounded-t-lg">
                        DAFTAR ITEM BARU BELUM DI DAFTARKAN
                    </div>
                    <table className="w-full text-left border-collapse border border-gray-300 text-xs">
                        <tbody>
                            {barangBaru.length === 0 ? (
                                <tr>
                                    <td className="border border-gray-300 p-4 text-center text-gray-400 italic font-medium bg-slate-50/30 rounded-b-lg">
                                        Tidak ada barang baru dari GR data perusahaan
                                    </td>
                                </tr>
                            ) : (
                                barangBaru.map((item, idx) => {
                                    let fisikAktual = item.fisikRevisi !== null ? item.fisikRevisi : (item.fisikCek !== null ? item.fisikCek : 0);
                                    const selisih = fisikAktual - item.gr;
                                    return (
                                        <tr key={item.id} className="border-b border-gray-200 hover:bg-slate-50">
                                            <td className="border border-gray-300 p-2 text-center w-10 text-gray-400">{idx + 1}</td>
                                            <td className="border border-gray-300 p-2 w-72 font-medium">{item.nama}</td>
                                            <td className="border border-gray-300 p-2 text-right w-24">{formatRupiah(item.harga)}</td>
                                            <td className="border border-gray-300 p-2 text-center w-16 text-gray-400">0</td>
                                            <td className="border border-gray-300 p-2 text-center w-16 text-blue-600 font-bold">{item.gr}</td>
                                            <td className="border border-gray-300 p-2 text-center font-bold w-16">{item.gr}</td>
                                            <td className="border border-gray-300 p-2 text-center font-bold w-16">{fisikAktual}</td>
                                            <td className="border border-gray-300 p-2 text-center font-bold w-12">{selisih === 0 ? '-' : selisih}</td>
                                            <td className="border border-gray-300 p-2 text-right font-bold w-24">{formatRupiah(selisih * item.harga)}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- KELOMPOK TABEL PEMBEBANAN 25% --- */}
                <div className="mb-8">
                    <div className="bg-slate-100 border border-gray-300 border-b-0 text-center font-bold p-1.5 text-xs uppercase text-slate-700 rounded-t-lg">
                        DAFTAR PEMBEBANAN 25% BARANG RUSAK BERBAHAN KACA, KERAMIK DAN CLAY
                    </div>
                    <table className="w-full text-left border-collapse border border-gray-300 text-xs">
                        <tbody>
                            {barangBeban.length === 0 ? (
                                <tr>
                                    <td className="border border-gray-300 p-4 text-center text-gray-400 italic bg-slate-50/30">
                                        Tidak ada pembebanan kerusakan bahan rentan (kaca/keramik/clay).
                                    </td>
                                </tr>
                            ) : (
                                barangBeban.map((item, idx) => {
                                    const qtyRusak = item.pecah + item.rusak;
                                    const bebanNilai = qtyRusak * item.harga * 0.25;
                                    return (
                                        <tr key={item.id} className="border-b border-gray-200 hover:bg-slate-50">
                                            <td className="border border-gray-300 p-2 text-center w-10 text-gray-400">{idx + 1}</td>
                                            <td className="border border-gray-300 p-2 w-72 font-medium">{item.nama} <span className="text-gray-400 font-normal">(x{qtyRusak})</span></td>
                                            <td className="border border-gray-300 p-2 text-center w-24 font-bold text-red-500">-25%</td>
                                            <td className="border border-gray-300 p-2 text-right text-red-600 font-bold w-24">{formatRupiah(-bebanNilai)}</td>
                                        </tr>
                                    );
                                })
                            )}
                            {/* Subtotal Pembebanan */}
                            <tr className="bg-slate-50 font-bold border-t border-gray-300 text-gray-600">
                                <td className="border border-gray-300 p-2 text-right uppercase" colSpan={barangBeban.length === 0 ? 1 : 3}>TOTAL PEMBEBANAN</td>
                                <td className="border border-gray-300 p-2 text-right text-red-600 font-bold text-[13px]">({formatRupiah(totalBeban25)})</td>
                            </tr>
                            {/* TOTAL AKHIR LAPORAN */}
                            <tr className="bg-slate-200 font-bold text-xs border-t border-gray-300 text-slate-800">
                                <td className="border border-gray-300 p-2.5 text-right uppercase text-[11px]" colSpan={barangBeban.length === 0 ? 1 : 3}>TOTAL AKHIR KESELURUHAN</td>
                                <td className={`border border-gray-300 p-2.5 text-right font-black text-[14px] ${totalAkhirKeseluruhan < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {formatRupiah(totalAkhirKeseluruhan)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* --- BAGIAN APPROVAL / TANDA TANGAN --- */}
                <div className="mt-12 grid grid-cols-3 text-center text-xs font-bold text-slate-600">
                    <div className="flex flex-col justify-between h-24 border border-transparent">
                        <span>DiBuat Oleh</span>
                        <div>
                            <span className="underline block text-slate-800">Staf Inventory cabang</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-24 border border-transparent">
                        <span>Diketahui Oleh,</span>
                        <div>
                            <span className="underline block text-slate-800">Penanggung Jawab</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-24 border border-transparent">
                        <span>Diketahui Oleh,</span>
                        <div>
                            <span className="underline block text-slate-800">Inventory Pusat</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}