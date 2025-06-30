// Menunggu hingga seluruh dokumen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // Ambil semua elemen dari HTML setelah dipastikan ada
    const aSlider = document.getElementById('aSlider');
    const bSlider = document.getElementById('bSlider');
    const cSlider = document.getElementById('cSlider');
    const dSlider = document.getElementById('dSlider');

    const aValue = document.getElementById('aValue');
    const bValue = document.getElementById('bValue');
    const cValue = document.getElementById('cValue');
    const dValue = document.getElementById('dValue');

    // Cek apakah Plotly tersedia (pencegahan error)
    if (typeof Plotly === 'undefined') {
        console.error("Plotly library not found. Make sure it's loaded before this script.");
        // Anda bisa menampilkan pesan error di halaman jika perlu
        document.getElementById('graph').textContent = 'Error: Gagal memuat library grafik.';
        return; // Hentikan eksekusi jika Plotly tidak ada
    }

    // Fungsi utama untuk menggambar/memperbarui grafik
    function updateGraph() {
        // Ambil nilai terbaru dari setiap slider
        const a = parseFloat(aSlider.value);
        const b = parseFloat(bSlider.value);
        const c = parseFloat(cSlider.value);
        const d = parseFloat(dSlider.value);

        // === INI BAGIAN PENTING YANG MEMPERBARUI TAMPILAN ANGKA ===
        // .textContent digunakan untuk mengubah teks di dalam <span>
        aValue.textContent = a.toFixed(1);
        bValue.textContent = b.toFixed(1);
        cValue.textContent = c.toFixed(1);
        dValue.textContent = d.toFixed(1);

        // Logika Plotly untuk membuat data grafik
        const x_points = [];
        const y_points = [];
        for (let x = -2 * Math.PI; x <= 2 * Math.PI; x += 0.02) {
            x_points.push(x);
            y_points.push(a * Math.sin(b * x + c) + d);
        }

        // Konfigurasi layout Plotly
        const layout = {
            title: {
                text: 'y = ' + a.toFixed(1) + ' sin(' + b.toFixed(1) + 'x + ' + c.toFixed(1) + ') + ' + d.toFixed(1),
                font: {
                    size: 16
                }
            },
            xaxis: { title: 'x (radian)', zeroline: true },
            yaxis: { title: 'y', range: [-10, 10], zeroline: true },
            margin: { l: 50, r: 20, b: 40, t: 50 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: '#f8f9fa' // Warna latar plot yang sangat terang
        };
        
        const config = {responsive: true};

        // Gambar atau perbarui grafik yang ada
        Plotly.newPlot('graph', [{ x: x_points, y: y_points, type: 'scatter', mode: 'lines', line: {color: '#007bff', width: 3} }], layout, config);
    }

    // Tambahkan event listener 'input' ke setiap slider.
    // 'input' akan aktif setiap kali slider digeser.
    aSlider.addEventListener('input', updateGraph);
    bSlider.addEventListener('input', updateGraph);
    cSlider.addEventListener('input', updateGraph);
    dSlider.addEventListener('input', updateGraph);

    // Panggil updateGraph() sekali di awal untuk menggambar grafik pertama kali
    updateGraph();

}); // Akhir dari event listener DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {

    const bukaKuisBtn = document.getElementById('bukaKuisBtn');
    const tutupKuisBtn = document.getElementById('tutupKuisBtn');
    const kuisModal = document.getElementById('kuisModal');
    const frameKuis = document.getElementById('frameKuis');

    // URL kuis Anda (tempelkan di sini)
    const urlKuis = "https://wayground.com/join/quiz/5ecda14e4b37f9001b80d978/start?studentShare=true"; // Saya ganti URL Anda agar bisa di-embed

    // Fungsi untuk membuka modal
    const bukaModal = () => {
        // Set src iframe HANYA saat modal dibuka
        frameKuis.src = urlKuis;
        // Tampilkan modal
        kuisModal.style.display = 'flex';
    };

    // Fungsi untuk menutup modal
    const tutupModal = () => {
        // Sembunyikan modal
        kuisModal.style.display = 'none';
        // HAPUS src iframe untuk menghentikan kuis (penting untuk performa & suara)
        frameKuis.src = '';
    };

    // Tambahkan event listener untuk tombol buka
    bukaKuisBtn.addEventListener('click', bukaModal);

    // Tambahkan event listener untuk tombol tutup
    tutupKuisBtn.addEventListener('click', tutupModal);

    // Tambahkan event listener untuk menutup modal saat mengklik area luar
    kuisModal.addEventListener('click', (event) => {
        // Jika yang diklik adalah area overlay (bukan konten di dalamnya)
        if (event.target === kuisModal) {
            tutupModal();
        }
    });

    // (Opsional) Tambahkan event listener untuk menutup dengan tombol 'Escape'
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            tutupModal();
        }
    });

});

