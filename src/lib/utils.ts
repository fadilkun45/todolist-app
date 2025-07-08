import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cookies = {
  getCookies: (): Record<string, string> => {
    return document.cookie
      .split("; ")
      .filter(Boolean)
      .reduce((acc, cookie) => {
        const [key, ...rest] = cookie.split("=");
        acc[key] = decodeURIComponent(rest.join("="));
        return acc;
      }, {} as Record<string, string>);
  },
  getCookie: (name: string): string | undefined => {
    const cookies = document.cookie
      .split("; ")
      .filter(Boolean)
      .reduce((acc, cookie) => {
        const [key, ...rest] = cookie.split("=");
        acc[key] = decodeURIComponent(rest.join("="));
        return acc;
      }, {} as Record<string, string>);
    return cookies[name];
  },
  saveCookie: (name: string, value: string, days?: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/;`;
  },
  deleteCookie: (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};



export const helpersFunctions = {
  FormatRC: (data: any[], valueKey: string, labelKey: string) => {
    return data.map(item => ({
      value: item[valueKey],
      label: item[labelKey]
    }));
  }
}
