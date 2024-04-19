import React from 'react'; // React kütüphanesini içeri aktarır

// styles
import './NavBar.css'; // NavBar bileşeninin stil dosyasını içeri aktarır
// components
import sunIcon from '../images/icon-sun.svg'; // Güneş ikonunu içeri aktarır
import moonIcon from '../images/icon-moon.svg'; // Ay ikonunu içeri aktarır

export default function NavBar({ theme, setTheme }) {
  // Tema değiştirme işlevini tanımlar
  function switchTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Temayı değiştirir
  }

  // Tema değiştirme düğmesini oluşturur
  const themeToggleButton =
    theme === 'light' ? ( // Temaya göre farklı düğme oluşturur
      <button
        className="dark" // Koyu tema için sınıf ekler
        onClick={switchTheme} // Tıklama olayını dinler ve tema değiştirme işlevini çağırır
        aria-label="Switch to dark mode" // Ekran okuyucular için açıklama ekler
      >
        <span>DARK</span> {/* Buton metnini ekler */}
        <img src={moonIcon} alt="darkmode" /> {/* Ay ikonunu ekler */}
      </button>
    ) : (
      <button
        className="light" // Açık tema için sınıf ekler
        onClick={switchTheme} // Tıklama olayını dinler ve tema değiştirme işlevini çağırır
        aria-label="Switch to light mode" // Ekran okuyucular için açıklama ekler
      >
        <span>LIGHT</span> {/* Buton metnini ekler */}
        <img src={sunIcon} alt="lightmode" /> {/* Güneş ikonunu ekler */}
      </button>
    );

  return (
    <header>
      <h1>devfinder</h1> {/* Başlık metnini ekler */}
      {themeToggleButton} {/* Tema değiştirme düğmesini ekler */}
    </header>
  );
}
