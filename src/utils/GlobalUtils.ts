import SparkMD5 from 'spark-md5';

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const calculateMD5 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target!.result as ArrayBuffer;
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(arrayBuffer);
      const md5Hash = spark.end();
      const rawHash = hexStringToByteArray(md5Hash);
      const base64String = btoa(String.fromCharCode(...rawHash));
      resolve(base64String);
    };
    reader.onerror = function (err) {
      reject(err);
    };
    reader.readAsArrayBuffer(file);
  });
};

const hexStringToByteArray = (hexString: string) => {
  const result = [];
  for (let i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substring(i, i + 2), 16));
  }
  return result;
}

export const calculateSHA256 = async (blob: Blob): Promise<string> => {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
};
