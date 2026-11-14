import type { Locale } from '../types'
export function Footer({locale}:{locale:Locale}){return <footer className="footer"><p>{locale==='zh'?'感谢你来访！':'見に来てくれてありがとう！'}<br/><span>また会いましょう ✳</span></p><div>{locale==='zh'?'本网站为非官方粉丝制作。':'非公式のファンメイドサイトです。'}<br/>Not affiliated with Bandai Namco Entertainment Inc.</div><b>S / 01</b></footer>}
