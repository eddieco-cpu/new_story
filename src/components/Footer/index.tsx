import React from "react";
import Image from "next/image";

import "@styles/footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-info">
          <div className="footer-logo">
            <a href="https://udn.com/news/index" className="logo-udn">
              <Image
                src="/images/reading-logo.svg"
                alt="聯合新聞網"
                width={100}
                height={24}
              />
            </a>
            <a href="https://reading.udn.com/read/index" className="logo-txt">
              <Image
                src="/images/reading-brand.svg"
                alt="琅琅閱讀"
                width={100}
                height={24}
              />
            </a>
          </div>
          <div className="footer-info__txt">
            客服信箱: bookstore@udngroup.com
          </div>
          <div className="footer-info__txt">客服電話: (02)2649-1681分機5</div>
          <div className="footer-info__txt">
            服務時段: 週一～週五09:00~18:00
          </div>
        </div>
        <div className="footer-link">
          <div className="footer-link__group">
            <h3>關於我們</h3>
            <a
              href="https://member.udn.com/member/rule.jsp"
              target="_blank"
              rel="noopener noreferrer"
            >
              會員服務條款
            </a>
            <a
              href="http://reading.udn.com/v2/policy.jsp"
              target="_blank"
              rel="noopener noreferrer"
            >
              數位閱讀服務條款
            </a>
            <a
              href="https://www.udngroup.com/members/udn_privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              隱私權聲明
            </a>
          </div>
          <div className="footer-link__group">
            <h3>幫助</h3>
            <a
              href="https://reading.udn.com/store/shelf/shelf_reminder.do?a=guide"
              target="_blank"
              rel="noopener noreferrer"
            >
              新手上路
            </a>
            <a
              href="https://readinglab.udn.com/store/center/faq.do"
              target="_blank"
              rel="noopener noreferrer"
            >
              常見問題
            </a>
            <a
              href="https://readinglab.udn.com/store/center/contact.do"
              target="_blank"
              rel="noopener noreferrer"
            >
              聯絡我們
            </a>
          </div>
          <div className="footer-link__group footer-link__group--social">
            <h3>社群動態</h3>
            <a href="https://www.facebook.com/udnreading/">
              <i className="i-fb-round"></i>facebook
            </a>
          </div>
        </div>
        <div className="app-download">
          <h3>讀書吧APP下載</h3>
          <div className="app-download__wrapper">
            <div className="app-download__img">
              <Image
                src="/images/app-logo.svg"
                alt="讀書吧APP"
                width={100}
                height={24}
              />
            </div>
            <div className="app-download__link">
              <div className="app-download__link--item apple-store">
                <a href="https://apps.apple.com/tw/app/id668593227">
                  <Image
                    src="/images/appStore.svg"
                    alt="讀書吧appleStore"
                    width={100}
                    height={24}
                  />
                </a>
              </div>
              <div className="app-download__link--item google-store">
                <a href="http://play.google.com/store/apps/details?id=com.udn.dp.books.android&hl=zh_TW">
                  <Image
                    src="/images/googlePlay.svg"
                    alt="讀書吧googleStore"
                    width={100}
                    height={24}
                  />
                </a>
              </div>
            </div>
            <div className="qr-code">
              <Image
                src="/images/QRCODE.svg"
                alt="讀書吧QRcode"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        聯合線上公司 著作權所有 © udn.com. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
