import { isMobile } from "is-mobile";

export function isMobileDevice() {
  return isMobile({ tablet: true });
}
