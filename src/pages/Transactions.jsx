import { useState } from "react";
import { callBackend } from "@/hooks/callBackend";

export default function Transactions() {
  const [address, setAddress] = useState("0x95B74300715e8bffcFEE9416C90242607da89186");
  const [responseData, setResponseData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("input", address, startDate, endDate);  
      let path = `exam/transactions/${address}`;
      const queryParams = [];
      if (startDate) {
        queryParams.push(`startDate=${startDate}`);
      }
      if (endDate) {
        queryParams.push(`endDate=${endDate}`);
      }
      if (queryParams.length > 0) {
        path += `?${queryParams.join('&')}`;
      }
      console.log(path);

      const data = await callBackend({
        method: "GET",
        path,
      });
      setResponseData(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-10 space-y-6">
      <h1 className="text-2xl font-bold">Fetch Transactions</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Fetch Transactions"}
        </button>
      </form>
      {error && (
        <div className="text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
      {responseData && (
        <div className="p-4 mt-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold">Response:</h2>
          <pre className="overflow-x-auto text-sm">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
