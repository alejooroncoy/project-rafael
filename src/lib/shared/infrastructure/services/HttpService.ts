import { injectable } from 'inversify';

type QueryParams = Record<string, string | number | boolean>;

function buildUrl(url: string, params?: QueryParams): string {
  if (!params) return url;
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) usp.append(key, String(value));
  });
  return url + (url.includes('?') ? '&' : '?') + usp.toString();
}

@injectable()
export class HttpService {
  async get<T>(url: string, options?: { params?: QueryParams, headers?: HeadersInit }): Promise<T> {
    const fullUrl = buildUrl(url, options?.params);
    const res = await fetch(fullUrl, {
      method: 'GET',
      headers: options?.headers,
    });
    if (!res.ok) throw new Error('HTTP GET error');
    return res.json();
  }

  async post<T>(url: string, body?: unknown, options?: { params?: QueryParams, headers?: HeadersInit }): Promise<T> {
    const fullUrl = buildUrl(url, options?.params);
    const res = await fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error('HTTP POST error');
    return res.json();
  }

  async put<T>(url: string, body?: unknown, options?: { params?: QueryParams, headers?: HeadersInit }): Promise<T> {
    const fullUrl = buildUrl(url, options?.params);
    const res = await fetch(fullUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error('HTTP PUT error');
    return res.json();
  }

  async patch<T>(url: string, body?: unknown, options?: { params?: QueryParams, headers?: HeadersInit }): Promise<T> {
    const fullUrl = buildUrl(url, options?.params);
    const res = await fetch(fullUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error('HTTP PATCH error');
    return res.json();
  }

  async delete<T>(url: string, options?: { params?: QueryParams, headers?: HeadersInit, body?: unknown }): Promise<T> {
    const fullUrl = buildUrl(url, options?.params);
    const res = await fetch(fullUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
    if (!res.ok) throw new Error('HTTP DELETE error');
    return res.json();
  }
} 