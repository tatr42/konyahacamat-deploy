const encoder = new TextEncoder();

function base64UrlEncode(data: ArrayBuffer | string): string {
  let base64 = "";
  if (typeof data === "string") {
    // Handle UTF-8 strings
    const bytes = encoder.encode(data);
    for (let i = 0; i < bytes.byteLength; i++) {
      base64 += String.fromCharCode(bytes[i]);
    }
    base64 = btoa(base64);
  } else {
    const bytes = new Uint8Array(data);
    for (let i = 0; i < bytes.byteLength; i++) {
      base64 += String.fromCharCode(bytes[i]);
    }
    base64 = btoa(base64);
  }
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

function base64UrlDecodeToBytes(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const secretKey = process.env.SESSION_SECRET;

async function getCryptoKey() {
  if (!secretKey) {
    throw new Error("SESSION_SECRET is not defined in environment variables");
  }
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(secretKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(payload: any) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days

  const header = { alg: "HS256", typ: "JWT" };
  const fullPayload = { ...payload, iat, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const tokenData = `${encodedHeader}.${encodedPayload}`;

  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(tokenData)
  );

  const encodedSignature = base64UrlEncode(signature);

  return `${tokenData}.${encodedSignature}`;
}

export async function verifySession(token: string | undefined | null) {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const tokenData = `${header}.${payload}`;

    const key = await getCryptoKey();
    const sigBytes = base64UrlDecodeToBytes(signature);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as unknown as BufferSource,
      encoder.encode(tokenData)
    );

    if (!isValid) return null;

    const decodedPayload = JSON.parse(base64UrlDecode(payload));

    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decodedPayload;
  } catch (error) {
    return null;
  }
}
