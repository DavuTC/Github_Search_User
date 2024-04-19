import React from 'react'; // React kütüphanesini içeri aktarır

import { useState } from 'react'; // useState hook'unu içeri aktarır

// styles
import './SearchBar.css'; // Arama çubuğu bileşeninin CSS dosyasını içeri aktarır
import searchicon from '../images/icon-search.svg'; // Arama simgesinin yolunu içeri aktarır

export default function SearchBar({ setSearchQuery, validUsername }) {
  const [tempVal, setTempVal] = useState(''); // Arama çubuğundaki geçici değeri tutmak için bir state tanımlar

  function handleSubmit(e) { // Arama formunun gönderim işlemini ele alır
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    setSearchQuery(tempVal); // Arama sorgusunu ayarlamak için setSearchQuery fonksiyonunu çağırır
  }

  return (
    <div className="search-bar-container"> {/* Arama çubuğu bileşenini içeren ana konteynırı oluşturur */}
      <form className="form-container"> {/*/ Arama formunu oluşturur */}
        <img src={searchicon} alt="searchicon" /> {/* Arama simgesini gösterir */}
        <input
          type="text"
          placeholder="Search GitHub username..."      /* Arama kutusuna varsayılan metni yerleştirir */
          onChange={(e) => setTempVal(e.target.value)}      /* Arama kutusundaki değeri geçici değişkene ayarlar */
        />

        {!validUsername && <span className="no-results">No Results</span>} {/* Geçersiz kullanıcı adı varsa "No Results" mesajını gösterir */}
        <button onClick={handleSubmit}>Search</button> {/* Arama düğmesini oluşturur ve tıklanma olayını handleSubmit fonksiyonuna bağlar */}
      </form>
    </div>
  );
}
