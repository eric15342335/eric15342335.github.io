import Image from 'next/image';

export default function LinksPage() {
  return (
    <>
      <header>
        <h1>Links</h1>
      </header>

      <main>
        <article>
          <h2>Interesting Links</h2>
          <ul className="friend-list">
            <li>
              <Image 
                src="https://thisisxxz.com/uploads/avatar-sumire.jpg" 
                alt="XXZ avatar" 
                width={50} 
                height={50}
                unoptimized
              />
              <a href="https://thisisxxz.com/">XXZ (https://thisisxxz.com/)</a>
            </li>
          </ul>
          
          <h2>Website Analytics</h2>
          <p>For transparency, my site&apos;s visitor statistics are publicly available:</p>
          <ul>
            <li>
              <a href="https://eric310.goatcounter.com" target="_blank" rel="noopener">
                View this site&apos;s analytics
              </a>{' '}
              (powered by{' '}
              <a href="https://www.goatcounter.com" target="_blank" rel="noopener">
                GoatCounter
              </a>
              , an open-source web analytics platform)
            </li>
          </ul>

          <h2>Social Media</h2>
          <ul>
            <li>
              <a href="https://github.com/eric15342335" target="_blank" rel="noopener">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/eric15342335/" target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ericcheng0310/" target="_blank" rel="noopener">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://leetcode.com/eric15342335/" target="_blank" rel="noopener">
                LeetCode
              </a>
            </li>
            <li>
              <a href="https://x.com/eric15342335/" target="_blank" rel="noopener">
                X (formally known as Twitter)
              </a>
            </li>
            <li>
              <a href="https://steamcommunity.com/id/eric15342335" target="_blank" rel="noopener">
                Steam
              </a>
            </li>
          </ul>
        </article>
      </main>
    </>
  );
}