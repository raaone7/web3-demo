import { useState } from "react";
import { callBackend } from "@/hooks/callBackend";

export default function NftMetadata() {
  const [contractAddress, setContractAddress] = useState("0x5769a9F138f3131f35ED3E2b80baD43A3D599e5e");
  const [tokenId, setTokenId] = useState("1");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await callBackend({
        method: "GET",
        path: `exam/metadata/${contractAddress}/${tokenId}`,
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
      <h1 className="text-2xl font-bold">Fetch NFT Metadata</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="contractAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Contract Address
          </label>
          <input
            type="text"
            id="contractAddress"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label
            htmlFor="tokenId"
            className="block text-sm font-medium text-gray-700"
          >
            Token ID
          </label>
          <input
            type="text"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Fetch Metadata"}
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

          {responseData.image && (
            <>
              <h2 className="text-lg font-semibold">Image:</h2>
              <img src={responseData.image} alt="NFT" className="w-1/2" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
