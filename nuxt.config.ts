// https://nuxt.com/docs/api/configuration/nuxt-config
import transformerDirectives from "@unocss/transformer-directives";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      htmlAttrs: {},
      bodyAttrs: { class: "", "data-unocss": "" },
      title: "aelvet",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no,viewport-fit=cover",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "",
    },
  },
  plugins: [
    // 虽然插件会自动导入，但写在这里可以更好的控制顺序
    // "~/plugins/msw.client",
  ],
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@element-plus/nuxt",
    "@unocss/nuxt",
    "nuxt-icon",
    "nuxt-lodash",
    // "~/modules/auth/index",
  ],
  css: [
    "normalize.css",
     "~/assets/base.scss"
  ],
  elementPlus: {
    importStyle: "scss",
    themes: ["dark"],
  },
  unocss: {
    theme: {
      colors: {
        primary: "var(--el-color-primary)",
        success: "var(--el-color-success)",
        info: "var(--el-color-info)",
        warning: "var(--el-color-warning)",
        danger: "var(--el-color-danger)",
        error: "var(--el-color-error)",
        disabled: "var(--el-text-color-disabled)",
      },
    },
    preflight: false,
    preflights: [
      {
        layer: "preflights",
        getCSS: ({ theme }: any) => {
          interface Colors extends Record<string | number, string | Colors> {}
          function isString(x: any): x is string {
            return typeof x === "string";
          }
          function getCSS(prefix: string, colors: Colors = {}): string {
            return Object.keys(colors)
              .map((key) => {
                if (isString(colors[key])) {
                  return `${prefix}${key}: ${colors[key]};`;
                } else {
                  return getCSS(`${prefix}${key}-`, <Colors>colors[key]);
                }
              })
              .join("\n");
          }
          return `:root{ ${getCSS(
            "--un-color-",
            (<{ colors?: Colors }>theme)?.colors
          )} }`;
        },
      },
    ],
    variants: [
      (matcher: any) => {
        // 增加权重，使unocss能覆盖到组件样式
        return {
          matcher,
          selector: (s: any) => `body[data-unocss] ${s}`,
        };
      },
    ],
    transformers: [transformerDirectives()],
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://api.com",
        changeOrigin: true,
      },
    },
  },
});
