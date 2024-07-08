const Footer = () => {
  return (
      <footer className="bg-[#21305e]">
        {/*  Container  */}
        <div className="max-w-[1700px] mx-auto px-10 py-10 md:px-28">
          {/*  Footer Flex Container  */}
          <div
              className="flex flex-col items-center mb-8 space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-start">
            {/*  Menu & Logo Container  */}
            <div className="flex flex-col items-center space-y-8 md:items-start md:space-y-4">
              {/*  Logo  */}
              <div className="h-8 mb-6 mt-5">
                <a href="./index.html"><span className="font-bold text-white text-4xl text-center hover:cursor-pointer">Quant Hub Community</span></a>
              </div>
              {/*  Menu Container  */}
              <div
                  className="flex flex-col items-center space-y-4 font-bold text-white md:flex-row md:space-y-0 md:space-x-6 md:ml-3">
                {/*  Item 1  */}
                <div className="h-10 group">
                  <a href="/about">About</a>
                  <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                </div>
                {/*  Item 2  */}
                <div className="h-10 group">
                  <a href="/articles">Articles</a>
                  <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                </div>
                {/*  Item 3  */}
                <div className="h-10 group">
                  <a href="/docs">Docs</a>
                  <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                </div>
                {/*  Item 4  */}
                <div className="h-10 group">
                  <a href="/support">Support</a>
                  <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                </div>
              </div>
            </div>

            {/*  Social & Copy Container  */}
            <div className="flex flex-col items-start justify-between space-y-4 text-gray-500">
              {/*  icons Container  */}
              <div className="flex items-center justify-center mx-auto space-x-4 md:justify-end md:mx-0">
                {/*  Icon 1  */}
                <div className="h-8 group">
                  <a href="#">
                    <img src="assets/icons/icon-facebook.svg" alt="" className="h-6"/>
                  </a>
                </div>
                {/*  Icon 2  */}
                <div className="h-8 group">
                  <a href="#">
                    <img src="assets/icons/icon-twitter.svg" alt="" className="h-6"/>
                  </a>
                </div>
                {/*  Icon 3  */}
                <div className="h-8 group">
                  <a href="#">
                    <img src="assets/icons/icon-pinterest.svg" alt="" className="h-6"/>
                  </a>
                </div>
                {/*  Icon 4  */}
                <div className="h-8 group">
                  <a href="#">
                    <img src="assets/icons/icon-instagram.svg" alt="" className="h-6"/>
                  </a>
                </div>
              </div>

              {/*  Copy  */}
              <div className="font-bold">
                &copy; 2024 Quant Hub Community. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
