import Axios, { AxiosInstance, AxiosResponse } from "axios";

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  public get<ResponseType>(
    url: string,
    params?: Record<string, any>
  ): Promise<AxiosResponse<ResponseType>> {
    return this.client.get<ResponseType>(url, { params });
  }

  public post<ResponseType, PayloadType>(
    url: string,
    payload: PayloadType
  ): Promise<AxiosResponse<ResponseType>> {
    return this.client.post<ResponseType>(url, payload);
  }
}

const HttpClientInstance = new HttpClient();

export { HttpClientInstance as HttpClient };
