const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 px-44 py-20 text-white bottom-0">
      <div className="grid grid-cols-4 gap-10">
        <div>
          <img src="/assets/loger.png" alt="GetMedia" className="w-52 mb-3" />
          <p className="text-gray-300">
            Bloger.id berita terlengkap dengan berita terbaru dan terpopuler
          </p>
          <div className="mt-4">
            <h3 className="text-gray-400 font-medium">Pengiklanan</h3>
            <a href="#" className="text-blue-400 hover:underline">
              + Tentang Iklan
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-gray-400 font-medium mb-3">Halaman</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Beranda
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Politk
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ekonomi
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Olahraga
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Teknologi
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hiburan
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-400 font-medium mb-3">Social Media</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-400 font-medium mb-3">Kontak</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:getmedia@gmail.com" className="hover:underline">
                Blogger@gmail.com
              </a>
            </li>
            <li>
              <p>+62 8125 2328  864</p>
            </li>
            <li>
              <p>Kontak belum tersedia</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
