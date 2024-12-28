export { auth as middleware } from "@/auth"

export const config = {
    matcher: '/',
    unstable_allowDynamic: [
      "**/node_modules/@react-email*/**/*.mjs*",
    ],
  };