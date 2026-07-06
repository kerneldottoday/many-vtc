import { dictionary as frDictionary } from "./fr";

export type Dictionary = typeof frDictionary;

export async function getDictionary(locale: string): Promise<Dictionary> {
  switch (locale) {
    case "en":
      return (await import("./en")).dictionary;
    case "es":
      return (await import("./es")).dictionary;
    default:
      return (await import("./fr")).dictionary;
  }
}
