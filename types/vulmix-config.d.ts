export interface VulmixConfig {
  lang?: string

  imports?: {
    dirs?: string[]
    presets?: string[]
  }

  head?: {
    title?: string

    meta?: {
      charset?: 'utf-8' | 'iso-8859-1' | 'iso-8859-2' | 'utf-16'
      name?:
        | 'viewport'
        | 'description'
        | 'keywords'
        | 'author'
        | 'generator'
        | 'robots'
        | 'googlebot'
        | 'google'
        | 'bingbot'
        | 'bing'
        | 'yandexbot'
        | 'yandex'
        | 'yandex-verification'
        | 'apple-mobile-web-app-title'
        | 'application-name'
        | 'msapplication-TileColor'
        | 'theme-color'
        | 'msapplication-TileImage'
        | 'msapplication-config'
        | 'mobile-web-app-capable'
        | 'apple-mobile-web-app-capable'
        | 'apple-mobile-web-app-status-bar-style'
        | 'format-detection'
        | 'apple-touch-fullscreen'
        | 'og:title'
        | 'og:description'
        | 'og:image'
        | 'og:url'
        | 'og:site_name'
        | 'og:locale'
        | 'og:type'
        | 'og:audio'
        | 'og:video'
        | 'og:determiner'
        | 'og:updated_time'
        | 'og:locale:alternate'
        | 'twitter:card'
        | 'twitter:site'
        | 'twitter:site:id'
        | 'twitter:creator'
        | 'twitter:creator:id'
        | 'twitter:title'
        | 'twitter:description'
        | 'twitter:image'
        | 'twitter:image:alt'
        | 'twitter:player'
        | 'twitter:player:width'
        | 'twitter:player:height'
        | 'twitter:player:stream'
        | 'twitter:player:stream:content_type'
        | 'twitter:app:name:iphone'
        | 'twitter:app:id:iphone'
        | 'twitter:app:url:iphone'
        | 'twitter:app:name:ipad'
        | 'twitter:app:id:ipad'
        | 'twitter:app:url:ipad'
        | 'twitter:app:name:googleplay'
        | 'twitter:app:id:googleplay'
        | 'twitter:app:url:googleplay'
        | 'twitter:label1'
        | 'twitter:data1'
        | 'twitter:label2'
        | 'twitter:data2'
        | 'fb:app_id'
        | 'fb:pages'
        | 'fb:admins'
        | 'fb:profile_id'
        | 'fb:article_style'
        | 'fb:use_automatic_ad_placement'
        | 'fb:enable_native_login'

      property?: string
      'http-equiv'?: 'X-UA-Compatible' | 'Content-Type' | 'Content-Language'
      content?: string
    }[]

    link?: {
      rel?:
        | 'stylesheet'
        | 'icon'
        | 'apple-touch-icon'
        | 'mask-icon'
        | 'canonical'
        | 'manifest'
        | 'author'
        | 'licence'
        | 'alternate'
        | 'me'
        | 'dns-prefetch'
        | 'preconnect'
        | 'prefetch'
        | 'prerender'
        | 'preload'
        | 'modulepreload'

      sizes?: string
      href?: string
      hreflang?: string
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
