import React from "react";  // React kütüphanesini içeri aktarır
import { useState, useEffect } from 'react'     // useEffect ve useState hook'larını içeri aktarır
import useLocalStorage from 'use-local-storage'   // useLocalStorage kancasını içeri aktarır

// styles
import "./App.css";

//components Bileşenleri içeri aktarır
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import ErrorMessages from "./Components/SearchResults/ErrorMessages";
import SearchResults from "./Components/SearchResults/SearchResults";

function App() {

   // Bileşende kullanılacak state'leri tanımladık
  const [userData, setUserData] = useState({}); // Kullanıcı verilerini tutar
  const [searchQuery, setSearchQuery] = useState('octocat');  // Arama sorgusunu tutar (varsayılan olarak 'octocat')
  const [validUsername, setvalidUsername] = useState(true);    // Geçerli bir kullanıcı adı olup olmadığını belirtir
  const [error, setError] = useState(null);     // API'den dönen hataları tutar
  const [loading, setLoading] = useState(false);  // Verinin yüklenip yüklenmediğini belirtir
  
  
  //dark mode

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches; //// Tarayıcının varsayılan tema modunu alır
  const [theme, setTheme] = useLocalStorage(    // Temayı yerel depolama üzerinden yönetmek için useLocalStorage hook'unu kullanır
    'theme',
    defaultDark ? 'dark' : 'light'      // Varsayılan temayı ayarlar (tarayıcı ayarlarına göre)
  );

  // useEffect hook'unu kullanarak veri alma işlemini gerçekleştirir
  useEffect(() => {
    async function fetchDate() {
      try {
        setLoading (true);  // Yükleme işlemi başladığında loading state'ini true yapar
        setvalidUsername(true); // Kullanıcı adının geçerli olduğunu varsayar
        const response = await fetch(   // GitHub API'sinden veri alır
          `https://api.github.com/users/${searchQuery}`  // GitHub API
        );
        const data = await response.json(); // API'den gelen veriyi JSON formatına dönüştürür verileri json olarak kullanıyoruz
        console.log(data); // Konsola gelen veriyi yazdırır

        if (response.ok) {    // Eğer API'den başarılı bir yanıt alındıysa
          setUserData(data);  //Kullanıcı verilerini günceller
          setLoading(false);  // ve Yükleme işlemini tamamlar
        }
        else if (data.message) {    // API'den hata mesajı alındıysa
          setvalidUsername(false);  // Geçersiz kullanıcı adını işaretler
          setLoading(false);      // ve Yükleme işlemini tamamlar
          setError(data.message);   // Hata mesajını belirler
           console.log(error); // Error mesajını yazdırır
        }
      }
      catch (error) {   // Herhangi bir hata oluşursa
        setError(error.message);  // Hata mesajını belirler
        // console.log(error);  //Konsola hatayı yazdırır 
      }
    }
    fetchDate();    // fetchData fonksiyonunu çalıştırır
  }, [searchQuery, error]);   // useEffect'i searchQuery veya error değiştiğinde yeniden çalışacak şekilde ayarlar
  


  return (
    
    <div className="body" data-theme={theme}>       {/* Temayı uygular */}
      <div className="app-container">                {/* Uygulama konteynırını oluşturur */}
        <NavBar theme={theme} setTheme={setTheme} />    {/* Navigasyon çubuğu bileşenini oluşturur */}
        <SearchBar      // Arama çubuğu bileşenini oluşturur
          setSearchQuery={setSearchQuery}   // Arama sorgusunu ayarlayacak fonksiyonu geçirir
          validUsername={validUsername}     // Geçerli kullanıcı adı durumunu geçirir
        />
        {loading && <h1>Loading...</h1>}    {/* Yükleme durumunu gösterir */}

        

        {/* Geçerli kullanıcı adı varsa ve yükleme tamamlanmışsa arama sonuçlarını gösterir */}
        {validUsername && !loading && <SearchResults userData={userData} />}
        <ErrorMessages      // Hata mesajlarını gösterir
          validUsername={validUsername}     // Geçerli kullanıcı adı durumunu geçirir
          searchQuery={searchQuery}     // Geçerli kullanıcı adı durumunu geçirir
          error={error}    // Hata mesajını geçirir
        />

      </div>
    </div>
  );
}

export default App //  Bu bileşenini dışa aktarır
