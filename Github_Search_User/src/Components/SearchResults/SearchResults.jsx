import React from 'react';  // React kütüphanesini içeri aktarır

// images
import locationImg from '../../images/icon-location.svg';  // Konum ikonunu içeri aktarır
import companyImg from '../../images/icon-company.svg';    // Şirket ikonunu içeri aktarır
import blogImg from '../../images/icon-website.svg';       // Blog ikonunu içeri aktarır
import twitterImg from '../../images/icon-twitter.svg';    // Twitter ikonunu içeri aktarır

// styles
import './SearchResults.css';  // Arama Sonuçları bileşeni için CSS dosyasını içeri aktarır

export default function SearchResults({ userData }) {  // Arama Sonuçları bileşeni, kullanıcı verilerini alır
  const {
    name,
    avatar_url,
    html_url,
    login,
    created_at,
    bio,
    public_repos,
    followers,
    following,
    location,
    blog,
    twitter_username,
    company,
  } = userData;  // Kullanıcı verilerini ayrıştırır ve değişkenlere atar

  const date = new Date(created_at);  // Oluşturulma tarihini alır
  const formattedDate =
    'Joined ' +
    date
      .toLocaleDateString('en-US', {  // Tarihi biçimlendirir
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .split(',')
      .join(' ');

  return (
    <section className="search-results">  {/* Arama sonuçları bölümü */}
      <div className="profile-img-container">  {/* Profil resmi containerı */}
        <img className="profile-img" src={avatar_url} alt="avator pic" />  {/* Profil resmini görüntüler */}
      </div>

      <div className="title-info">  {/* Başlık bilgisi */}
        {name ? <h1>{name}</h1> : <h1 className="not-avail">Not Available</h1>}  {/* Kullanıcı adını görüntüler veya mevcut değilse "Not Available" mesajını görüntüler */}
        <h3>
          <a href={html_url} target="_blank" rel="noreferrer">
            @{login}  {/* Kullanıcı adını bağlantı olarak görüntüler */}
          </a>
        </h3>
        <p className="created-at-date">{formattedDate}</p>  {/* Oluşturulma tarihini görüntüler */}
      </div>
      {bio && <p className="bio">{bio}</p>}  {/* Kullanıcı biyografisini görüntüler veya mevcut değilse "Not Available" mesajını görüntüler */}
      {!bio && (
        <p className="bio">
          This user has not completed their bio section yet. Check back later!  {/* Kullanıcı biyografisinin eksik olduğu durumda bir mesaj görüntüler */}
        </p>
      )}

      <table className="repo-info">  {/* Repo bilgileri tablosu */}
        <thead>
          <tr>
            <td>Repos</td>  {/* Repo sayısını görüntüler */}
            <td>Followers</td>  {/* Takipçi sayısını görüntüler */}
            <td>Following</td>  {/* Takip ettikleri sayısını görüntüler */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{public_repos}</td>  {/* Genel repo sayısını görüntüler */}
            <td>{followers}</td>  {/* Takipçi sayısını görüntüler */}
            <td>{following}</td>  {/* Takip ettikleri sayısını görüntüler */}
          </tr>
        </tbody>
      </table>

      <ul className="contact-info">  {/* İletişim bilgileri listesi */}
        <li>
          <img src={locationImg} alt="locationImg" />  {/* Konum ikonunu görüntüler */}
          {location ? (
            <span>{location}</span>  /* Konumu görüntüler veya mevcut değilse "Not Available" mesajını görüntüler */
          ) : (
            <span className="not-avail">Not Available</span>
          )}
        </li>

        <li>
          <img src={blogImg} alt="blogImg" />  {/* Blog ikonunu görüntüler */}
          {blog ? (
            <a href={blog} target="_blank">
              {blog}
            </a>  /* Blog bağlantısını görüntüler veya mevcut değilse "Not Available" mesajını görüntüler */
          ) : (
            <span className="not-avail">Not Available</span>
          )}
        </li>

        <li>
          <img src={twitterImg} alt="twitterImg" />  {/* Twitter ikonunu görüntüler */}
          {twitter_username ? (
            <a href={`https://twitter.com/${twitter_username}`} target="_blank">
              {twitter_username}
            </a>  /* Twitter kullanıcı adını görüntüler veya mevcut değilse "Not Available" mesajını görüntüler */
          ) : (
            <span className="not-avail">Not Available</span>
          )}
        </li>

        <li>
          <img src={companyImg} alt="companyImg" />  {/* Şirket ikonunu görüntüler */}
          {company ? (
            <span>{company}</span>  /* Şirket bilgisini görüntüler veya mevcut değilse "Not Available" mesajını görüntüler */
          ) : (
            <span className="not-avail">Not Available</span>
          )}
        </li>
      </ul>
    </section>
  );
}
