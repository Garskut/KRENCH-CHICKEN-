// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Modal Functionality
const modal = document.getElementById('syaratModal');
const closeModal = document.querySelector('.close-modal');
const syaratButtons = document.querySelectorAll('.syarat-btn');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

// Syarat dan ketentuan untuk setiap promo
const syaratKetentuan = {
    'paket-malam': {
        title: 'Syarat dan Ketentuan Paket Malam',
        content: `
            <p>Berikut adalah syarat dan ketentuan untuk Paket Malam:</p>
            <ul>
                <li>Promo berlaku setiap hari mulai pukul 18.00 - 22.00 WIB</li>
                <li>Berlaku untuk dine-in, take away, dan delivery</li>
                <li>Tidak dapat digabungkan dengan promo lainnya</li>
                <li>Harga belum termasuk pajak</li>
                <li>Krench Chicken berhak mengubah syarat dan ketentuan tanpa pemberitahuan terlebih dahulu</li>
            </ul>
            <p>Untuk informasi lebih lanjut, silakan hubungi customer service kami di (021) 1234-5678.</p>
        `
    },
    'diskon-bulanan': {
        title: 'Syarat dan Ketentuan Diskon Bulanan',
        content: `
            <p>Berikut adalah syarat dan ketentuan untuk Diskon Bulanan:</p>
            <ul>
                <li>Promo berlaku hingga akhir bulan ini</li>
                <li>Diskon 20% berlaku untuk pembelian Krench Chicken sandwich</li>
                <li>Gunakan kode promo "KRENCHSANDWICH" saat melakukan pemesanan</li>
                <li>Berlaku untuk dine-in, take away, dan delivery melalui aplikasi resmi Krench Chicken</li>
                <li>Maksimal 2 kali penggunaan per akun</li>
                <li>Tidak dapat digabungkan dengan promo lainnya</li>
            </ul>
            <p>Untuk informasi lebih lanjut, silakan hubungi customer service kami di (021) 1234-5678.</p>
        `
    },
    'beli2-gratis1': {
        title: 'Syarat dan Ketentuan Beli 2 Gratis 1',
        content: `
            <p>Berikut adalah syarat dan ketentuan untuk promo Beli 2 Gratis 1:</p>
            <ul>
                <li>Promo berlaku setiap hari Selasa</li>
                <li>Beli 2 porsi ayam goreng ukuran apa saja, dapatkan 1 porsi ayam goreng ukuran regular secara gratis</li>
                <li>Berlaku untuk dine-in dan take away</li>
                <li>Tidak berlaku untuk delivery</li>
                <li>Tidak dapat digabungkan dengan promo lainnya</li>
                <li>Selama persediaan masih ada</li>
            </ul>
            <p>Untuk informasi lebih lanjut, silakan hubungi customer service kami di (021) 1234-5678.</p>
        `
    },
    'family-everything': {
        title: 'Syarat dan Ketentuan Family Everything',
        content: `
            <p>Berikut adalah syarat dan ketentuan untuk paket Family Everything:</p>
            <ul>
                <li>Paket terdiri dari 8 potong ayam, 4 nasi, dan 4 minuman</li>
                <li>Hemat hingga 25% dari harga normal</li>
                <li>Berlaku setiap hari</li>
                <li>Berlaku untuk dine-in, take away, dan delivery</li>
                <li>Untuk delivery, dikenakan biaya pengiriman sesuai jarak</li>
                <li>Tidak dapat digabungkan dengan promo lainnya</li>
            </ul>
            <p>Untuk informasi lebih lanjut, silakan hubungi customer service kami di (021) 1234-5678.</p>
        `
    }
};

// Buka modal saat tombol syarat diklik
syaratButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const promoId = button.getAttribute('data-promo');
        const syarat = syaratKetentuan[promoId];
        
        if (syarat) {
            modalTitle.textContent = syarat.title;
            modalBody.innerHTML = syarat.content;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Mencegah scrolling pada body
            
            // Animasi entrance
            setTimeout(() => {
                modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        }
    });
});

// Tutup modal saat tombol close diklik
closeModal.addEventListener('click', () => {
    closeModalFunction();
});

// Tutup modal saat klik di luar modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunction();
    }
});

// Fungsi untuk menutup modal
function closeModalFunction() {
    modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Mengaktifkan kembali scrolling pada body
    }, 300);
}

// Animasi scroll untuk promo items
function animateOnScroll() {
    const promoItems = document.querySelectorAll('.promo-item');
    
    promoItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

// Set initial state for animation
window.addEventListener('DOMContentLoaded', () => {
    const promoItems = document.querySelectorAll('.promo-item');
    
    promoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation after a short delay
    setTimeout(() => {
        animateOnScroll();
    }, 300);
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);