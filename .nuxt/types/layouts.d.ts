import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/aelvet/Workspace/vue3/aelvet.github.io/node_modules/.pnpm/nuxt@3.5.2_@types+node@18.0.0_sass@1.63.5/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}