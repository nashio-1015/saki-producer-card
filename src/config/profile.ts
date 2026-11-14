export type SocialPlatform = { platform: string; accountId: string; url: string; visible: boolean; order: number; action?: 'copy-account' }
export const profile = {
  producerName: '奈汐nashio', introductionZh: '全力支持咲季，和她一起朝着顶点前进！', introductionJa: '咲季を全力で応援中。一緒に頂点を目指そう！',
  mainIdol: '花海咲季 / SAKI HANAMI', favoriteSong: 'Fighting My Way', avatarPath: '', characterImagePath: '/assets/saki-hero.svg',
  homeUrl: typeof window === 'undefined' ? '' : window.location.origin + window.location.pathname,
  socialLinks: [
    { platform: 'Bilibili', accountId: '327218901', url: 'https://space.bilibili.com/327218901?spm_id_from=333.337.0.0', visible: true, order: 1 },
    { platform: 'X', accountId: '@nashio_520', url: 'https://x.com/nashio_520', visible: true, order: 2 },
    { platform: '小红书', accountId: '用户主页', url: 'https://www.xiaohongshu.com/user/profile/64c7611d000000000e026783', visible: true, order: 3 },
    { platform: 'Instagram', accountId: '待填写账号', url: '', visible: false, order: 5 },
    { platform: 'QQ', accountId: '2321083911', url: 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin=2321083911', visible: true, order: 4 },
    { platform: '自定义', accountId: '待配置', url: '', visible: false, order: 6 },
  ] satisfies SocialPlatform[],
} as const
export function safeExternalUrl(raw: string, allowQQProfile = false): string | null {
  if (!raw.trim()) return null
  try {
    const url = new URL(raw)
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href
    const isQQProfile = allowQQProfile
      && url.protocol === 'mqqapi:'
      && url.hostname === 'card'
      && url.pathname === '/show_pslcard'
      && url.searchParams.get('src_type') === 'internal'
      && url.searchParams.get('version') === '1'
      && /^[0-9]{5,12}$/.test(url.searchParams.get('uin') ?? '')
    return isQQProfile ? url.href : null
  } catch {
    return null
  }
}
