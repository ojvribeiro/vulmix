import type { Plugin } from 'vue'

export function definePlugin(
  plugin: Plugin,
  ...options: any[]
): { plugin: Plugin; options?: any[] } {
  return { plugin, options }
}
