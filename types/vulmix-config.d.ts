import type { MetaCharset, MetaName, MetaProperty } from './head/meta'
import type { LinkRel, LinkType } from './head/link'

export interface VulmixConfig {
  lang?: string

  imports?: {
    enabled?: boolean
    dirs?: string[]
    components?: {
      dirs?: string[]
    }
    presets?: string[]
    options?: {
      directoryAsNamespace?: boolean
      collapseSamePrefixes?: boolean
    }
  }

  dirs?: {
    public?: string
    src?: string

    dist?: {
      root?: string
      enableFileSystem?: boolean
    }
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
      as?:
        | 'audio'
        | 'document'
        | 'embed'
        | 'fetch'
        | 'font'
        | 'image'
        | 'object'
        | 'script'
        | 'style'
        | 'track'
        | 'video'
        | 'worker'
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
