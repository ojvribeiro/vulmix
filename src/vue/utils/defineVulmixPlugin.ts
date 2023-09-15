import { Plugin } from 'vue'

export function defineVulmixPlugin(
  plugin: Plugin,
  ...options: any[]
): { plugin: Plugin; options?: any[] } {
  return { plugin, options }
}
