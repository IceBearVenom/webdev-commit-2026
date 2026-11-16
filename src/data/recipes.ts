import { Recipe } from '../types';

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'nasi-goreng-telur',
    name: 'Nasi Goreng Telur',
    description: 'Nasi goreng gurih harum kecap dengan telur orak-arik khas anak kos.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    category: 'Nasi & Olahan Utuh',
    cookingTime: 15,
    difficulty: 'Mudah',
    portion: '1 porsi',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan', 'Piring & Mangkuk'],
    ingredients: [
      { name: 'Nasi Putih Cold', quantity: 1, unit: 'piring', estimatedCost: 3000, packagePrice: 3000, packageSize: '1 piring' },
      { name: 'Telur Ayam', quantity: 1, unit: 'butir', estimatedCost: 2000, packagePrice: 2000, packageSize: '1 butir' },
      { name: 'Bawang Putih', quantity: 1, unit: 'siung', estimatedCost: 500, packagePrice: 3000, packageSize: '100g' },
      { name: 'Bawang Merah', quantity: 2, unit: 'siung', estimatedCost: 1000, packagePrice: 4000, packageSize: '100g' },
      { name: 'Kecap Manis', quantity: 1, unit: 'sdm', estimatedCost: 1000, packagePrice: 9000, packageSize: '220ml' },
      { name: 'Minyak & Bumbu Garam Merica', quantity: 1, unit: 'secukupnya', estimatedCost: 500, packagePrice: 3000, packageSize: 'paket bumbu' }
    ],
    instructions: [
      'Siapkan nasi dingin. Urai gumpalan nasi dengan sendok agar mudah tercampur saat digoreng.',
      'Iris bawang merah, cincang bawang putih, dan iris daun bawang.',
      'Panaskan sedikit minyak di wajan dengan api sedang.',
      'Masukkan telur, orak-arik sampai matang, lalu sisihkan di pinggir wajan.',
      'Tumis bawang merah dan bawang putih sampai harum.',
      'Masukkan nasi, kecap manis, garam, dan merica.',
      'Aduk sampai warna dan bumbu merata. Masukkan kembali telur dan daun bawang.',
      'Masak 1-2 menit sambil diaduk. Matikan api dan sajikan.'
    ],
    estimatedCost: 8000,
    outsidePrice: 15000,
    savings: 7000
  },
  {
    id: 'telur-balado',
    name: 'Telur Balado Sederhana',
    description: 'Telur rebus digoreng berkulit disiram bumbu cabai tumis gurih manis.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Telur',
    cookingTime: 20,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Panci', 'Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan'],
    ingredients: [
      { name: 'Telur Ayam', quantity: 2, unit: 'butir', estimatedCost: 4000, packagePrice: 4000, packageSize: '2 butir' },
      { name: 'Cabai Merah', quantity: 2, unit: 'buah', estimatedCost: 2000, packagePrice: 5000, packageSize: '100g' },
      { name: 'Bawang Merah', quantity: 2, unit: 'siung', estimatedCost: 1000, packagePrice: 4000, packageSize: '100g' },
      { name: 'Bawang Putih', quantity: 1, unit: 'siung', estimatedCost: 500, packagePrice: 3000, packageSize: '100g' },
      { name: 'Tomat Merah', quantity: 1, unit: 'buah', estimatedCost: 1500, packagePrice: 3000, packageSize: '2 buah' },
      { name: 'Minyak & Bumbu', quantity: 1, unit: 'secukupnya', estimatedCost: 1000, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Rebus telur selama sekitar 9-10 menit hingga matang. Dinginkan sebentar, kupas, lalu sisihkan.',
      'Iris cabai, bawang merah, bawang putih, dan tomat. Jika ingin bumbu lebih halus, ulek bahan tersebut.',
      'Panaskan 1-2 sdm minyak di wajan.',
      'Tumis bawang dan cabai sampai harum.',
      'Masukkan tomat, lalu masak sampai lunak dan berair.',
      'Tambahkan garam dan sedikit gula. Aduk dan cicipi.',
      'Masukkan telur rebus. Balik perlahan agar bumbu melapisi telur.',
      'Masak 2-3 menit dengan api kecil, lalu sajikan bersama nasi.'
    ],
    estimatedCost: 10000,
    outsidePrice: 17000,
    savings: 7000
  },
  {
    id: 'tumis-kangkung',
    name: 'Tumis Kangkung Bawang',
    description: 'Tumis kangkung segar renyah dengan aroma bumbu bawang yang gurih hangat.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    category: 'Tumisan Sayur',
    cookingTime: 10,
    difficulty: 'Sangat mudah',
    portion: '1-2 porsi',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan', 'Saringan'],
    ingredients: [
      { name: 'Kangkung Segar', quantity: 1, unit: 'ikat', estimatedCost: 3000, packagePrice: 3000, packageSize: '1 ikat' },
      { name: 'Bawang Putih', quantity: 2, unit: 'siung', estimatedCost: 1000, packagePrice: 3000, packageSize: '100g' },
      { name: 'Bawang Merah', quantity: 2, unit: 'siung', estimatedCost: 1000, packagePrice: 4000, packageSize: '100g' },
      { name: 'Cabai Merah', quantity: 1, unit: 'buah', estimatedCost: 500, packagePrice: 5000, packageSize: '100g' },
      { name: 'Saus Tiram & Minyak', quantity: 1, unit: 'secukupnya', estimatedCost: 500, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Petik kangkung, buang bagian yang keras, lalu cuci bersih di air mengalir.',
      'Iris bawang merah, bawang putih, dan cabai.',
      'Panaskan sedikit minyak di wajan.',
      'Tumis bawang merah dan bawang putih sampai harum. Tambahkan cabai jika digunakan.',
      'Masukkan batang kangkung terlebih dahulu dan aduk sekitar 1 menit.',
      'Masukkan daun kangkung, sedikit air, garam, dan saus tiram.',
      'Aduk cepat sampai kangkung layu tetapi masih hijau.',
      'Matikan api segera setelah matang agar teksturnya tidak terlalu lembek.'
    ],
    estimatedCost: 6000,
    outsidePrice: 12000,
    savings: 6000
  },
  {
    id: 'tempe-orek',
    name: 'Tempe Orek Kecap',
    description: 'Tempe potong dadu tumis kecap manis manis-gurih menggugah selera.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Tempe & Tahu',
    cookingTime: 15,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan'],
    ingredients: [
      { name: 'Tempe Papan', quantity: 0.5, unit: 'papan', estimatedCost: 2500, packagePrice: 5000, packageSize: '1 papan' },
      { name: 'Bawang Merah', quantity: 2, unit: 'siung', estimatedCost: 1000, packagePrice: 4000, packageSize: '100g' },
      { name: 'Bawang Putih', quantity: 1, unit: 'siung', estimatedCost: 500, packagePrice: 3000, packageSize: '100g' },
      { name: 'Kecap Manis', quantity: 1, unit: 'sdm', estimatedCost: 1500, packagePrice: 9000, packageSize: '220ml' },
      { name: 'Gula & Minyak Goreng', quantity: 1, unit: 'secukupnya', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Potong tempe berbentuk korek api atau dadu kecil.',
      'Iris bawang merah dan cincang bawang putih.',
      'Panaskan minyak. Goreng tempe sampai permukaannya agak kecokelatan, lalu tiriskan.',
      'Sisakan sedikit minyak di wajan.',
      'Tumis bawang merah dan bawang putih sampai harum.',
      'Tambahkan kecap, gula, garam, dan air. Aduk hingga menjadi saus.',
      'Masukkan tempe dan aduk sampai seluruh potongan terlapisi.',
      'Masak sampai air menyusut dan bumbu melekat. Sajikan.'
    ],
    estimatedCost: 7000,
    outsidePrice: 13000,
    savings: 6000
  },
  {
    id: 'tahu-cabai-garam',
    name: 'Tahu Cabai Garam',
    description: 'Tahu goreng krispi ditaburi tumisan bawang, cabai rawit, dan garam renyah.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Tempe & Tahu',
    cookingTime: 15,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan', 'Piring & Mangkuk'],
    ingredients: [
      { name: 'Tahu Putih', quantity: 4, unit: 'potong', estimatedCost: 3000, packagePrice: 6000, packageSize: '1 bungkus (10s)' },
      { name: 'Bawang Putih', quantity: 2, unit: 'siung', estimatedCost: 1000, packagePrice: 3000, packageSize: '100g' },
      { name: 'Cabai Rawit', quantity: 2, unit: 'buah', estimatedCost: 1000, packagePrice: 5000, packageSize: '100g' },
      { name: 'Daun Bawang', quantity: 1, unit: 'batang', estimatedCost: 1000, packagePrice: 3000, packageSize: '1 ikat' },
      { name: 'Tepung Terigu / Maizena', quantity: 1, unit: 'sdm', estimatedCost: 1000, packagePrice: 11000, packageSize: '1 kg' },
      { name: 'Garam & Minyak Goreng', quantity: 1, unit: 'secukupnya', estimatedCost: 1000, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Potong tahu menjadi dadu, lalu tekan perlahan dengan tisu dapur agar air berlebih berkurang.',
      'Jika ingin lebih renyah, balur tipis tahu dengan tepung.',
      'Panaskan minyak secukupnya. Goreng tahu sampai bagian luarnya kecokelatan, lalu tiriskan.',
      'Cincang bawang putih, iris cabai dan daun bawang.',
      'Kurangi minyak di wajan hingga tersisa sekitar 1 sdm.',
      'Tumis bawang putih sampai harum, kemudian masukkan cabai dan daun bawang.',
      'Tambahkan sedikit garam, lalu masukkan tahu.',
      'Aduk perlahan sampai bumbu menempel dan sajikan selagi hangat.'
    ],
    estimatedCost: 8000,
    outsidePrice: 15000,
    savings: 7000
  },
  {
    id: 'mie-goreng-sayur',
    name: 'Mie Goreng Sayur',
    description: 'Mi goreng lezat bertabur sawi kol segar dan orak-arik telur.',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80',
    category: 'Mi & Pasta',
    cookingTime: 15,
    difficulty: 'Sangat mudah',
    portion: '1 porsi',
    equipment: ['Panci', 'Wajan / Kuali', 'Sutil / Spatula', 'Saringan'],
    ingredients: [
      { name: 'Mi Kering / Telur', quantity: 1, unit: 'keping', estimatedCost: 2500, packagePrice: 4500, packageSize: '1 pack' },
      { name: 'Sayur Kol / Sawi', quantity: 1, unit: 'genggam', estimatedCost: 1500, packagePrice: 3000, packageSize: '1 ikat' },
      { name: 'Telur Ayam', quantity: 1, unit: 'butir', estimatedCost: 2000, packagePrice: 2000, packageSize: '1 butir' },
      { name: 'Bawang Putih & Merah', quantity: 2, unit: 'siung', estimatedCost: 1000, packagePrice: 4000, packageSize: 'paket' },
      { name: 'Kecap & Minyak', quantity: 1, unit: 'secukupnya', estimatedCost: 1000, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Rebus mi mengikuti petunjuk kemasan sampai matang tetapi tidak terlalu lembek.',
      'Tiriskan mi. Tambahkan sedikit minyak dan aduk agar tidak lengket.',
      'Iris sayuran, bawang merah, dan bawang putih.',
      'Panaskan sedikit minyak, lalu orak-arik telur sampai matang.',
      'Masukkan bawang dan tumis sampai harum.',
      'Tambahkan sayuran dan masak sampai sedikit layu.',
      'Masukkan mi, kecap, garam, dan merica.',
      'Aduk rata selama 1-2 menit, lalu angkat.'
    ],
    estimatedCost: 8000,
    outsidePrice: 14000,
    savings: 6000
  },
  {
    id: 'sayur-sop-praktis',
    name: 'Sayur Sop Praktis',
    description: 'Sup sayur kuah bening hangat berisi kentang, wortel, kol, dan aroma seledri.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    category: 'Sup & Kuah',
    cookingTime: 25,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Panci', 'Pisau Dapur', 'Talenan', 'Sutil / Spatula'],
    ingredients: [
      { name: 'Wortel', quantity: 1, unit: 'buah', estimatedCost: 2000, packagePrice: 5000, packageSize: '500g' },
      { name: 'Kentang', quantity: 1, unit: 'buah', estimatedCost: 2500, packagePrice: 8000, packageSize: '500g' },
      { name: 'Sayur Kol', quantity: 1, unit: 'genggam', estimatedCost: 1500, packagePrice: 4000, packageSize: '1 buah' },
      { name: 'Daun Bawang & Bawang Merah Putih', quantity: 1, unit: 'paket', estimatedCost: 2000, packagePrice: 4000, packageSize: 'paket' },
      { name: 'Bumbu Garam Merica Gula', quantity: 1, unit: 'secukupnya', estimatedCost: 1000, packagePrice: 2000, packageSize: 'paket' }
    ],
    instructions: [
      'Cuci dan kupas wortel serta kentang. Potong sesuai selera.',
      'Iris kol, daun bawang, bawang merah, dan bawang putih.',
      'Didihkan air di panci.',
      'Masukkan kentang dan wortel karena membutuhkan waktu lebih lama untuk empuk.',
      'Rebus sekitar 8-10 menit sampai hampir lunak.',
      'Masukkan bawang merah, bawang putih, kol, garam, merica, dan sedikit gula.',
      'Masak 3-4 menit sampai sayuran matang.',
      'Tambahkan daun bawang, koreksi rasa, lalu matikan api.'
    ],
    estimatedCost: 9000,
    outsidePrice: 15000,
    savings: 6000
  },
  {
    id: 'orak-arik-telur-tomat',
    name: 'Orak-arik Telur Tomat',
    description: 'Telur orak arik juicy dipadu tumisan tomat asam manis gurih cepat 10 menit.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Telur',
    cookingTime: 10,
    difficulty: 'Sangat mudah',
    portion: '1 porsi',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan'],
    ingredients: [
      { name: 'Telur Ayam', quantity: 2, unit: 'butir', estimatedCost: 4000, packagePrice: 4000, packageSize: '2 butir' },
      { name: 'Tomat Merah', quantity: 1, unit: 'buah', estimatedCost: 1500, packagePrice: 3000, packageSize: '2 buah' },
      { name: 'Bawang Putih & Merah', quantity: 2, unit: 'siung', estimatedCost: 1000, packagePrice: 4000, packageSize: 'paket' },
      { name: 'Garam Merica Minyak', quantity: 1, unit: 'secukupnya', estimatedCost: 500, packagePrice: 2000, packageSize: 'paket' }
    ],
    instructions: [
      'Pecahkan telur ke mangkuk, tambahkan sedikit garam, lalu kocok.',
      'Potong tomat menjadi dadu kecil. Iris bawang merah dan cincang bawang putih.',
      'Panaskan minyak di wajan.',
      'Tumis bawang merah dan bawang putih sampai harum.',
      'Masukkan tomat dan masak sampai sedikit lunak.',
      'Tuangkan telur kocok ke wajan.',
      'Aduk perlahan dari tepi ke tengah sampai telur matang dan menggumpal lembut.',
      'Tambahkan merica, koreksi rasa, lalu sajikan dengan nasi.'
    ],
    estimatedCost: 7000,
    outsidePrice: 13000,
    savings: 6000
  },
  {
    id: 'ayam-kecap-rumahan',
    name: 'Ayam Kecap Rumahan',
    description: 'Olahan potong ayam empuk dimasak kuah kecap manis bumbu rempah hangat.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Ayam & Daging',
    cookingTime: 30,
    difficulty: 'Menengah',
    portion: '1 porsi lauk',
    equipment: ['Wajan / Kuali', 'Pisau Dapur', 'Talenan', 'Sutil / Spatula'],
    ingredients: [
      { name: 'Daging Ayam Potong', quantity: 150, unit: 'gram', estimatedCost: 8000, packagePrice: 19000, packageSize: '500g' },
      { name: 'Bawang Merah & Putih', quantity: 4, unit: 'siung', estimatedCost: 2000, packagePrice: 4000, packageSize: 'paket' },
      { name: 'Kecap Manis', quantity: 1, unit: 'sdm', estimatedCost: 2000, packagePrice: 9000, packageSize: '220ml' },
      { name: 'Ketumbar & Salam', quantity: 1, unit: 'paket', estimatedCost: 1000, packagePrice: 2000, packageSize: 'paket' },
      { name: 'Minyak & Bumbu Garam', quantity: 1, unit: 'secukupnya', estimatedCost: 3000, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Bersihkan ayam secara higienis dan tiriskan.',
      'Iris bawang merah dan cincang bawang putih.',
      'Panaskan minyak, tumis bawang sampai harum.',
      'Masukkan ayam dan ketumbar. Aduk sampai permukaan ayam berubah warna.',
      'Tambahkan kecap, daun salam, garam, merica, dan air.',
      'Tutup wajan, lalu masak dengan api kecil-sedang sekitar 15-20 menit. Balik ayam sesekali.',
      'Pastikan bagian dalam ayam matang sempurna dan tidak mentah (suhu 74°C).',
      'Buka tutup wajan dan masak sampai kuah mengental. Sajikan dengan nasi.'
    ],
    estimatedCost: 16000,
    outsidePrice: 25000,
    savings: 9000
  },
  {
    id: 'perkedel-tahu',
    name: 'Perkedel Tahu',
    description: 'Olahan tahu halus bumbu daun bawang dilapisi telur goreng emas renyah.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Tempe & Tahu',
    cookingTime: 20,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Piring & Mangkuk', 'Wajan / Kuali', 'Sutil / Spatula'],
    ingredients: [
      { name: 'Tahu Putih', quantity: 4, unit: 'potong', estimatedCost: 3000, packagePrice: 6000, packageSize: '1 bungkus (10s)' },
      { name: 'Telur Ayam', quantity: 1, unit: 'butir', estimatedCost: 2000, packagePrice: 2000, packageSize: '1 butir' },
      { name: 'Daun Bawang & Bawang Putih', quantity: 1, unit: 'paket', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' },
      { name: 'Tepung Terigu', quantity: 2, unit: 'sdm', estimatedCost: 1000, packagePrice: 11000, packageSize: '1 kg' },
      { name: 'Garam Merica Minyak', quantity: 1, unit: 'secukupnya', estimatedCost: 500, packagePrice: 2000, packageSize: 'paket' }
    ],
    instructions: [
      'Hancurkan tahu dalam mangkuk menggunakan garpu.',
      'Cincang bawang putih dan iris daun bawang.',
      'Masukkan telur, tepung, bawang putih, daun bawang, garam, dan merica ke tahu.',
      'Aduk sampai adonan dapat dibentuk. Jika terlalu basah, tambahkan sedikit tepung.',
      'Bentuk adonan menjadi bulatan pipih berukuran kecil.',
      'Panaskan minyak dengan api sedang.',
      'Goreng perkedel beberapa buah sekaligus.',
      'Balik setelah bagian bawah kokoh dan kecokelatan. Angkat setelah kedua sisi matang.'
    ],
    estimatedCost: 8000,
    outsidePrice: 15000,
    savings: 7000
  },
  {
    id: 'capcay-kuah-sederhana',
    name: 'Capcay Kuah Sederhana',
    description: 'Kombinasi wortel, kol, sawi dan bakso dalam kuah bumbu kental gurih.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    category: 'Tumisan Sayur',
    cookingTime: 20,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Wajan / Kuali', 'Pisau Dapur', 'Talenan', 'Sutil / Spatula'],
    ingredients: [
      { name: 'Wortel & Kol & Sawi', quantity: 1, unit: 'paket sayur', estimatedCost: 4000, packagePrice: 7000, packageSize: 'paket sayur' },
      { name: 'Bakso Sapi', quantity: 2, unit: 'buah', estimatedCost: 2500, packagePrice: 12000, packageSize: '1 pack (10s)' },
      { name: 'Bawang Putih', quantity: 1, unit: 'siung', estimatedCost: 500, packagePrice: 3000, packageSize: '100g' },
      { name: 'Saus Tiram & Maizena', quantity: 1, unit: 'secukupnya', estimatedCost: 1500, packagePrice: 5000, packageSize: 'paket' },
      { name: 'Garam & Bumbu', quantity: 1, unit: 'secukupnya', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Cuci sayuran. Iris wortel tipis, potong kol dan sawi, serta iris bakso bila digunakan.',
      'Cincang bawang putih.',
      'Panaskan sedikit minyak, lalu tumis bawang putih sampai harum.',
      'Masukkan wortel dan bakso. Aduk sekitar 2 menit.',
      'Tuangkan air, lalu masak sampai wortel mulai empuk.',
      'Masukkan kol dan sawi. Tambahkan saus tiram, garam, dan merica.',
      'Masak 2-3 menit. Jika ingin kuah sedikit kental, tuangkan larutan maizena sambil diaduk.',
      'Didihkan sebentar, koreksi rasa, lalu sajikan.'
    ],
    estimatedCost: 10000,
    outsidePrice: 17000,
    savings: 7000
  },
  {
    id: 'sambal-goreng-kentang',
    name: 'Sambal Goreng Kentang',
    description: 'Dadu kentang goreng empuk diselimuti bumbu sambal merah gurih manis.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    category: 'Tumisan Sayur',
    cookingTime: 25,
    difficulty: 'Menengah',
    portion: '1-2 porsi lauk',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan', 'Saringan'],
    ingredients: [
      { name: 'Kentang', quantity: 2, unit: 'buah', estimatedCost: 4000, packagePrice: 8000, packageSize: '500g' },
      { name: 'Cabai Merah', quantity: 2, unit: 'buah', estimatedCost: 2000, packagePrice: 5000, packageSize: '100g' },
      { name: 'Bawang Merah & Putih', quantity: 3, unit: 'siung', estimatedCost: 1500, packagePrice: 4000, packageSize: '100g' },
      { name: 'Tomat Merah', quantity: 1, unit: 'buah', estimatedCost: 1500, packagePrice: 3000, packageSize: '2 buah' },
      { name: 'Minyak Goreng & Bumbu', quantity: 1, unit: 'secukupnya', estimatedCost: 1000, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Kupas kentang, potong dadu kecil, lalu bilas dan tiriskan.',
      'Goreng kentang sampai matang dan bagian luarnya sedikit kecokelatan. Tiriskan.',
      'Haluskan atau cincang cabai, bawang merah, bawang putih, dan tomat.',
      'Panaskan sedikit minyak di wajan.',
      'Tumis bumbu sampai harum dan tomat menjadi lembut.',
      'Tambahkan garam dan sedikit gula. Aduk dan cicipi.',
      'Masukkan kentang goreng, aduk sampai bumbu merata.',
      'Masak 1-2 menit sampai bumbu melekat, lalu angkat.'
    ],
    estimatedCost: 10000,
    outsidePrice: 17000,
    savings: 7000
  },
  {
    id: 'nasi-telur-kecap',
    name: 'Nasi Telur Kecap',
    description: 'Menu super kilat 10 menit nasi hangat ditumpuk telur ceplok disiram kecap manis.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    category: 'Nasi & Olahan Utuh',
    cookingTime: 10,
    difficulty: 'Sangat mudah',
    portion: '1 porsi',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Piring & Mangkuk'],
    ingredients: [
      { name: 'Nasi Putih Warm', quantity: 1, unit: 'piring', estimatedCost: 3000, packagePrice: 3000, packageSize: '1 piring' },
      { name: 'Telur Ayam', quantity: 1, unit: 'butir', estimatedCost: 2000, packagePrice: 2000, packageSize: '1 butir' },
      { name: 'Kecap Manis', quantity: 1, unit: 'sdm', estimatedCost: 1000, packagePrice: 9000, packageSize: '220ml' },
      { name: 'Bawang Putih & Bumbu', quantity: 1, unit: 'siung', estimatedCost: 1000, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Siapkan nasi di piring.',
      'Jika memakai bawang putih, cincang halus terlebih dahulu.',
      'Panaskan sedikit minyak di wajan. Tumis bawang putih sampai harum.',
      'Pecahkan telur ke wajan dan masak menjadi telur ceplok atau orak-arik.',
      'Tambahkan sedikit garam dan merica.',
      'Campur kecap dengan 1 sdt air agar lebih mudah disiramkan.',
      'Letakkan telur di atas nasi, lalu tuangkan kecap.',
      'Tambahkan mentimun atau daun bawang bila tersedia. Sajikan segera.'
    ],
    estimatedCost: 7000,
    outsidePrice: 13000,
    savings: 6000
  },
  {
    id: 'bakwan-sayur',
    name: 'Bakwan Sayur',
    description: 'Gorengan kol & wortel adonan tepung rempah krispi gurih camilan & lauk anak kos.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Tempe & Tahu',
    cookingTime: 20,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Piring & Mangkuk', 'Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan'],
    ingredients: [
      { name: 'Tepung Terigu', quantity: 4, unit: 'sdm', estimatedCost: 2000, packagePrice: 11000, packageSize: '1 kg' },
      { name: 'Sayur Kol & Wortel', quantity: 1, unit: 'genggam', estimatedCost: 3000, packagePrice: 5000, packageSize: 'paket' },
      { name: 'Daun Bawang & Bawang Putih', quantity: 1, unit: 'paket', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' },
      { name: 'Garam Merica Minyak', quantity: 1, unit: 'secukupnya', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Cuci sayuran, iris kol, serut wortel, dan iris daun bawang.',
      'Masukkan tepung, bawang putih, garam, dan merica ke mangkuk.',
      'Tuangkan air sedikit demi sedikit sambil diaduk sampai menjadi adonan kental.',
      'Masukkan semua sayuran dan aduk hingga terbalut adonan.',
      'Panaskan minyak dengan api sedang.',
      'Ambil satu sendok adonan dan masukkan ke minyak panas secara hati-hati.',
      'Goreng sampai bagian bawah kecokelatan, lalu balik.',
      'Angkat setelah kedua sisi matang. Tiriskan dan sajikan.'
    ],
    estimatedCost: 8000,
    outsidePrice: 14000,
    savings: 6000
  },
  {
    id: 'sup-telur-jagung',
    name: 'Sup Telur Jagung',
    description: 'Sup kuah jagung manis berderet serabut telur halus lembut dan menenangkan.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    category: 'Sup & Kuah',
    cookingTime: 15,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Panci', 'Piring & Mangkuk', 'Sutil / Spatula'],
    ingredients: [
      { name: 'Jagung Manis', quantity: 0.5, unit: 'tongkol', estimatedCost: 2000, packagePrice: 4000, packageSize: '1 tongkol' },
      { name: 'Telur Ayam', quantity: 1, unit: 'butir', estimatedCost: 2000, packagePrice: 2000, packageSize: '1 butir' },
      { name: 'Bawang Putih & Daun Bawang', quantity: 1, unit: 'paket', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' },
      { name: 'Tepung Maizena & Bumbu', quantity: 1, unit: 'secukupnya', estimatedCost: 3500, packagePrice: 5000, packageSize: 'paket' }
    ],
    instructions: [
      'Pipil jagung jika menggunakan jagung bertongkol.',
      'Cincang bawang putih dan iris daun bawang.',
      'Didihkan air di panci, lalu masukkan jagung dan bawang putih.',
      'Masak sekitar 5-7 menit sampai jagung empuk.',
      'Kocok telur di mangkuk terpisah.',
      'Tuangkan telur perlahan ke kuah sambil diaduk pelan agar terbentuk serat telur.',
      'Tambahkan garam, merica, dan daun bawang.',
      'Jika ingin kuah lebih kental, masukkan maizena yang sudah dilarutkan air. Didihkan sebentar lalu sajikan.'
    ],
    estimatedCost: 9000,
    outsidePrice: 16000,
    savings: 7000
  },
  {
    id: 'tumis-buncis-tempe',
    name: 'Tumis Buncis Tempe',
    description: 'Kombinasi buncis renyah dan tempe goreng potong kecil dengan saus kecap manis.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    category: 'Tumisan Sayur',
    cookingTime: 15,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan'],
    ingredients: [
      { name: 'Buncis Segar', quantity: 100, unit: 'gram', estimatedCost: 2500, packagePrice: 6000, packageSize: '250g' },
      { name: 'Tempe Papan', quantity: 0.5, unit: 'papan', estimatedCost: 2500, packagePrice: 5000, packageSize: '1 papan' },
      { name: 'Bawang Merah & Putih', quantity: 3, unit: 'siung', estimatedCost: 1500, packagePrice: 4000, packageSize: 'paket' },
      { name: 'Kecap Manis & Bumbu', quantity: 1, unit: 'sdm', estimatedCost: 2500, packagePrice: 5000, packageSize: 'paket' }
    ],
    instructions: [
      'Cuci buncis, buang kedua ujungnya, lalu potong serong.',
      'Potong tempe berbentuk korek api atau dadu kecil.',
      'Iris bawang merah dan cincang bawang putih.',
      'Panaskan sedikit minyak. Tumis tempe sampai permukaannya kecokelatan, lalu sisihkan.',
      'Tumis bawang merah dan bawang putih sampai harum.',
      'Masukkan buncis dan air. Aduk, lalu tutup wajan sekitar 2 menit.',
      'Masukkan tempe, kecap, dan garam. Aduk sampai rata.',
      'Masak sampai buncis matang tetapi masih sedikit renyah.'
    ],
    estimatedCost: 9000,
    outsidePrice: 15000,
    savings: 6000
  },
  {
    id: 'ikan-tongkol-suwir-pedas',
    name: 'Ikan Tongkol Suwir Pedas',
    description: 'Suwiran daging ikan tongkol gurih berbumbu sambal pedas harum menggoreng.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Ayam & Daging',
    cookingTime: 20,
    difficulty: 'Menengah',
    portion: '1 porsi lauk',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan'],
    ingredients: [
      { name: 'Ikan Tongkol Kukus', quantity: 120, unit: 'gram', estimatedCost: 7000, packagePrice: 17500, packageSize: '500g' },
      { name: 'Cabai Merah & Rawit', quantity: 2, unit: 'buah', estimatedCost: 2000, packagePrice: 5000, packageSize: '100g' },
      { name: 'Bawang Merah & Putih', quantity: 3, unit: 'siung', estimatedCost: 1500, packagePrice: 4000, packageSize: 'paket' },
      { name: 'Tomat Merah', quantity: 1, unit: 'buah', estimatedCost: 1500, packagePrice: 3000, packageSize: '2 buah' },
      { name: 'Minyak & Bumbu Garam', quantity: 1, unit: 'secukupnya', estimatedCost: 2000, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Pastikan tongkol sudah matang. Pisahkan duri dengan teliti, lalu suwir dagingnya menggunakan garpu.',
      'Iris cabai, bawang merah, bawang putih, dan tomat.',
      'Panaskan minyak di wajan.',
      'Tumis bawang merah dan bawang putih sampai harum.',
      'Masukkan cabai dan tomat. Masak sampai tomat melunak.',
      'Tambahkan tongkol suwir, garam, dan air.',
      'Aduk sampai bumbu merata dan air menyusut. Pastikan ikan panas merata.',
      'Cicipi, matikan api, dan sajikan bersama nasi hangat.'
    ],
    estimatedCost: 14000,
    outsidePrice: 22000,
    savings: 8000
  },
  {
    id: 'bubur-ayam-sederhana',
    name: 'Bubur Ayam Sederhana',
    description: 'Bubur beras lembut gurih ditaburi suwiran ayam, daun bawang, dan kecap manis.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    category: 'Sup & Kuah',
    cookingTime: 35,
    difficulty: 'Mudah',
    portion: '1-2 porsi',
    equipment: ['Panci', 'Sutil / Spatula', 'Piring & Mangkuk'],
    ingredients: [
      { name: 'Beras Medium', quantity: 80, unit: 'gram', estimatedCost: 2000, packagePrice: 14500, packageSize: '1 kg' },
      { name: 'Daging Ayam Suwir', quantity: 60, unit: 'gram', estimatedCost: 5000, packagePrice: 19000, packageSize: '500g' },
      { name: 'Bawang Putih & Daun Bawang', quantity: 1, unit: 'paket', estimatedCost: 2000, packagePrice: 3000, packageSize: 'paket' },
      { name: 'Kecap & Garam Merica', quantity: 1, unit: 'secukupnya', estimatedCost: 3000, packagePrice: 4000, packageSize: 'paket' }
    ],
    instructions: [
      'Cuci beras sampai air bilasannya lebih jernih.',
      'Masukkan beras dan air ke panci. Didihkan dengan api sedang.',
      'Setelah mendidih, kecilkan api. Aduk secara berkala agar bagian bawah tidak lengket.',
      'Cincang bawang putih dan tumis sebentar dengan sedikit minyak sampai harum.',
      'Masukkan bawang putih tumis ke bubur. Tambahkan garam dan merica.',
      'Masak sekitar 25-30 menit, tambahkan air panas sedikit demi sedikit jika terlalu kental.',
      'Pastikan ayam yang digunakan sudah matang sempurna. Suwir dan panaskan bersama bubur.',
      'Sajikan dengan daun bawang, bawang goreng, atau kecap bila tersedia.'
    ],
    estimatedCost: 12000,
    outsidePrice: 18000,
    savings: 6000
  },
  {
    id: 'sarden-tumis-bawang',
    name: 'Sarden Tumis Bawang',
    description: 'Sarden saus tomat tumis bumbu bawang merah cabai segar gurih praktis.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    category: 'Olahan Ayam & Daging',
    cookingTime: 15,
    difficulty: 'Sangat mudah',
    portion: '1-2 porsi',
    equipment: ['Wajan / Kuali', 'Sutil / Spatula', 'Pisau Dapur', 'Talenan'],
    ingredients: [
      { name: 'Sarden Kaleng', quantity: 1, unit: 'kaleng kecil', estimatedCost: 8500, packagePrice: 10000, packageSize: '1 kaleng' },
      { name: 'Bawang Merah & Putih', quantity: 3, unit: 'siung', estimatedCost: 1500, packagePrice: 4000, packageSize: 'paket' },
      { name: 'Cabai Merah & Tomat', quantity: 1, unit: 'buah', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' },
      { name: 'Minyak Goreng', quantity: 1, unit: 'secukupnya', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Buka kaleng sarden dan periksa kondisi serta tanggal kedaluwarsanya.',
      'Iris bawang merah, bawang putih, cabai, dan tomat.',
      'Panaskan sedikit minyak di wajan.',
      'Tumis bawang merah dan bawang putih sampai harum.',
      'Masukkan cabai dan tomat, lalu masak sampai tomat sedikit lunak.',
      'Tuangkan sarden beserta sausnya secara hati-hati agar ikan tidak hancur.',
      'Tambahkan sedikit air bila saus terlalu kental. Panaskan sampai mendidih perlahan.',
      'Sajikan dengan nasi hangat.'
    ],
    estimatedCost: 13000,
    outsidePrice: 20000,
    savings: 7000
  },
  {
    id: 'makaroni-goreng-jawa',
    name: 'Makaroni Goreng Jawa',
    description: 'Makaroni kenyal tumis bumbu manis gurih dengan orak arik telur & sayuran.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281318?auto=format&fit=crop&w=800&q=80',
    category: 'Mi & Pasta',
    cookingTime: 20,
    difficulty: 'Mudah',
    portion: '1 porsi',
    equipment: ['Panci', 'Wajan / Kuali', 'Sutil / Spatula', 'Saringan'],
    ingredients: [
      { name: 'Makaroni Mentah', quantity: 75, unit: 'gram', estimatedCost: 2500, packagePrice: 6500, packageSize: '250g' },
      { name: 'Telur Ayam', quantity: 1, unit: 'butir', estimatedCost: 2000, packagePrice: 2000, packageSize: '1 butir' },
      { name: 'Sayur Kol / Sawi', quantity: 1, unit: 'genggam', estimatedCost: 1500, packagePrice: 3000, packageSize: '1 ikat' },
      { name: 'Bawang Putih & Merah', quantity: 3, unit: 'siung', estimatedCost: 1500, packagePrice: 4000, packageSize: 'paket' },
      { name: 'Kecap & Minyak Goreng', quantity: 1, unit: 'secukupnya', estimatedCost: 1500, packagePrice: 3000, packageSize: 'paket' }
    ],
    instructions: [
      'Didihkan air di panci. Rebus makaroni sesuai petunjuk kemasan sampai matang, lalu tiriskan.',
      'Iris kol atau sawi. Iris bawang merah dan cincang bawang putih.',
      'Panaskan sedikit minyak di wajan.',
      'Pecahkan telur dan orak-arik sampai matang.',
      'Masukkan bawang merah dan bawang putih, tumis sampai harum.',
      'Tambahkan sayuran dan masak sampai sedikit layu.',
      'Masukkan makaroni, kecap, garam, dan merica.',
      'Aduk rata selama 2-3 menit, lalu sajikan.'
    ],
    estimatedCost: 9000,
    outsidePrice: 16000,
    savings: 7000
  }
];
