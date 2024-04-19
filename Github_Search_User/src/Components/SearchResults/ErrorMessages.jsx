import React from 'react';

// Hata mesajlarını render eden fonksiyonu oluşturur
export default function ErrorMessages({ validUsername, searchQuery, error }) {
  // API sınırlama hatasının kontrolünü yapar
  const apiLimitExceeded = error !== null ? error.startsWith('API rate limit exceeded') : false;
  return (
    <>
      {/* API sınırlama aşıldıysa ve hata mesajı gösterilmelirse */}
      {apiLimitExceeded && (
        <div className="invalid-user-message">
          <h1>
            Sorry, The Api rate limit has been exceeded. Please try again later.
            Only 60 requests per hour are allowed.
          </h1>
        </div>
      )}
      {/* API sınırlama aşılmadıysa ve geçersiz kullanıcı adı varsa ve arama sorgusu girilmişse */}
      {!apiLimitExceeded && !validUsername && searchQuery !== '' && (
        <div className="invalid-user-message">
          <h1>
            Sorry, we can't find any results for this username. Please check the
            spelling and try again.
          </h1>
        </div>
      )}
      {/* API sınırlama aşılmadıysa ve geçersiz kullanıcı adı varsa ve arama sorgusu girilmemişse */}
      {!apiLimitExceeded && !validUsername && searchQuery === '' && (
        <div className="invalid-user-message">
          <h1>You must enter a username to search.</h1>
        </div>
      )}
    </>
  );
}
