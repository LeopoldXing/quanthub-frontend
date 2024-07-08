import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import banner from "@/assets/banner.svg";
import pythonPic from "@/assets/frontpage/python.svg";
import qtData from "@/assets/frontpage/fetchDataDemo.svg";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import ArticleOverview from "@/components/ArticleOverview.tsx";

const HomePage = () => {
  // auth0
  const { loginWithPopup, isAuthenticated } = useAuth0();

  return (
      /*  Layout container  */
      <div className="min-h-screen w-screen">
        <Header/>
        {/*  Home page container - with background color  */}
        <div className="w-screen bg-[#21305e]">
          {/*  Part 1: Text & Banner  */}
          <div
              className="max-w-[1700px] min-h-[700px] mx-auto px-10 py-8 md:py-0 md:px-28 flex justify-between items-center">
            {/*  Text button on the left  */}
            <div className="w-full -mt-16 pr-12 xl:w-1/2">
              <div className="text-6xl font-bold text-white text-wrap leading-normal">Start Your Trading Journey In
                QuantHub
              </div>
              <div className="mt-12 text-xl text-gray-300 text-wrap leading-tight">We provide free financial data,
                investment research tools, quantitative trading learning courses, and online communication community
              </div>
              {/*  button  */}
              <div className="mt-20">
                <Button variant="contained" size="large" onClick={async () => await loginWithPopup()} sx={{
                  backgroundColor: "#34d399",
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  fontSize: "18px",
                  py: "16px",
                  '&:hover': {
                    backgroundColor: '#a3d5f7',
                    color: '#21305e'
                  }
                }}>Getting Started!</Button>
              </div>
            </div>
            {/*  banner on the right  */}
            <div className="hidden xl:w-1/2 -mt-20 xl:block">
              <img src={banner} alt="banner"/>
            </div>
          </div>
        </div>
        <div className="w-screen bg-gradient-to-br from-[#d9e2ec] to-[#f0f4f8] pb-10">
          {/*  Part 2: Hot articles  */}
          <div className="max-w-[1700px] mx-auto px-10 md:px-28 flex flex-col justify-start items-center">
            {/*  title  */}
            <div className="mt-32 text-black font-bold text-4xl">Trending Articles</div>
            {/*  article container  */}
            <div
                className="w-full min-h-[600px] mt-16 pb-10 grid lg:grid-cols-2 xl:grid-cols-3 gap-10 items-center bg-yellow-200">
              <ArticleOverview/>
              <ArticleOverview/>
              <ArticleOverview/>
            </div>
          </div>
          {/*  Part 3: Sponsor  */}
          <div className="max-w-[1700px] mx-auto px-10 md:px-28 flex flex-col justify-start items-center mt-16">
            {/*  strategy research platform  */}
            <div className="flex justify-between items-center">
              {/*  picture  */}
              <div className="hidden w-full mt-12 xl:block">
                <img src={pythonPic} alt="python demo"/>
              </div>
              {/*  description  */}
              <div>
                {/*  title  */}
                <div className="mb-10 text-4xl">Strategy Research Platform</div>
                {/*  content  */}
                <div className="mb-5 text-lg text-gray-600">We provide professionally cleaned A-share data, futures
                  data, options data, fund data, macro data,
                  and hundreds of commonly used factors and third-party databases; you can easily use QuantHub for
                  strategy research, historical backtesting, simulated trading, and real trading.
                </div>
                {/*  link  */}
                <a className="block text-blue-500 cursor-pointer">Read more</a>
              </div>
            </div>
            {/*  QHData data  */}
            <div className="mt-12 flex justify-between items-center">
              {/*  description  */}
              <div className="xl:pl-12 xl:pr-12">
                {/*  title  */}
                <div className="mb-10 text-4xl">QHData</div>
                {/*  content  */}
                <div className="mb-5 text-lg text-gray-600">We provide professionally cleaned A-share data, futures
                  Just enter three lines of code to call the full set of quantitative financial data professionally
                  produced by the QuantHub Data team, allowing you to easily say goodbye to platform restrictions and
                  complete localized quantitative research and investment decisions flexibly and safely.
                </div>
                {/*  link  */}
                <a className="block text-blue-500 cursor-pointer">Read more</a>
              </div>
              {/*  picture  */}
              <div className="hidden w-full mt-12 xl:block">
                <img src={qtData} alt="qhdata"/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  )
};

export default HomePage;
