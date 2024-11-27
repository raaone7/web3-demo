import axios from "axios";

export async function callBackend({ method, path, body, fakeResponse }) {
  const port = 5001;
  if(fakeResponse) return fakeResponse
  const options = {
    url: `http://localhost:${port}/api/${path}`,
    method,
  }
  if (body) options.body = body;
  const response = await axios(options);
  return response.data
}
