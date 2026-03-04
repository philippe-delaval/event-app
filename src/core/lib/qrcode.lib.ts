import QRCode from "qrcode";

export async function generateQRCode(text: string): Promise<Base64Data> {
  const dataUrl = await QRCode.toDataURL(text);
  return dataUrl.replace(/^data:image\/png;base64,/, "");
}

type Base64Data = string;
