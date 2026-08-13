import { Dimension } from '../types';

export const DIMENSIONS_DATA: Dimension[] = [
  {
    id: 1,
    title: 'Perencanaan Pembelajaran',
    subtitle: 'Kemampuan merancang tujuan, alur, dan perangkat pembelajaran yang sesuai CP dan kebutuhan siswa',
    description: 'Fokus pada kesiapan perencanaan pembelajaran sebelum masuk ke kelas, penyusunan Alur Tujuan Pembelajaran (ATP), Modul Ajar/RPP, dan penyesuaian strategi dengan karakteristik peserta didik.',
    iconName: 'BookOpen',
    indicators: [
      { id: 'd1_i1', dimensionId: 1, text: 'Memahami Capaian Pembelajaran (CP) sesuai jenjang dan mata pelajaran', description: 'Mampu membedah dan menganalisis CP secara mendalam', hasConsistencyOption: true },
      { id: 'd1_i2', dimensionId: 1, text: 'Menyusun Tujuan Pembelajaran (TP) yang terukur dan spesifik', description: 'Merumuskan TP dengan memperhatikan aspek kognitif, afektif, dan psikomotor', hasConsistencyOption: true },
      { id: 'd1_i3', dimensionId: 1, text: 'Menyusun alur tujuan pembelajaran (ATP) secara logis dan runtut', description: 'Memetakan urutan pembelajaran secara sistematis sepanjang fase', hasConsistencyOption: true },
      { id: 'd1_i4', dimensionId: 1, text: 'Menentukan tujuan pembelajaran harian yang fokus dan jelas bagi siswa', description: 'Menyampaikan tujuan yang mudah dipahami peserta didik', hasConsistencyOption: false },
      { id: 'd1_i5', dimensionId: 1, text: 'Menyesuaikan perencanaan pembelajaran dengan kesiapan dan kebutuhan siswa', description: 'Mempertimbangkan latar belakang, minat, dan gaya belajar siswa', hasConsistencyOption: true },
      { id: 'd1_i6', dimensionId: 1, text: 'Menyiapkan perangkat pembelajaran (Modul Ajar/RPP, LKPD, bahan ajar)', description: 'Perangkat lengkap, relevan, dan siap pakai sebelum pembelajaran', hasConsistencyOption: true },
      { id: 'd1_i7', dimensionId: 1, text: 'Menentukan strategi, pendekatan, dan model pembelajaran yang kontekstual', description: 'Memilih PBL, PJBL, Inquiry, atau model aktif lainnya', hasConsistencyOption: false },
      { id: 'd1_i8', dimensionId: 1, text: 'Merancang aktivitas pembelajaran yang interaktif dan bermakna', description: 'Aktivitas menghubungkan materi dengan pengalaman nyata siswa', hasConsistencyOption: false },
    ],
    reflectionQuestions: [
      'Apa yang paling sulit Anda lakukan dalam perencanaan pembelajaran?',
      'Mengapa hal tersebut sulit dilakukan (misal: keterbatasan waktu, rumitnya pemetaan CP)?',
      'Apa yang selama ini sudah Anda lakukan untuk mengatasi tantangan perencanaan?',
      'Apa yang menurut Anda perlu diperbaiki dalam penyusunan perencanaan pembelajaran Anda?',
      'Dukungan apa yang Anda butuhkan (contoh: pelatihan CP/TP, contoh modul ajar, bimbingan pengawas)?'
    ]
  },
  {
    id: 2,
    title: 'Pelaksanaan Pembelajaran',
    subtitle: 'Keterampilan memfasilitasi interaksi, kegiatan aktif, dan pengelolaan waktu di dalam kelas',
    description: 'Pengalaman nyata di dalam kelas saat mengaitkan apersepsi, mengaktifkan partisipasi siswa, memandu diskusi, serta mengakhiri kelas dengan refleksi bermakna.',
    iconName: 'Users',
    indicators: [
      { id: 'd2_i1', dimensionId: 2, text: 'Membuka pembelajaran dengan baik (apersepsi, motivasi, dan pengondisian kelas)', description: 'Menciptakan kesiapan belajar siswa sebelum masuk materi inti', hasConsistencyOption: true },
      { id: 'd2_i2', dimensionId: 2, text: 'Menjelaskan tujuan pembelajaran dan manfaatnya bagi siswa secara terbuka', description: 'Siswa paham apa yang dicapai dan mengapa materi itu penting', hasConsistencyOption: false },
      { id: 'd2_i3', dimensionId: 2, text: 'Mengaktifkan partisipasi seluruh siswa secara inklusif tanpa mendominasi', description: 'Memberi kesempatan sama bagi seluruh siswa untuk berpartisipasi', hasConsistencyOption: true },
      { id: 'd2_i4', dimensionId: 2, text: 'Menggunakan metode pembelajaran yang bervariasi dan sesuai materi', description: 'Menggabungkan diskusi, kerja kelompok, demonstrasi, atau eksperimen', hasConsistencyOption: false },
      { id: 'd2_i5', dimensionId: 2, text: 'Mengembangkan interaksi positif antara guru-siswa dan antar-siswa', description: 'Membangun komunikasi dua arah yang hangat dan saling menghargai', hasConsistencyOption: true },
      { id: 'd2_i6', dimensionId: 2, text: 'Memberikan pertanyaan pemantik dan bermakna untuk merangsang rasa ingin tahu', description: 'Mengajukan pertanyaan terbuka yang mendorong diskusi', hasConsistencyOption: true },
      { id: 'd2_i7', dimensionId: 2, text: 'Mengembangkan pembelajaran aktif (hands-on / minds-on activity)', description: 'Siswa mengolah informasi, melakukan eksplorasi, dan mengemukakan ide', hasConsistencyOption: false },
      { id: 'd2_i8', dimensionId: 2, text: 'Mengelola alokasi waktu pembelajaran secara efektif sesuai rencana', description: 'Setiap tahapan (awal, inti, penutup) terlaksana tepat waktu', hasConsistencyOption: false },
      { id: 'd2_i9', dimensionId: 2, text: 'Menutup pembelajaran dengan merangkum poin penting dan melakukan refleksi', description: 'Memandu siswa menyimpulkan pembelajaran dan mengutarakan kesan/pemahaman', hasConsistencyOption: true },
    ],
    reflectionQuestions: [
      'Apa yang paling sulit Anda lakukan saat pelaksanaan pembelajaran berlangsung di kelas?',
      'Mengapa kendala tersebut muncul dalam proses mengajar?',
      'Apa langkah praktis yang selama ini sudah Anda terapkan di kelas?',
      'Apa aspek pelaksanaan mengajar yang paling mendesak untuk ditingkatkan?',
      'Dukungan atau media apa yang paling Anda butuhkan untuk memperlancar pembelajaran?'
    ]
  },
  {
    id: 3,
    title: 'Asesmen Pembelajaran',
    subtitle: 'Penerapan asesmen diagnostik, formatif, sumatif, serta pemanfaatan umpan balik perbaikan',
    description: 'Penyusunan instrumen, penilaian berkala untuk memantau proses belajar, analisis ketuntasan, dan pemberian umpan balik konstruktif bagi perkembangan siswa.',
    iconName: 'ClipboardCheck',
    indicators: [
      { id: 'd3_i1', dimensionId: 3, text: 'Melakukan asesmen diagnostik di awal pembelajaran/topik', description: 'Mengetahui pemahaman awal dan kesiapan belajar siswa', hasConsistencyOption: true },
      { id: 'd3_i2', dimensionId: 3, text: 'Melakukan asesmen formatif secara berkala di tengah proses belajar', description: 'Memantau perkembangan siswa tanpa berfokus pada nilai semata', hasConsistencyOption: true },
      { id: 'd3_i3', dimensionId: 3, text: 'Melakukan asesmen sumatif yang valid dan adil', description: 'Mengukur pencapaian tujuan pembelajaran di akhir lingkup materi', hasConsistencyOption: false },
      { id: 'd3_i4', dimensionId: 3, text: 'Menyusun instrumen asesmen lengkap dengan rubrik penilaian yang jelas', description: 'Rubrik transparan memudahkan penilaian objektif', hasConsistencyOption: true },
      { id: 'd3_i5', dimensionId: 3, text: 'Menyusun soal/tugas berkualitas yang bervariasi tingkat kesulitannya', description: 'Menyediakan soal menguji pemahaman dasar hingga tingkat lanjut', hasConsistencyOption: false },
      { id: 'd3_i6', dimensionId: 3, text: 'Menggunakan hasil asesmen secara nyata untuk memperbaiki strategi mengajar', description: 'Menyesuaikan ulang materi jika banyak siswa belum paham', hasConsistencyOption: true },
      { id: 'd3_i7', dimensionId: 3, text: 'Memberikan umpan balik (feedback) yang spesifik dan memotivasi siswa', description: 'Memberikan umpan balik tepat waktu pada tugas/jawaban siswa', hasConsistencyOption: true },
      { id: 'd3_i8', dimensionId: 3, text: 'Menganalisis data hasil belajar untuk mengidentifikasi tingkat ketuntasan', description: 'Mencatat dan menganalisis rekap hasil penilaian siswa secara mendalam', hasConsistencyOption: false },
    ],
    reflectionQuestions: [
      'Apa kesulitan terbesar Anda dalam mengimplementasikan asesmen diagnostik atau formatif?',
      'Mengapa asesmen formatif terkadang sulit dijadikan dasar perbaikan mengajar?',
      'Bagaimana cara Anda memberikan umpan balik pada siswa selama ini?',
      'Apa yang ingin Anda tingkatkan dalam penyusunan rubrik atau analisis hasil penilaian?',
      'Bantuan seperti apa yang dibutuhkan untuk memudahkan proses asesmen di sekolah Anda?'
    ]
  },
  {
    id: 4,
    title: 'Kompetensi Pedagogik',
    subtitle: 'Pemahaman karakteristik peserta didik, prinsip pembelajaran, dan pelaksanaan diferensiasi',
    description: 'Kemampuan memahami perkembangan fisik, intelektual, sosio-emosional peserta didik dan memfasilitasi pembelajaran berorientasi pada kebutuhan anak.',
    iconName: 'Brain',
    indicators: [
      { id: 'd4_i1', dimensionId: 4, text: 'Memahami karakteristik fisik, psikologis, dan latar belakang siswa', description: 'Mengenali kebiasaan, potensi, dan keunikan masing-masing anak', hasConsistencyOption: false },
      { id: 'd4_i2', dimensionId: 4, text: 'Memahami kebutuhan dan gaya belajar siswa yang beragam', description: 'Mengetahui kebutuhan siswa visual, auditori, mau pun kinestetik', hasConsistencyOption: true },
      { id: 'd4_i3', dimensionId: 4, text: 'Melakukan diferensiasi pembelajaran (konten, proses, atau produk)', description: 'Menyesuaikan pembelajaran agar semua tingkat kemampuan terfasilitasi', hasConsistencyOption: true },
      { id: 'd4_i4', dimensionId: 4, text: 'Mengidentifikasi secara dini kesulitan atau hambatan belajar siswa', description: 'Peka terhadap siswa yang tertinggal atau memiliki kebutuhan khusus', hasConsistencyOption: true },
      { id: 'd4_i5', dimensionId: 4, text: 'Menyesuaikan strategi mengajar sesuai dengan dinamika respon siswa', description: 'Fleksibel mengubah pendekatan saat metode awal kurang efektif', hasConsistencyOption: false },
      { id: 'd4_i6', dimensionId: 4, text: 'Mengembangkan pembelajaran yang berpihak penuh pada murid (student-centered)', description: 'Menjadikan murid sebagai subjek aktif pembelajaran, bukan penerima pasif', hasConsistencyOption: true },
    ],
    reflectionQuestions: [
      'Aspek pedagogik atau pembelajaran terdiferensiasi mana yang paling menantang bagi Anda?',
      'Mengapa merancang diferensiasi untuk kelas heterogen terasa sulit?',
      'Upaya apa yang sudah Anda lakukan untuk mengenali keunikan tiap siswa?',
      'Perubahan apa yang ingin Anda capai dalam pelayanan belajar peserta didik?',
      'Pelatihan atau pendampingan apa yang Anda harapkan terkait kompetensi pedagogik?'
    ]
  },
  {
    id: 5,
    title: 'Penguasaan Materi Pembelajaran',
    subtitle: 'Kedalaman konsep, struktur keilmuan, integrasi dunia nyata, dan pencegahan miskonsepsi',
    description: 'Penguasaan esensi keilmuan, peta konsep, keterkaitan antartopik, serta penyampaian konsep rumit secara sederhana dan relevan dengan kehidupan sehari-hari.',
    iconName: 'BookMarked',
    indicators: [
      { id: 'd5_i1', dimensionId: 5, text: 'Menguasai materi pelajaran secara luas, mendalam, dan terstruktur', description: 'Memahami konsep utama, teori, dan perkembangan terkini materi', hasConsistencyOption: true },
      { id: 'd5_i2', dimensionId: 5, text: 'Memahami struktur konsep dan hubungan antartopik secara komprehensif', description: 'Menghubungkan topik sebelumnya dengan topik baru secara runtut', hasConsistencyOption: false },
      { id: 'd5_i3', dimensionId: 5, text: 'Menghubungkan materi pelajaran dengan kehidupan nyata dan isu kontemporer', description: 'Menjadikan contoh pembelajaran dekat dengan lingkungan siswa', hasConsistencyOption: true },
      { id: 'd5_i4', dimensionId: 5, text: 'Mampu menjelaskan konsep rumit menggunakan bahasa sederhana dan analogi tepat', description: 'Memudahkan pemahaman tanpa mengurangi bobot esensi materi', hasConsistencyOption: false },
      { id: 'd5_i5', dimensionId: 5, text: 'Mengantisipasi dan meluruskan miskonsepsi yang sering terjadi pada siswa', description: 'Peka terhadap salah tafsir konsep umum dan memberi koreksi ilmiah', hasConsistencyOption: true },
      { id: 'd5_i6', dimensionId: 5, text: 'Mengembangkan contoh, studi kasus, dan konteks aplikasi yang relevan', description: 'Menyediakan referensi kaya yang menggugah nalar siswa', hasConsistencyOption: false },
    ],
    reflectionQuestions: [
      'Topik atau konsep materi mana yang menurut Anda paling menantang untuk diajarkan?',
      'Mengapa topik tersebut sering menimbulkan miskonsepsi atau kepahaman yang lambat pada siswa?',
      'Sumber rujukan apa yang biasa Anda pakai untuk memperdalam penguasaan materi?',
      'Bagaimana rencana Anda untuk terus memperbarui dan mendalami konsep materi tersebut?',
      'Kemitraan atau bimbingan keahlian apa yang Anda perlukan dalam penguasaan konten?'
    ]
  },
  {
    id: 6,
    title: 'Penggunaan Teknologi & Artificial Intelligence (AI)',
    subtitle: 'Pemanfaatan media digital, platform edukasi, dan penggunaan AI secara etis dan produktif',
    description: 'Integrasi teknologi tepat guna untuk efisiensi mengajar, variasi media visual/interaktif, serta penggunaan kecerdasan buatan (seperti ChatGPT/Gemini) secara bijak tanpa mengesampingkan penalaran mandiri.',
    iconName: 'Cpu',
    indicators: [
      { id: 'd6_i1', dimensionId: 6, text: 'Menggunakan teknologi informasi dan komunikasi secara efektif dalam pembelajaran', description: 'Memanfaatkan proyektor, presentasi interaktif, atau komputer secara lancar', hasConsistencyOption: true },
      { id: 'd6_i2', dimensionId: 6, text: 'Menggunakan media pembelajaran digital (video, kuis interaktif, simulasi)', description: 'Menghadirkan Quizizz, Kahoot, Phet Simulation, Canva, atau YouTube edukasi', hasConsistencyOption: true },
      { id: 'd6_i3', dimensionId: 6, text: 'Menggunakan platform pembelajaran (LMS, Google Classroom, PMM, dll)', description: 'Mengelola tugas, materi, dan diskusi digital secara terorganisir', hasConsistencyOption: false },
      { id: 'd6_i4', dimensionId: 6, text: 'Memanfaatkan Artificial Intelligence (AI) secara etis untuk membantu pekerjaan guru', description: 'Menggunakan AI untuk pembuatan draf soal, ide ide modul, atau inspirasi aktivitas', hasConsistencyOption: true },
      { id: 'd6_i5', dimensionId: 6, text: 'Tidak bergantung sepenuhnya pada AI dan tetap melakukan verifikasi mandiri', description: 'Menilai dan mengedit output AI sesuai konteks kelas lokal', hasConsistencyOption: false },
      { id: 'd6_i6', dimensionId: 6, text: 'Memastikan penggunaan teknologi/AI tetap mendorong proses berpikir siswa', description: 'Bukan sekadar salin-tempel, melainkan memandu pemikiran kritis siswa', hasConsistencyOption: true },
      { id: 'd6_i7', dimensionId: 6, text: 'Memanfaatkan teknologi untuk meningkatkan efisiensi dan kualitas pembelajaran', description: 'Menghemat waktu administratif sehingga fokus pada pendampingan siswa', hasConsistencyOption: false },
    ],
    reflectionQuestions: [
      'Kendala utama apa yang Anda hadapi dalam mengintegrasikan teknologi atau AI saat mengajar?',
      'Apakah kendala tersebut bersumber dari fasilitas, keterampilan teknis, atau alokasi waktu?',
      'Aplikasi digital atau tools AI apa yang sudah pernah Anda coba?',
      'Keterampilan teknologi/AI apa yang paling ingin Anda kuasai dalam waktu dekat?',
      'Dukungan perangkat/fasilitas atau pelatihan digital apa yang sekolah perlu fasilitasi?'
    ]
  },
  {
    id: 7,
    title: 'Pengelolaan Kelas & Iklim Belajar',
    subtitle: 'Penciptaan suasana aman, positif, penanganan konflik, serta pembentukan disiplin positif',
    description: 'Kemampuan mengelola dinamika perilaku peserta didik, menciptakan ruang kelas yang aman secara fisik dan emosional, menangani kedisiplinan tanpa kekerasan, serta membangun kesepakatan bersama.',
    iconName: 'ShieldCheck',
    indicators: [
      { id: 'd7_i1', dimensionId: 7, text: 'Menciptakan suasana kelas yang aman, nyaman, dan menyenangkan', description: 'Siswa bebas mengekspresikan pendapat tanpa takut dibully atau diejek', hasConsistencyOption: true },
      { id: 'd7_i2', dimensionId: 7, text: 'Mengelola perilaku siswa dengan pendekatan persuasif dan empatik', description: 'Merespon gangguan belajar secara tenang dan solutif', hasConsistencyOption: true },
      { id: 'd7_i3', dimensionId: 7, text: 'Membangun disiplin positif berbasis kesepakatan/keyakinan kelas', description: 'Melibatkan siswa menyusun kesepakatan dan konsekuensi logis', hasConsistencyOption: true },
      { id: 'd7_i4', dimensionId: 7, text: 'Mengelola kelas heterogen dengan berbagai dinamika latar belakang', description: 'Menjaga keteraturan saat siswa bekerja individual maupun kelompok', hasConsistencyOption: false },
      { id: 'd7_i5', dimensionId: 7, text: 'Menangani perselisihan atau konflik antar-siswa secara bijaksana', description: 'Mendengarkan kedua belah pihak dan memandu restitusi', hasConsistencyOption: false },
      { id: 'd7_i6', dimensionId: 7, text: 'Membangun hubungan saling percaya, ramah, dan bersahabat dengan murid', description: 'Menjadi sosok pembimbing yang disegani dan mudah diajak berdiskusi', hasConsistencyOption: true },
    ],
    reflectionQuestions: [
      'Situasi pengelolaan kelas seperti apa yang paling sering menguji kesabaran atau membingungkan Anda?',
      'Mengapa masalah perilaku siswa tersebut sulit diatasi hanya dengan aturan biasa?',
      'Bagaimana cara Anda memulihkan ketenangan dan suasana belajar selama ini?',
      'Pendekatan disiplin positif apa yang ingin Anda perkuat di kelas?',
      'Bantuan seperti apa (misal: kerja sama dengan Guru BK/Orang Tua/Pengawas) yang diperlukan?'
    ]
  },
  {
    id: 8,
    title: 'Kemampuan Berpikir Tingkat Tinggi (HOTS)',
    subtitle: 'Pengembangan nalar kritis, kreativitas, pemecahan masalah, dan pertanyaan tingkat lanjut',
    description: 'Penyusunan pertanyaan terbuka, tugas studi kasus, stimulasi kemampuan analisis, evaluasi, serta penciptaan karya kreatif oleh siswa.',
    iconName: 'Sparkles',
    indicators: [
      { id: 'd8_i1', dimensionId: 8, text: 'Mengembangkan kemampuan berpikir kritis pada siswa melalui diskusi dan analisis', description: 'Mengajak siswa menganalisis argumen, data, atau fenomena', hasConsistencyOption: true },
      { id: 'd8_i2', dimensionId: 8, text: 'Mengembangkan kreativitas siswa melalui tugas terbuka atau pembuatan karya', description: 'Membebaskan siswa mengekspresikan gagasan dalam berbagai bentuk', hasConsistencyOption: true },
      { id: 'd8_i3', dimensionId: 8, text: 'Mengembangkan keterampilan pemecahan masalah (problem solving) pada kasus nyata', description: 'Menghadapkan siswa pada tantangan riil dan memandu solusinya', hasConsistencyOption: false },
      { id: 'd8_i4', dimensionId: 8, text: 'Menyusun pertanyaan berbasis HOTS (Higher Order Thinking Skills - C4, C5, C6)', description: 'Pertanyaan tidak sekadar hafalan (C1-C2) melainkan butuh penalaran', hasConsistencyOption: true },
      { id: 'd8_i5', dimensionId: 8, text: 'Menyusun aktivitas yang mewajibkan siswa menganalisis dan membandingkan konsep', description: 'Aktivitas membedakan, mengelompokkan, dan mengkritisi fakta', hasConsistencyOption: false },
      { id: 'd8_i6', dimensionId: 8, text: 'Mendorong siswa untuk selalu memberikan alasan logis di balik jawabannya', description: 'Guru bertanya "Mengapa begitu?" atau "Apa buktinya?"', hasConsistencyOption: true },
      { id: 'd8_i7', dimensionId: 8, text: 'Mendorong siswa mengevaluasi pendapat orang lain dan menciptakan gagasan baru', description: 'Menciptakan ruang apresiasi dan kritik membangun antar-teman', hasConsistencyOption: false },
    ],
    reflectionQuestions: [
      'Mengapa membiasakan siswa menjawab soal/pertanyaan HOTS terkadang mendapat tantangan di kelas?',
      'Apakah tantangan tersebut disebabkan tingkat membaca/kemampuan awal siswa atau bentuk soal?',
      'Bagaimana cara Anda menstimulasi keberanian siswa berargumen sejauh ini?',
      'Langkah apa yang akan Anda lakukan agar pertanyaan mengajar lebih kaya akan penalaran HOTS?',
      'Contoh Bank Soal atau panduan HOTS seperti apa yang paling bermanfaat bagi Anda?'
    ]
  },
  {
    id: 9,
    title: 'Refleksi & Pengembangan Profesionalisme',
    subtitle: 'Evaluasi diri berkala, partisipasi komunitas belajar, dan perbaikan berbasis data',
    description: 'Kesadaran mengevaluasi efektivitas mengajar setelah jam pelajaran, belajar mandiri, aktif di Komunitas Belajar (Kombel/MGMP/KKG), serta terus memperbarui wawasan.',
    iconName: 'Lightbulb',
    indicators: [
      { id: 'd9_i1', dimensionId: 9, text: 'Melakukan refleksi mandiri secara rutin usai melaksanakan pembelajaran', description: 'Mencatat apa yang berhasil, apa yang gagal, dan penyebabnya', hasConsistencyOption: true },
      { id: 'd9_i2', dimensionId: 9, text: 'Mengidentifikasi secara tajam akar masalah utama dalam proses pembelajaran', description: 'Mampu menemukan penyebab mendasar dari rendahnya minat/paham siswa', hasConsistencyOption: false },
      { id: 'd9_i3', dimensionId: 9, text: 'Proaktif mencari solusi dan alternatif metode baru untuk perbaikan', description: 'Mencari rujukan, artikel, atau bertukar pikiran dengan sejawat', hasConsistencyOption: true },
      { id: 'd9_i4', dimensionId: 9, text: 'Membaca sumber profesional (buku, jurnal, modul PMM) secara mandiri', description: 'Melakukan literasi profesional untuk memperkaya wawasan', hasConsistencyOption: true },
      { id: 'd9_i5', dimensionId: 9, text: 'Mengikuti pelatihan, webinar, atau workshop pengembangan kompetensi guru', description: 'Aktif mengasah ketrampilan secara terencana', hasConsistencyOption: false },
      { id: 'd9_i6', dimensionId: 9, text: 'Berbagi praktik baik (sharing best practices) di Kombel/KKG/MGMP', description: 'Menjadi kontributor aktif dalam diskusi rekan sejawat', hasConsistencyOption: true },
      { id: 'd9_i7', dimensionId: 9, text: 'Melakukan perubahan nyata dalam mengajar berdasarkan data evaluasi/umpan balik', description: 'Bukan sekadar formalitas tetapi benar-benar mengubah cara mengajar', hasConsistencyOption: true },
    ],
    reflectionQuestions: [
      'Seberapa rutin Anda menypatkan waktu untuk melakukan refleksi jujur atas cara mengajar Anda?',
      'Hambatan utama apa yang membuat rutinitas refleksi atau membaca modul profesional terabaikan?',
      'Aktivitas pengembangan diri apa yang menurut Anda paling terasa dampaknya dalam mengajar?',
      'Komitmen perbaikan profesional apa yang ingin Anda jadikan kebiasaan baru?',
      'Bagaimana sekolah atau pengawas dapat memfasilitasi Komunitas Belajar yang lebih berdaya?'
    ]
  },
  {
    id: 10,
    title: 'Etika & Profesionalisme Guru',
    subtitle: 'Integritas, keteladanan, tanggung jawab, kolaborasi, dan komitmen mutu sekolah',
    description: 'Sikap profesional, kehadiran, kepatuhan pada norma etika pendidik, hubungan kolaboratif dengan rekan sejawat/orang tua, serta dedikasi bagi kemajuan peserta didik.',
    iconName: 'Award',
    indicators: [
      { id: 'd10_i1', dimensionId: 10, text: 'Menunjukkan rasa tanggung jawab tinggi terhadap tugas dan kewajiban guru', description: 'Hadir tepat waktu, menyelesaikan administrasi, dan mengajar penuh kesadaran', hasConsistencyOption: true },
      { id: 'd10_i2', dimensionId: 10, text: 'Menjaga integritas, kejujuran, dan objektivitas dalam setiap tindakan', description: 'Menilai siswa secara adil dan menjaga nama baik profesi', hasConsistencyOption: true },
      { id: 'd10_i3', dimensionId: 10, text: 'Menjadi keteladanan (role model) bagi siswa dalam sikap, tutur kata, dan perilaku', description: 'Menampilkan sikap santun, ramah, dan disiplin di dalam maupun luar kelas', hasConsistencyOption: false },
      { id: 'd10_i4', dimensionId: 10, text: 'Berkomunikasi secara santun, jelas, dan efektif dengan warga sekolah dan orang tua', description: 'Menjalin kemitraan terbuka dengan orang tua murid demi kemajuan siswa', hasConsistencyOption: true },
      { id: 'd10_i5', dimensionId: 10, text: 'Membangun kolaborasi harmonis dengan sesama rekan guru dan staf', description: 'Bekerja sama dalam tim, merencanakan proyek bersama, dan saling mendukung', hasConsistencyOption: true },
      { id: 'd10_i6', dimensionId: 10, text: 'Memiliki komitmen tulus terhadap perkembangan serta kesejahteraan siswa', description: 'Menempatkan kepentingan dan kebahagiaan belajar siswa sebagai prioritas', hasConsistencyOption: false },
      { id: 'd10_i7', dimensionId: 10, text: 'Memiliki komitmen aktif terhadap peningkatan mutu dan akreditasi sekolah', description: 'Turut serta mendukung program prioritas dan visi-misi sekolah', hasConsistencyOption: false },
    ],
    reflectionQuestions: [
      'Aspek etika dan profesionalisme mana yang menurut Anda sudah menjadi kekuatan pribadi Anda?',
      'Tantangan komunikasi atau kolaborasi seperti apa yang kadang timbul dengan rekan/orang tua?',
      'Bagaimana Anda menjaga semangat dan komitmen profesional di tengah kejenuhan tugas?',
      'Langkah apa yang dapat Anda lakukan untuk mempererat kolaborasi positif di lingkungan sekolah?',
      'Iklim kerja seperti apa yang Anda harapkan diciptakan oleh pimpinan sekolah dan pengawas?'
    ]
  }
];
