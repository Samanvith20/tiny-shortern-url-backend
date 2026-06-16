import { UAParser } from "ua-parser-js";

export const getDeviceType = (
  userAgent: string
): string => {
  const parser = new UAParser(userAgent);

  const deviceType =
    parser.getDevice().type;

  if (deviceType === "mobile") {
    return "Mobile";
  }

  if (deviceType === "tablet") {
    return "Tablet";
  }

  return "Desktop";
};