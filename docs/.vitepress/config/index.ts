import { defineConfig } from "vitepress";
import enConfig from "./en-US";
import zhConfig from "./zh-CN";

export default defineConfig({
  locales: {
    root: { label: "简体中文", lang: "zh-CN", link: "/", ...zhConfig },
    "en-US": { label: "English", lang: "en-US", link: "/en-US/", ...enConfig },
  },
});
