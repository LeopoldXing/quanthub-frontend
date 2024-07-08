const DocsPage = () => {
  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="text-4xl font-bold">QHData API Documentation</div>

        {/*  introduction  */}
        <p className="mt-12 leading-normal">
          Welcome to the QHData API documentation. Our API provides comprehensive access to quantitative financial data,
          enabling developers and quantitative analysts to build, test, and deploy their trading strategies efficiently.
          Below you will find detailed information about our API endpoints, request parameters, and response formats.
        </p>

        {/*  section 1: Authentication  */}
        <div className="mt-10">
          <p className="text-2xl font-bold">1. Authentication</p>
          <p className="leading-normal mt-2">
            To access the QHData API, you need to authenticate your requests using an API key. You can obtain your API
            key by registering on our platform and subscribing to one of our data plans.
          </p>
          <p className="leading-normal mt-2">
            <span className="font-bold">API Key Header:</span> <code className="bg-gray-200 px-2 py-1 rounded">Authorization:
            Bearer YOUR_API_KEY</code>
          </p>
        </div>

        {/*  section 2: Endpoints  */}
        <div className="mt-10">
          <p className="text-2xl font-bold">2. Endpoints</p>

          {/*  endpoint: Get Market Data  */}
          <div className="mt-6">
            <p className="text-xl font-semibold">2.1 Get Market Data</p>
            <p className="leading-normal mt-2">
              <span className="font-bold">Endpoint:</span> <code
                className="bg-gray-200 px-2 py-1 rounded">/api/v1/market-data</code>
            </p>
            <p className="leading-normal mt-2">
              <span className="font-bold">Method:</span> GET
            </p>
            <p className="leading-normal mt-2">
              <span className="font-bold">Parameters:</span>
              <ul className="list-disc list-inside">
                <li><span className="font-bold">symbol</span> (string): The stock symbol (e.g., AAPL)</li>
                <li><span className="font-bold">date</span> (string): The date for the data (format: YYYY-MM-DD)</li>
              </ul>
            </p>
            <p className="leading-normal mt-2">
              <span className="font-bold">Response:</span>
              <pre className="bg-gray-100 p-4 rounded">
                {`{
  "symbol": "AAPL",
  "date": "2024-07-08",
  "open": 145.23,
  "close": 147.85,
  "high": 148.00,
  "low": 144.90,
  "volume": 72538291
}`}
              </pre>
            </p>
          </div>

          {/*  endpoint: Get Historical Data  */}
          <div className="mt-6">
            <p className="text-xl font-semibold">2.2 Get Historical Data</p>
            <p className="leading-normal mt-2">
              <span className="font-bold">Endpoint:</span> <code
                className="bg-gray-200 px-2 py-1 rounded">/api/v1/historical-data</code>
            </p>
            <p className="leading-normal mt-2">
              <span className="font-bold">Method:</span> GET
            </p>
            <p className="leading-normal mt-2">
              <span className="font-bold">Parameters:</span>
              <ul className="list-disc list-inside">
                <li><span className="font-bold">symbol</span> (string): The stock symbol (e.g., AAPL)</li>
                <li><span className="font-bold">start_date</span> (string): The start date for the data (format:
                  YYYY-MM-DD)
                </li>
                <li><span className="font-bold">end_date</span> (string): The end date for the data (format: YYYY-MM-DD)
                </li>
              </ul>
            </p>
            <p className="leading-normal mt-2">
              <span className="font-bold">Response:</span>
              <pre className="bg-gray-100 p-4 rounded">
                {`[
  {
    "symbol": "AAPL",
    "date": "2024-07-01",
    "open": 143.45,
    "close": 145.32,
    "high": 145.67,
    "low": 142.50,
    "volume": 64239123
  },
  {
    "symbol": "AAPL",
    "date": "2024-07-02",
    "open": 145.00,
    "close": 146.80,
    "high": 147.00,
    "low": 144.50,
    "volume": 51238912
  }
]`}
              </pre>
            </p>
          </div>
        </div>

        {/*  section 3: Error Handling  */}
        <div className="mt-10">
          <p className="text-2xl font-bold">3. Error Handling</p>
          <p className="leading-normal mt-2">
            Our API uses standard HTTP status codes to indicate the success or failure of a request. Here are some
            common status codes you might encounter:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li><span className="font-bold">200 OK:</span> The request was successful.</li>
            <li><span className="font-bold">400 Bad Request:</span> The request could not be understood or was missing
              required parameters.
            </li>
            <li><span className="font-bold">401 Unauthorized:</span> Authentication failed or user does not have
              permissions for the requested operation.
            </li>
            <li><span className="font-bold">500 Internal Server Error:</span> An error occurred on the server.</li>
          </ul>
        </div>

        {/*  section 4: Rate Limits  */}
        <div className="mt-10">
          <p className="text-2xl font-bold">4. Rate Limits</p>
          <p className="leading-normal mt-2">
            To ensure fair usage and stability of our service, the QHData API imposes rate limits on the number of
            requests that can be made within a certain timeframe.
          </p>
          <p className="leading-normal mt-2">
            <span className="font-bold">Request Limit:</span> 1000 requests per hour
          </p>
          <p className="leading-normal mt-2">
            If you exceed the rate limit, you will receive a <span
              className="font-bold">429 Too Many Requests</span> response. Please wait for the rate limit to reset
            before making further requests.
          </p>
        </div>

        {/*  section 5: Support  */}
        <div className="mt-10">
          <p className="text-2xl font-bold">5. Support</p>
          <p className="leading-normal mt-2">
            If you encounter any issues or have any questions, please contact our support team at <span
              className="font-bold">support@qhdata.com</span>.
          </p>
        </div>
      </div>
  );
};

export default DocsPage;
