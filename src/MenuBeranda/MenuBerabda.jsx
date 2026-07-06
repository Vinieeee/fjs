import { useState, useEffect } from 'react';
import MenuHasil from './MenuHasil/MenuHasil';
import MenuCek from './MenuCek/MenuCek';
import MenuRevisi from './MenuRevisi/MenuRevisi';
import MenuGr from './MenuGr/MenuGr';
import MenuCosting from './MenuCosting/MenuCosting';
import MenuData from './MenuData/MenuData';
import MenuSavedLaporan from "./MenuSavedLaporan/MenuSavedLaporan";

const MASTER_ITEMS_DEFAULT = [
  { id: 1, nama: "BOX CONTAINER BESAR 125 L", harga: 115000, saldoAwal: 0 },
  { id: 2, nama: "ACRYLIC STAND DISPLAY 10x15x15", harga: 38000, saldoAwal: 1 },
  { id: 3, nama: "ACRYLIC STANDING LOLLIPOP (12 LUBANG) 18 CM x 13,5 CM", harga: 100000, saldoAwal: 1 },
  { id: 4, nama: "ACRYLIC STANDING LOLLIPOP (16 LUBANG) 18 CM x 18 CM", harga: 140000, saldoAwal: 1 },
  { id: 5, nama: "ALAS CANGKIR ESPRESSO 60 ML", harga: 1000, saldoAwal: 8 },
  { id: 6, nama: "ALAS PIRING HOT PLATE BULAT 22 CM", harga: 50000, saldoAwal: 25 },
  { id: 7, nama: "ALAS PIRING HOT PLATE OVAL ( 27 x 17,5 CM )", harga: 51750, saldoAwal: 19 },
  { id: 8, nama: "ALAS STEAMER 12\"", harga: 41400, saldoAwal: 2 },
  { id: 9, nama: "ALAS STEAMER 17\"", harga: 55611, saldoAwal: 6 },
  { id: 10, nama: "ALAS TUTUP ACRILIC PETAK 50 X 35 X 3 CM", harga: 230000, saldoAwal: 1 },
  { id: 11, nama: "ASBAK ROKOK KERAMIK PUTIH", harga: 17300, saldoAwal: 2 },
  { id: 12, nama: "BAKI BULAT KARET 35 CM / 14\"", harga: 63250, saldoAwal: 20 },
  { id: 13, nama: "BAKI PETAK KARET ( 35 x 55,5 CM ) / 22\"", harga: 81075, saldoAwal: 30 },
  { id: 14, nama: "BAKI PETAK KAYU ( 35 x 55,5 CM ) / 22\"", harga: 218500, saldoAwal: 18 },
  { id: 15, nama: "BAKI PLASTIK BAKERY PT0102 (30 x 44 CM)", harga: 74750, saldoAwal: 8 },
  { id: 16, nama: "BASKOM S/S 16\"", harga: 52000, saldoAwal: 3 },
  { id: 17, nama: "BATU ASAH JSF", harga: 40250, saldoAwal: 4 },
  { id: 18, nama: "BESI ASAH 12\"", harga: 173000, saldoAwal: 1 },
  { id: 19, nama: "BILL COVER", harga: 1000, saldoAwal: 25 },
  { id: 20, nama: "BILL HOLDER 100 CM", harga: 150000, saldoAwal: 4 },
  { id: 21, nama: "BILL HOLDER GETRA 60 CM", harga: 109250, saldoAwal: 2 },
  { id: 22, nama: "BOTOL DOT CABE BESAR 17 CM", harga: 14400, saldoAwal: 25 },
  { id: 23, nama: "BOTOL DOT CABE KECIL 12 CM", harga: 14400, saldoAwal: 27 },
  { id: 24, nama: "BOTOL DOT CABE SEDANG 15 CM", harga: 14375, saldoAwal: 21 },
  { id: 25, nama: "BOTOL SIRUP PLASTIK", harga: 143750, saldoAwal: 6 },
  { id: 26, nama: "BOTOL SOYU ACRYLIC", harga: 31700, saldoAwal: 6 },
  { id: 27, nama: "BOTOL SQUEEZE 3 LUBANG", harga: 11500, saldoAwal: 5 },
  { id: 28, nama: "BOWL MANGO 8\"", harga: 150000, saldoAwal: 24 },
  { id: 29, nama: "BOWL RAMEKINS", harga: 37375, saldoAwal: 21 },
  { id: 30, nama: "BOWL S/S BERLUBANG 14 INC", harga: 22167, saldoAwal: 12 },
  { id: 31, nama: "BOWL S/S BERLUBANG 15 INC", harga: 46000, saldoAwal: 10 },
  { id: 32, nama: "BOWL S/S BERLUBANG D=35 CM T=10 CM", harga: 98000, saldoAwal: 1 },
  { id: 33, nama: "BOWL S/S D = 12\"", harga: 86250, saldoAwal: 16 },
  { id: 34, nama: "BOWL S/S D = 14\"", harga: 86250, saldoAwal: 3 },
  { id: 35, nama: "BOWL S/S D = 8\"", harga: 18000, saldoAwal: 12 },
  { id: 36, nama: "BOWL S/S D=26 CM T=11 CM", harga: 35000, saldoAwal: 6 },
  { id: 37, nama: "BOWL SALAD BREWSUNIQ BLACK - KEMURI", harga: 119000, saldoAwal: 5 },
  { id: 38, nama: "BOX CONTAINER CUP CHINESE TEA", harga: 100000, saldoAwal: 1 },
  { id: 39, nama: "BOX PLASTIK TWINPAN CB 900 S 18 x 12 x 4 CM", harga: 6900, saldoAwal: 27 },
  { id: 40, nama: "BRUSH KAIN", harga: 11500, saldoAwal: 5 },
  { id: 41, nama: "BRUSH KAWAT", harga: 18000, saldoAwal: 1 },
  { id: 42, nama: "BRUSH LANTAI + GAGANG", font: 16100, saldoAwal: 5 },
  { id: 43, nama: "CABINET PLASTIK 3 TINGKAT LIONSTAR", harga: 80500, saldoAwal: 1 },
  { id: 44, nama: "CANGKIR CAPPUCINO 170 ML", harga: 1000, saldoAwal: 8 },
  { id: 45, nama: "CANGKIR ESPRESSO 60ML", harga: 28750, saldoAwal: 4 },
  { id: 46, nama: "CANGKIR LITERAN 1 LITER", harga: 23000, saldoAwal: 8 },
  { id: 47, nama: "CANGKIR LITERAN 2 LITER", harga: 46000, saldoAwal: 2 },
  { id: 48, nama: "CANGKIR LITERAN 250 ML", harga: 17250, saldoAwal: 3 },
  { id: 49, nama: "CENTONG S/S BERLUBANG (D=6.5 CM ; P=22 CM)", harga: 22298, saldoAwal: 4 },
  { id: 50, nama: "CENTONG S/S POLOS", harga: 29266, saldoAwal: 3 },
  { id: 51, nama: "CHOPPING BOARD / TELENAN PLASTIK BULAT", harga: 632500, saldoAwal: 5 },
  { id: 52, nama: "CONDIMENT BOX 6 LUBANG", harga: 253000, saldoAwal: 2 },
  { id: 53, nama: "CORONG MINYAK", harga: 20125, saldoAwal: 1 },
  { id: 54, nama: "DESSERT PLATE 6\"", harga: 32200, saldoAwal: 24 },
  { id: 55, nama: "EMBER PLASTIK 4 GALON", harga: 46000, saldoAwal: 2 },
  { id: 56, nama: "EMBER PLASTIK 50 LITER", harga: 51750, saldoAwal: 4 },
  { id: 57, nama: "EMBER PLASTIK 6 GALON", harga: 63250, saldoAwal: 2 },
  { id: 58, nama: "FLAME GUN GAS KALENG", harga: 133975, saldoAwal: 7 },
  { id: 59, nama: "GARPU S/S MERK DOLL BESAR", harga: 6700, saldoAwal: 289 },
  { id: 60, nama: "GASTRO PAN 1/1 T 10 CM", harga: 184000, saldoAwal: 11 },
  { id: 61, nama: "GASTRO PAN 1/2 - 4 T=10 CM", harga: 97750, saldoAwal: 4 },
  { id: 62, nama: "GASTRO PAN 1/2 T:15 CM", harga: 80000, saldoAwal: 2 },
  { id: 63, nama: "GASTRO PAN 1/4 T 10 CM", harga: 70000, saldoAwal: 4 },
  { id: 64, nama: "GASTRO PAN 1/6 T=10 CM", harga: 63300, saldoAwal: 32 },
  { id: 65, nama: "GASTRO PAN 1/9 T=10 CM", harga: 51642, saldoAwal: 24 },
  { id: 66, nama: "GAYUNG PLASTIK GAGANG PANJANG", harga: 6958, saldoAwal: 1 },
  { id: 67, nama: "GELAS BIR", harga: 10000, saldoAwal: 50 },
  { id: 68, nama: "GELAS CHINESE TEA", harga: 10350, saldoAwal: 74 },
  { id: 69, nama: "GELAS HIGHBALL SPECIAL - LONG", harga: 6038, saldoAwal: 7 },
  { id: 70, nama: "GELAS SLOKI", harga: 4000, saldoAwal: 49 },
  { id: 71, nama: "GRATER 4 SISI STAINLESS STEEL", harga: 46000, saldoAwal: 2 },
  { id: 72, nama: "GULUNGAN SUSHI BAMBU", harga: 40318, saldoAwal: 2 },
  { id: 73, nama: "GUNTING BESAR", harga: 20200, saldoAwal: 16 },
  { id: 74, nama: "GUNTING SERBA GUNA", harga: 52785, saldoAwal: 1 },
  { id: 75, nama: "HAND SPRAYER", harga: 31625, saldoAwal: 13 },
  { id: 76, nama: "HANDUK BESAR", harga: 92000, saldoAwal: 5 },
  { id: 77, nama: "HANDUK KECIL (580)", harga: 5000, saldoAwal: 17 },
  { id: 78, nama: "HOCK MASAK 4,5\"", harga: 60000, saldoAwal: 4 },
  { id: 79, nama: "HOCK MASAK 5\"", harga: 63250, saldoAwal: 5 },
  { id: 80, nama: "JAM DINDING", harga: 70000, saldoAwal: 2 },
  { id: 81, nama: "JEPITAN BUAYA 6\"", harga: 17146, saldoAwal: 7 },
  { id: 82, nama: "JEPITAN KERANJANG DIMSUM 8,5\"", harga: 17846, saldoAwal: 15 },
  { id: 83, nama: "JEPITAN KUE ACRYLIC", harga: 40250, saldoAwal: 6 },
  { id: 84, nama: "JEPITAN SAMPAH UNTUK LANTAI", harga: 46000, saldoAwal: 2 },
  { id: 85, nama: "KAIN LAP KANEBO", harga: 15000, saldoAwal: 2 },
  { id: 86, nama: "KAIN PEL + GAGANG", harga: 51750, saldoAwal: 5 },
  { id: 87, nama: "KALKULATOR", harga: 155250, saldoAwal: 6 },
  { id: 88, nama: "KALO BULAT NASI 988", harga: 23000, saldoAwal: 6 },
  { id: 89, nama: "KALO PETAK MERK SHINPO NO. 258", harga: 28750, saldoAwal: 15 },
  { id: 90, nama: "KALO PETAK MERK SHINPO NO.SIP 211", harga: 5700, saldoAwal: 9 },
  { id: 91, nama: "KALO PETAK NO 216 L", harga: 60000, saldoAwal: 4 },
  { id: 92, nama: "KALO PETAK NO 305", harga: 23465, saldoAwal: 15 },
  { id: 93, nama: "KALO PETAK NO 306", harga: 50600, saldoAwal: 15 },
  { id: 94, nama: "KALO PETAK SIP 821 L", harga: 5000, saldoAwal: 3 },
  { id: 95, nama: "KARPET ALAS GELAS", harga: 17310, saldoAwal: 2 },
  { id: 96, nama: "KARPET KARET BERLUBANG", harga: 230000, saldoAwal: 8 },
  { id: 97, nama: "KEMOCENG", harga: 74750, saldoAwal: 2 },
  { id: 98, nama: "KERANJANG DIMSUM 3,5\" (GZ)", harga: 12000, saldoAwal: 78 },
  { id: 99, nama: "KERANJANG YAMCHA SEDANG 15 CM (5 INCH)", harga: 14355, saldoAwal: 143 },
  { id: 100, nama: "KERANJANG SETTING NO. 284", harga: 34500, saldoAwal: 4 },
  { id: 101, nama: "KOCOKAN TELUR", harga: 37950, saldoAwal: 3 },
  { id: 102, nama: "KOMPOR ELEKTRIK", harga: 384794, saldoAwal: 2 },
  { id: 103, nama: "KOMPOR GAS PORTABLE SOLID", harga: 199382, saldoAwal: 1 },
  { id: 104, nama: "KOTAK DICKY", harga: 20125, saldoAwal: 20 },
  { id: 105, nama: "KOTAK KLIP TO KEEP", harga: 40000, saldoAwal: 5 },
  { id: 106, nama: "KOTAK LION STAR 2 LITER", harga: 33350, saldoAwal: 60 },
  { id: 107, nama: "KOTAK LION STAR CLEAR BOX NO.10", harga: 57500, saldoAwal: 19 },
  { id: 108, nama: "KOTAK LION STAR CLEAR BOX NO.20", harga: 92000, saldoAwal: 26 },
  { id: 109, nama: "KOTAK LION STAR CLEAR BOX NO.30", harga: 115000, saldoAwal: 15 },
  { id: 110, nama: "KOTAK NAGATA 5545", harga: 40300, saldoAwal: 8 },
  { id: 111, nama: "KOTAK PLASTIK 5 TINGKAT", harga: 300000, saldoAwal: 2 },
  { id: 112, nama: "KOTAK TISSUE \"NICE\"", harga: 50000, saldoAwal: 48 },
  { id: 113, nama: "KUALI ALUMINIUM 22\"", harga: 139150, saldoAwal: 1 },
  { id: 114, nama: "KUALI HITAM BESI 16\"", harga: 207000, saldoAwal: 5 },
  { id: 115, nama: "KUALI HITAM BESI 18\"", harga: 230000, saldoAwal: 4 },
  { id: 116, nama: "KUALI HITAM BESI 24\"", harga: 445280, saldoAwal: 3 },
  { id: 117, nama: "KUALI TEFLON 40 CM", harga: 345000, saldoAwal: 1 },
  { id: 118, nama: "KUAS SILIKON 2\"", harga: 29000, saldoAwal: 1 },
  { id: 119, nama: "KURSI PLASTIK BAKSO", harga: 40000, saldoAwal: 4 },
  { id: 120, nama: "LABEL TEMBAK 2 JALUR", harga: 65000, saldoAwal: 2 },
  { id: 121, nama: "LADDLE 120 CC", harga: 40250, saldoAwal: 2 },
  { id: 122, nama: "LADDLE 30 CC", harga: 23000, saldoAwal: 6 },
  { id: 123, nama: "LADDLE 300 CC", harga: 92000, saldoAwal: 1 },
  { id: 124, nama: "LONG BAR SPOON 30CM", harga: 51750, saldoAwal: 8 },
  { id: 125, nama: "KNIFE HOLDER MKH-46", harga: 142600, saldoAwal: 3 },
  { id: 126, nama: "MANCIS TEMBAK", harga: 17300, saldoAwal: 2 },
  { id: 127, nama: "MANGKOK 4\" MERAH PLASTIK MERK ULTRA NO.353", harga: 5800, saldoAwal: 10 },
  { id: 128, nama: "MANGKOK BIBIMBAB 14 CM", harga: 300000, saldoAwal: 10 },
  { id: 129, nama: "MANGKOK BUBUR LOGO LIU'S GARDEN 8.8\"", harga: 39160, saldoAwal: 12 },
  { id: 130, nama: "MANGKOK BULAT KERAMIK LENGKUNG 8 INC", harga: 143000, saldoAwal: 12 },
  { id: 131, nama: "MANGKOK CUNCAI BERKUPING", harga: 43125, saldoAwal: 25 },
  { id: 132, nama: "MANGKOK KERAMIK SEGI 8", harga: 38000, saldoAwal: 14 },
  { id: 133, nama: "MANGKOK MELAMIN 7190", harga: 50000, saldoAwal: 4 },
  { id: 134, nama: "MANGKOK MELAMIN ABU\" STONE W 3406 A", harga: 29000, saldoAwal: 9 },
  { id: 135, nama: "MANGKOK MELAMIN 9 INCH W-3409A", harga: 57000, saldoAwal: 11 },
  { id: 136, nama: "MANGKOK MELAMIN HITAM 8435", harga: 15000, saldoAwal: 31 },
  { id: 137, nama: "MANGKOK MELAMIN MERAH 3955", harga: 10293, saldoAwal: 18 },
  { id: 138, nama: "MANGKOK MELAMIN MERAH-HIT W-04A1 4\"", harga: 15142, saldoAwal: 66 },
  { id: 139, nama: "MANGKOK MELAMIN MERAH-HIT W-75A4 7\"", harga: 29038, saldoAwal: 35 },
  { id: 140, nama: "MANGKOK MELAMIN PUTIH 2304 \"ONYX\"", harga: 7889, saldoAwal: 3 },
  { id: 141, nama: "MANGKOK S/S 6\"", harga: 8625, saldoAwal: 34 },
  { id: 142, nama: "MILK JUG 1 LITER", harga: 161000, saldoAwal: 3 },
  { id: 143, nama: "MILK JUG 3 OZ", harga: 51000, saldoAwal: 12 },
  { id: 144, nama: "MILK JUG 330 ML", harga: 65000, saldoAwal: 1 },
  { id: 145, nama: "MILK JUG S/S 500ML", harga: 81000, saldoAwal: 3 },
  { id: 146, nama: "MUDDLER S/S", harga: 40000, saldoAwal: 1 },
  { id: 147, nama: "NAPKIN MERAH", harga: 13800, saldoAwal: 55 },
  { id: 148, nama: "NOZZLE BOTOL SIRUP", harga: 14756, saldoAwal: 6 },
  { id: 149, nama: "OCD COFFEE", harga: 229000, saldoAwal: 1 },
  { id: 150, nama: "PAN SAUCE/SAUCE POT STAINLESS STEAL D = 18 CM", harga: 103500, saldoAwal: 9 },
  { id: 151, nama: "PAN TAMAGO", harga: 104000, saldoAwal: 1 },
  { id: 152, nama: "PANCI 40 CM*", harga: 32000, saldoAwal: 1 },
  { id: 153, nama: "PANCI S/S D = 12\" / 33CM", harga: 172500, saldoAwal: 3 },
  { id: 154, nama: "PANCI S/S D = 14\"", harga: 316250, saldoAwal: 3 },
  { id: 155, nama: "PANCI S/S D=23 CM T=18 CM", harga: 225000, saldoAwal: 3 },
  { id: 156, nama: "PANCI BOWL S/S D=38 CM T=19 CM", harga: 432000, saldoAwal: 2 },
  { id: 157, nama: "PAPAN RESERVED", harga: 1000, saldoAwal: 11 },
  { id: 158, nama: "PARANG BESAR GAGANG KAYU", harga: 97750, saldoAwal: 3 },
  { id: 159, nama: "PARANG BESAR GAGANG S/S", harga: 57500, saldoAwal: 6 },
  { id: 160, nama: "PARUTAN KEJU S/S", harga: 11500, saldoAwal: 2 },
  { id: 161, nama: "PARUTAN SERBA GUNA", harga: 23000, saldoAwal: 1 },
  { id: 162, nama: "PEALER ORANGE", harga: 28800, saldoAwal: 4 },
  { id: 163, nama: "PEMBUKA KALENG STAINLESS STEEL", harga: 97750, saldoAwal: 2 },
  { id: 164, nama: "PEMBUKA TUTUP BOTOL", harga: 8207, saldoAwal: 2 },
  { id: 165, nama: "PEMUKUL BAWANG / DAGING", harga: 46719, saldoAwal: 2 },
  { id: 166, nama: "PENGOREK BUAH", harga: 5787, saldoAwal: 1 },
  { id: 167, nama: "PIRING ALAS CANGKIR CAPPUCINO 170 ML", harga: 1000, saldoAwal: 7 },
  { id: 168, nama: "PIRING ANKO 20/18", harga: 85000, saldoAwal: 36 },
  { id: 170, nama: "PIRING BULAT KERAMIK 10\"", harga: 54700, saldoAwal: 47 },
  { id: 171, nama: "PIRING BULAT MELAMIN 4160", harga: 7475, saldoAwal: 51 },
  { id: 172, nama: "PIRING BULAT MELAMIN 4170", harga: 11550, saldoAwal: 55 },
  { id: 173, nama: "PIRING BULAT S/S 9\"", harga: 14400, saldoAwal: 175 },
  { id: 174, nama: "PIRING CABE 2 SISI MELAMIN PUTIH 1830", harga: 4945, saldoAwal: 1 },
  { id: 175, nama: "PIRING CABE MELAMIN 3837 / 1827", harga: 4935, saldoAwal: 320 },
  { id: 176, nama: "PIRING HOT PLATE BULAT 22 CM", harga: 50000, saldoAwal: 48 },
  { id: 177, nama: "PIRING HOT PLATE OVAL ( 27 x 17,5 CM )", harga: 116397, saldoAwal: 20 },
  { id: 178, nama: "PIRING KAKI AYAM KERAMIK 4\"", harga: 7475, saldoAwal: 44 },
  { id: 179, nama: "PIRING KERAMIK MOTIF LOVE", harga: 1000, saldoAwal: 1 },
  { id: 180, nama: "PIRING MELAMIN 3 LUBANG NO. 343", harga: 35972, saldoAwal: 38 },
  { id: 181, nama: "PIRING MELAMIN BULAT P-2209A 9\"", harga: 24917, saldoAwal: 119 },
  { id: 182, nama: "PIRING MELAMIN PETAK MODEL SAMPAN P-2409", harga: 23480, saldoAwal: 35 },
  { id: 183, nama: "PIRING PETAK MELAMIN 8765", harga: 6000, saldoAwal: 56 },
  { id: 184, nama: "PIRING PETAK MELAMIN HITAM 3217", harga: 25900, saldoAwal: 189 },
  { id: 185, nama: "PIRING PETAK MELAMIN HITAM P-6906A-6", harga: 21370, saldoAwal: 584 },
  { id: 186, nama: "PIRING TAMU KERAMIK LOGO LIU'S GARDEN (GZ)", harga: 13640, saldoAwal: 33 },
  { id: 187, nama: "PISAU BESAR 9\"", harga: 115000, saldoAwal: 6 },
  { id: 188, nama: "PISAU KECIL", harga: 8700, saldoAwal: 14 },
  { id: 189, nama: "PISAU ROTI PANJANG 40 CM", harga: 273125, saldoAwal: 1 },
  { id: 190, nama: "PISAU STEAK S/S", harga: 20000, saldoAwal: 24 },
  { id: 191, nama: "PISAU SUSHI", harga: 161000, saldoAwal: 1 },
  { id: 192, nama: "POWDER SPOON", harga: 20000, saldoAwal: 6 },
  { id: 193, nama: "PRICE TAG HOLDER (GOLD)", harga: 25000, saldoAwal: 36 },
  { id: 194, nama: "PRICE TAG HOLDER (SILVER)", harga: 7000, saldoAwal: 10 },
  { id: 195, nama: "PUMP SYRUP", harga: 21900, saldoAwal: 6 },
  { id: 196, nama: "RAKET NYAMUK ELEKTRIK", harga: 66800, saldoAwal: 2 },
  { id: 197, nama: "RING BELL", harga: 34590, saldoAwal: 3 },
  { id: 198, nama: "SALT SHAKER", harga: 18000, saldoAwal: 2 },
  { id: 199, nama: "SAPO NABE*", harga: 60000, saldoAwal: 16 },
  { id: 200, nama: "SAPU KUALI", harga: 40250, saldoAwal: 8 },
  { id: 201, nama: "SAPU LANTAI + GAGANG", harga: 23000, saldoAwal: 7 },
  { id: 202, nama: "SAPU LANTA KRISBOW", harga: 315100, saldoAwal: 2 },
  { id: 203, nama: "SARINGAN GORENGAN S/S 40 x 30", harga: 172500, saldoAwal: 2 },
  { id: 204, nama: "SARINGAN KAWAT D = 12\"", harga: 80500, saldoAwal: 2 },
  { id: 205, nama: "SARINGAN KAWAT D = 8\"", harga: 60000, saldoAwal: 1 },
  { id: 206, nama: "SARINGAN MIE PANGSIT D= 6\"", harga: 22677, saldoAwal: 4 },
  { id: 207, nama: "SARINGAN MINYAK BERLUBANG S/S D=10\"", harga: 115000, saldoAwal: 4 },
  { id: 208, nama: "SARINGAN MINYAK BERLUBANG S/S D=12\"", harga: 135000, saldoAwal: 2 },
  { id: 209, nama: "SARINGAN MINYAK GAGANG PLASTIK 20 CM", harga: 31700, saldoAwal: 1 },
  { id: 210, nama: "SARINGAN MINYAK GAGANG S/S 16 CM", harga: 28750, saldoAwal: 4 },
  { id: 211, nama: "SARINGAN MINYAK GAGANG S/S 6 CM", harga: 20000, saldoAwal: 1 },
  { id: 212, nama: "SARINGAN MINYAK GAGANG S/S D= 20 CM", harga: 25875, saldoAwal: 7 },
  { id: 213, nama: "SARINGAN S/S D = 10 CM", harga: 25000, saldoAwal: 1 },
  { id: 214, nama: "SARINGAN S/S D = 16 CM", harga: 31700, saldoAwal: 2 },
  { id: 215, nama: "SARINGAN TEH KAIN", harga: 8100, saldoAwal: 4 },
  { id: 216, className: "SARUNG TANGAN PANGGANGAN 17\" (43 CM)", harga: 61525, saldoAwal: 2 },
  { id: 217, nama: "SCOOP ICE CREAM", harga: 51750, saldoAwal: 1 },
  { id: 218, nama: "SEKRAP BESI 4\"", harga: 17250, saldoAwal: 4 },
  { id: 219, nama: "SEKRAP PLASTIK PETAK SN4051 (PUTIH)", harga: 12650, saldoAwal: 2 },
  { id: 220, nama: "SENDOK BEBEK MELAMIN HITAM", harga: 4150, saldoAwal: 97 },
  { id: 221, nama: "SENDOK BEBEK MELAMIN HITAM 1011", harga: 17000, saldoAwal: 33 },
  { id: 222, nama: "SENDOK BEBEK MELAMIN MERAH-HIT S-01A1", harga: 6708, saldoAwal: 33 },
  { id: 223, nama: "SENDOK ES S/S", harga: 57500, saldoAwal: 2 },
  { id: 224, nama: "SENDOK KECIL 17,5 CM 420", harga: 3173, saldoAwal: 6 },
  { id: 225, nama: "SENDOK KOPI 12 CM KODE 306", harga: 3800, saldoAwal: 3 },
  { id: 226, nama: "SENDOK MAKAN S/S \"VIP\"", harga: 11700, saldoAwal: 55 },
  { id: 227, nama: "SENDOK S/S MERK DOLL BESAR", harga: 6700, saldoAwal: 294 },
  { id: 228, nama: "SEROKAN SAMPAH", harga: 23000, saldoAwal: 2 },
  { id: 229, nama: "SHAKER AKRILIK 500 ML", harga: 85000, saldoAwal: 1 },
  { id: 230, nama: "SHAKER S/S BESAR", harga: 150000, saldoAwal: 1 },
  { id: 231, nama: "SODET KARET", harga: 116150, saldoAwal: 1 },
  { id: 232, nama: "SPATULA SILICONE TAHAN PANAS", harga: 45000, saldoAwal: 4 },
  { id: 233, nama: "STAND CARD HOLDER", harga: 25000, saldoAwal: 3 },
  { id: 234, nama: "STAND HOLDER", harga: 239000, saldoAwal: 3 },
  { id: 235, nama: "STOCKPOT 14 LTR + TUTUP / 30CM", harga: 49000, saldoAwal: 12 },
  { id: 236, nama: "STOCKPOT 20 LTR + TUTUP / 33CM", harga: 65000, saldoAwal: 2 },
  { id: 237, nama: "STOCKPOT 8 LTR + TUTUP / 23CM", harga: 280000, saldoAwal: 4 },
  { id: 238, nama: "STOCKPOT D=32 CM", harga: 374000, saldoAwal: 2 },
  { id: 239, nama: "SUMPIT MELAMIN HITAM", harga: 1200, saldoAwal: 459 },
  { id: 240, nama: "SUTIL KAYU (SPATULA KAYU)", harga: 18494, saldoAwal: 10 },
  { id: 241, nama: "SUTIL MASAK 4,5\"", harga: 35000, saldoAwal: 4 },
  { id: 242, nama: "SUTIL MASAK 5\"", harga: 63250, saldoAwal: 5 },
  { id: 243, nama: "TALAM PETAK S/S 27X21 CM", harga: 30000, saldoAwal: 4 },
  { id: 244, nama: "TALAM PETAK S/S (P = 32 CM, L = 22 CM, T = 2 CM)", harga: 18000, saldoAwal: 2 },
  { id: 245, nama: "TALAM PETAK S/S 35X26 CM", harga: 24000, saldoAwal: 3 },
  { id: 246, nama: "TALAM PETAK S/S ( UK. 45 X 35 )", harga: 51750, saldoAwal: 13 },
  { id: 247, nama: "TALAM PETAK S/S 55X45X8 CM", harga: 50000, saldoAwal: 8 },
  { id: 248, nama: "TAPE DISPENSER DUDUK", harga: 22500, saldoAwal: 8 },
  { id: 249, nama: "TARIKAN AIR + GAGANG", harga: 40300, saldoAwal: 4 },
  { id: 250, nama: "TARIKAN KACA", harga: 118450, saldoAwal: 5 },
  { id: 251, nama: "TEFLON 12\" / 30 CM", harga: 256830, saldoAwal: 3 },
  { id: 252, nama: "TEKO CHINESE TEA", harga: 126500, saldoAwal: 19 },
  { id: 253, nama: "TEKO PLASTIK 2 LITER", harga: 20125, saldoAwal: 4 },
  { id: 254, nama: "TEKO PLASTIK PANJANG 2,2 L BENING/ACRYLIC", harga: 103500, saldoAwal: 7 },
  { id: 255, nama: "TEKO S/S 2 L", harga: 130000, saldoAwal: 6 },
  { id: 256, nama: "TELENAN PLASTIK 40 x 30 (HIJAU)", harga: 201250, saldoAwal: 2 },
  { id: 257, nama: "TELENAN PLASTIK 40 x 30 (MERAH)", harga: 201300, saldoAwal: 3 },
  { id: 258, nama: "TELENAN PLASTIK 40 x 30 (PUTIH)", harga: 201300, saldoAwal: 4 },
  { id: 259, nama: "TEMPAT CABE KERAMIK + TUTUP", harga: 40300, saldoAwal: 1 },
  { id: 260, nama: "TEMPAT GULA CAIR", harga: 15000, saldoAwal: 3 },
  { id: 261, nama: "TEMPAT MERICA S/S BESAR", harga: 31625, saldoAwal: 9 },
  { id: 262, nama: "TEMPAT MERICA S/S KECIL", harga: 23000, saldoAwal: 4 },
  { id: 263, nama: "TEMPAT PIPET S/S", harga: 28750, saldoAwal: 6 },
  { id: 264, nama: "THERMOMETER MINYAK", harga: 50599, saldoAwal: 1 },
  { id: 265, nama: "TIMBANGAN 15 KG", harga: 316250, saldoAwal: 1 },
  { id: 266, nama: "TIMBANGAN 2 KG", harga: 178250, saldoAwal: 3 },
  { id: 267, nama: "TIMBANGAN 30 KG", harga: 500250, saldoAwal: 1 },
  { id: 268, nama: "TIMBANGAN DIGITAL CAMRY EK5055", harga: 190000, saldoAwal: 5 },
  { id: 269, nama: "TIMER DIGITAL MERK RENO", harga: 104000, saldoAwal: 2 },
  { id: 270, nama: "TONG SAMPAH 100 LITER", harga: 118450, saldoAwal: 1 },
  { id: 271, nama: "TONG SAMPAH 120 LITER", harga: 747500, saldoAwal: 1 },
  { id: 272, nama: "TONG SAMPAH SHINPO MODEL PIJAK 10 LTR", harga: 100000, saldoAwal: 3 },
  { id: 273, nama: "TOPLES BULAT 1 LITER", harga: 14375, saldoAwal: 10 },
  { id: 274, nama: "TOPLES BULAT 1 LITER SIP 352 XL", harga: 15000, saldoAwal: 15 },
  { id: 275, nama: "TOPLES BULAT 10 LTR", harga: 18501, saldoAwal: 4 },
  { id: 276, nama: "TOPLES BULAT 16 LTR", harga: 25875, saldoAwal: 6 },
  { id: 277, nama: "TOPLES BULAT 5 LTR", harga: 11500, saldoAwal: 5 },
  { id: 278, nama: "TOPLES PETAK NAGATA 995", harga: 57500, saldoAwal: 6 },
  { id: 279, nama: "TOPLES S/S 1 LITER", harga: 51750, saldoAwal: 2 },
  { id: 280, nama: "TOWEL WARNA - WARNI PANJANG", harga: 17300, saldoAwal: 58 },
  { id: 281, nama: "TRAY AESTHETIC NORDIC STYLE 31.3 cm x 18.1 cm", harga: 29000, saldoAwal: 49 },
  { id: 282, nama: "TRAY MINI CAKE UKURAN M (30,8 x 22,2 x 1,5 CM)", harga: 18975, saldoAwal: 2 },
  { id: 283, nama: "TUSUKAN BON", harga: 15175, saldoAwal: 2 },
  { id: 284, nama: "TUTUP ACRILIC PETAK 48 X 32 X 15 CM", harga: 368000, saldoAwal: 1 },
  { id: 285, nama: "TUTUP KERANJANG YAMCHA KECIL 13 CM", harga: 12800, saldoAwal: 9 },
  { id: 286, nama: "TUTUP KERANJANG YAMCHA SEDANG 15 CM", harga: 12171, saldoAwal: 10 },
  { id: 287, nama: "TUTUP MAKANAN PETAK ( 35 x 55,5 CM ) / 22\"", harga: 60000, saldoAwal: 10 },
  { id: 288, nama: "ZIGER S/S", harga: 46000, saldoAwal: 5 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('hasil');
  const [meta, setMeta] = useState({
    outlet: "Nelayan Cafe Brastagi Cemara",
    tglMulai: "2026-04-23",
    tglSelesai: "2026-05-20"
  });
  const [items, setItems] = useState([]);
  const [costingLogs, setCostingLogs] = useState([]);
  const [grInputText, setGrInputText] = useState("");

  const [selectedItemId, setSelectedItemId] = useState(1);
  const [costQty, setCostQty] = useState(1);
  const [costCategory, setCostCategory] = useState("pecah");

  useEffect(() => {
    const savedState = localStorage.getItem("app_inventory_state_vite");
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setMeta(parsed.meta);
      setItems(parsed.items);
      setCostingLogs(parsed.costing || []);
    } else {
      const initialItems = MASTER_ITEMS_DEFAULT.map(it => ({
        ...it,
        gr: 0, pecah: 0, rusak: 0, tamu: 0, lainnya: 0,
        fisikCek: null, fisikRevisi: null
      }));
      setItems(initialItems);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("app_inventory_state_vite", JSON.stringify({
        meta, items, costing: costingLogs
      }));
    }
  }, [meta, items, costingLogs]);

  const formatRupiah = (num) => {
    if (num === 0 || isNaN(num) || num === null) return "-";
    return num.toLocaleString('id-ID');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const resetSystemData = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua data penyesuaian dan mengulang stok awal bawaan?")) {
      localStorage.removeItem("app_inventory_state_vite");
      window.location.reload();
    }
  };

  const handleItemChange = (id, field, val) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: val === "" ? null : parseFloat(val) };
      }
      return item;
    }));
  };

  const processGRInput = () => {
    if (!grInputText.trim()) {
      alert("Kotak teks input masih kosong!");
      return;
    }

    const lines = grInputText.split("\n");
    let itemsFoundCount = 0;

    setItems(prevItems => {
      return prevItems.map(item => {
        let currentGr = 0;
        lines.forEach(line => {
          if (line.toUpperCase().includes(item.nama.toUpperCase())) {
            let matches = line.match(/\b\d+\b/g);
            if (matches && matches.length > 0) {
              let qty = parseInt(matches[matches.length - 1]);
              if (qty > 0 && qty < 5000) {
                currentGr += qty;
                itemsFoundCount++;
              }
            } else {
              currentGr += 1;
              itemsFoundCount++;
            }
          }
        });
        return { ...item, gr: currentGr };
      });
    });

    alert(`Berhasil memproses! Mendeteksi pergerakan masuk sebanyak ${itemsFoundCount} entri barang.`);
    setActiveTab('hasil');
  };

  const submitCosting = () => {
    if (isNaN(costQty) || costQty <= 0) {
      alert("Jumlah Qty pembuangan barang harus valid!");
      return;
    }

    const newLog = { barangId: parseInt(selectedItemId), qty: costQty, kategori: costCategory };
    const updatedLogs = [...costingLogs, newLog];
    setCostingLogs(updatedLogs);

    recalculateCostingSummary(updatedLogs);
    setCostQty(1);
  };

  const deleteCosting = (index) => {
    const updatedLogs = costingLogs.filter((_, i) => i !== index);
    setCostingLogs(updatedLogs);
    recalculateCostingSummary(updatedLogs);
  };

  const recalculateCostingSummary = (currentLogs) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        let pecah = 0, rusak = 0, tamu = 0, lainnya = 0;
        currentLogs.forEach(log => {
          if (log.barangId === item.id) {
            if (log.kategori === "pecah") pecah += log.qty;
            else if (log.kategori === "rusak") rusak += log.qty;
            else if (log.kategori === "tamu") tamu += log.qty;
            else if (log.kategori === "lainnya") lainnya += log.qty;
          }
        });
        return { ...item, pecah, rusak, tamu, lainnya };
      });
    });
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="bg-slate-800 text-white shadow-md no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-wider text-emerald-400">STOCK-CONTROL</span>
            </div>
            <div className="flex space-x-2">
              {['hasil', 'cek', 'revisi', 'gr', 'costing', 'data-prev'].map((tab, idx) => {
                const names = ["Hasil", "Cek", "Revisi", "GR", "CR", "Data"];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${activeTab === tab ? 'bg-slate-900 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
                  >
                    {names[idx]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>



      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'hasil' && (
          <MenuHasil
            items={items}
            meta={meta}
            setMeta={setMeta} // <-- Tambahkan baris ini
            formatDate={formatDate}
            formatRupiah={formatRupiah}
          />
        )}
        {activeTab === 'cek' && <MenuCek items={items} handleItemChange={handleItemChange} />}
        {activeTab === 'revisi' && <MenuRevisi items={items} handleItemChange={handleItemChange} />}
        {activeTab === 'gr' && <MenuGr grInputText={grInputText} setGrInputText={setGrInputText} processGRInput={processGRInput} />}
        {activeTab === 'costing' && (
          <MenuCosting
            items={items} costingLogs={costingLogs} selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId}
            costQty={costQty} setCostQty={setCostQty} costCategory={costCategory} setCostCategory={setCostCategory}
            submitCosting={submitCosting} deleteCosting={deleteCosting}
          />
        )}
        {activeTab === 'data-prev' && <MenuData items={items} handleItemChange={handleItemChange} />}
      </main>
    </div>
  );
}