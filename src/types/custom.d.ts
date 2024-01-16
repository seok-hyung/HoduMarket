declare module '*.svg' {
  const content: string;
}

declare module '*.png' {
  const content: string;
}

declare module '*.jpeg' {
  const content: string;
}

declare module '*.jpg' {
  const value: string;
}
declare global {
  interface Window {
    daum: any;
    Kakao: any;
  }
}
export { content, value };
