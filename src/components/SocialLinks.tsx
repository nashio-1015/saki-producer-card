import { ArrowUpRight } from 'lucide-react'
import { profile, safeExternalUrl } from '../config/profile'
import type { Locale } from '../types'

export function SocialLinks({ locale }: { locale: Locale }) {
  const items = [...profile.socialLinks].filter(item => item.visible).sort((a, b) => a.order - b.order)

  return (
    <section className="social" id="social">
      <div className="social-heading">
        <span>02 / {locale === 'zh' ? '联系我' : 'SNS'}</span>
        <h2>LET’S<br />CONNECT<span>.</span></h2>
      </div>
      <div className="social-list">
        {items.map((item, index) => {
          const url = safeExternalUrl(item.url, item.platform === 'QQ')
          if (!url) {
            return (
              <div key={item.platform} className="social-link-placeholder">
                <span className="social-index">0{index + 1}</span>
                <span className="social-name">
                  <b>{item.platform}</b>
                  <small>{item.accountId} · {locale === 'zh' ? '待配置链接' : 'URL未設定'}</small>
                </span>
                <span className="awaiting">{locale === 'zh' ? '即将开放' : '準備中'}</span>
              </div>
            )
          }

          const opensQQ = url.startsWith('mqqapi:')
          return (
            <a
              key={item.platform}
              href={url}
              target={opensQQ ? undefined : '_blank'}
              rel={opensQQ ? undefined : 'noopener noreferrer'}
              aria-label={item.platform === 'QQ'
                ? (locale === 'zh' ? '打开 QQ 资料卡并添加好友' : 'QQプロフィールを開いて友達追加')
                : undefined}
            >
              <span className="social-index">0{index + 1}</span>
              <span className="social-name">
                <b>{item.platform}</b>
                <small>{item.accountId}</small>
              </span>
              <ArrowUpRight size={22} />
            </a>
          )
        })}
      </div>
    </section>
  )
}
