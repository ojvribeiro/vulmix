import type { MetaCharset, MetaName, MetaProperty } from './head/meta'
import type { LinkRel, LinkType } from './head/link'

export interface VulmixConfig {
  lang?: string

  imports?: {
    dirs?: string[]
    presets?: string[]
  }

  head?: {
    title?: string

    meta?: {
      charset?: MetaCharset
      name?: MetaName

      property?: string
      'http-equiv'?: MetaProperty
      content?: string
    }[]

    link?: {
      rel?: LinkRel

      sizes?: string
      href?: string
      hreflang?: string
      type?: LinkType
    }[]

    script?: {
      type?: 'text/javascript' | 'application/javascript' | 'module'
      src?: string
      async?: boolean
      defer?: boolean
    }[]
  }

  webpackConfig?: {
    resolve?: {
      alias?: any
    }
  }

  transition?: {
    name?: string
  }
}
