const AboutPage = () => {
  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="text-4xl font-bold">About US</div>
        {/*  paragraph  */}
        <p className="mt-12 leading-normal">
          QuanHub Technologies Ltd., founded in 2015, focuses on providing IT solutions for quantitative investment
          research. We have created the QuanHub Quantitative Research Platform tailored for quant enthusiasts, offering
          comprehensive research data, a user-friendly strategy development environment, precise backtesting/simulated
          trading engines, and an active quant community to facilitate the rapid implementation and utilization of your
          quantitative strategies. Over the years, QuanHub has amassed tens of thousands of registered users and has
          become a leading platform in the field of quantitative research in China. Our company provides research
          systems, trading algorithms, and T0 services to numerous domestic securities firms and delivers quantitative
          data (QHData) services to thousands of quant institutions. We have earned several certifications, including
          the National High-Tech Enterprise and Beijing Specialized and New Small and Medium Enterprise.
        </p>
        {/*  paragraph 2  */}
        <p className="mt-10">
          <p className="leading-10">The QuanHub Quantitative Research Platform has served over 400,000 users in its
            8-year history.</p>

          <p className="leading-10">
            In 2017, we received a strategic investment of nearly 100 million yuan from Baidu and established a deep
            collaboration.
          </p>

          <p className="leading-10">We provide quantitative research services to over 11 of the top 15 domestic
            securities firms.</p>

          <p className="leading-10">We offer local quantitative data services (QHData) to over 3,000 quant
            institutions in China.</p>

          <p className="leading-10">
            Our T0 algorithm is live with 8 securities firms, serving tens of thousands of clients and hundreds of
            institutions.
          </p>

          <p className="leading-10">
            Our private equity fund began external services in September 2019 and currently manages assets worth
            billions.
          </p>

          <p className="leading-10">Our annual transaction volume exceeds trillions.</p>
        </p>
        {/*  paragraph 3  */}
        <p className="mt-10">
          <p className="leading-normal">
            We are committed to continually strengthening our research team and trading technology. Our colleagues are
            exceptional, humble, cautious, rigorous, diligent, and responsible, always supporting each other to the
            fullest. Most importantly, our goal is to become a company with high per capita revenue.
          </p>

          <p className="leading-normal font-bold">
            We are willing to invest sufficient time and effort to find long-term partners who share our vision and
            values.
          </p>
        </p>
        {/*  paragraph 4  */}
        <p className="mt-10">
          <p className="leading-normal">We look forward to your joining us and creating a legend together!</p>

          <p className="leading-normal">
            Interested candidates, please send your resume to our company email: <span
              className="font-bold">hr@quanhub.com</span><br/>
            Email Subject: <span className="font-bold"> Name + Position Applied + Source of Information</span>
          </p>

          <p className="leading-normal">We are eager to welcome you to our team!</p>
        </p>
        {/*  paragraph 5  */}
        <p className="mt-10">
          <p className="text-xl font-bold leading-10">Addresses:</p>

          <p className="leading-loose">New York: 123 Wall Street, Financial District, Manhattan, NY</p>
          <p className="leading-loose">San Francisco: 456 Market Street, Financial District, CA</p>
          <p className="leading-loose">Chicago: 789 Wacker Drive, Loop, IL</p>
          <p className="leading-loose">Los Angeles: 101 Hollywood Boulevard, Hollywood, CA</p>
          <p className="leading-loose">Houston: 234 Main Street, Downtown, TX</p>
        </p>
      </div>
  );
};

export default AboutPage;
