'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    hideSpinner: () => void;
  }
}

export default function Home() {
  useEffect(() => {
    // Handles the loading spinner animation of the #user-stats section
    let loadedImages = 0;
    const spinner = document.getElementById('loading-spinner');
    const userStats = document.getElementById('user-stats');
    
    // multiple triggers for this feature
    function showUserStats() {
      if (spinner) spinner.style.display = 'none';
      if (userStats) userStats.style.display = 'flex';
    }
    
    // all images are loaded
    window.hideSpinner = function() {
      loadedImages++;
      console.debug("Loaded images:", loadedImages);
      if (loadedImages === 3) {
        showUserStats();
      }
    };
    
    // fail to load some images
    setTimeout(() => {
      if (loadedImages < 3) {
        showUserStats();
      }
    }, 2000);
  }, []);

  // GitHub stats URLs
  const githubTopLangsDark = "https://github-readme-stats.vercel.app/api/top-langs/?username=eric15342335&layout=compact&langs_count=10&theme=radical&exclude_repo=comp2120,inspirematrix-buttons";
  const githubUserStatsDark = "https://github-readme-stats.vercel.app/api?username=eric15342335&show_icons=true&theme=radical";
  const leetcodeStatsDark = "https://leetcard.jacoblin.cool/eric15342335?theme=radical&font=Inter";
  
  const githubTopLangsLight = "https://github-readme-stats.vercel.app/api/top-langs/?username=eric15342335&layout=compact&langs_count=10&theme=default&exclude_repo=comp2120,inspirematrix-buttons";
  const githubUserStatsLight = "https://github-readme-stats.vercel.app/api?username=eric15342335&show_icons=true&theme=default";
  const leetcodeStatsLight = "https://leetcard.jacoblin.cool/eric15342335?theme=light&font=Inter";

  return (
    <>
      <header>
        <h1>About Me</h1>
      </header>

      <main>
        <article>
          <p>
            I am a upcoming third year undergraduate at <a href="https://hku.hk">the University of Hong Kong</a>, studying <a href="https://saasweb.hku.hk/current/aai.php">Applied Artificial Intelligence</a> and <a href="https://cs.hku.hk">Computer Science</a>.
          </p>

          <p>
            Previously, I studied linear statistical analysis (regression, ANOVA), database management systems (MySQL), image processing and computer vision, and web development (LAMP/Node/React) to build a solid foundation for future work in computer science and artificial intelligence. Currently, I am working at Radio Television Hong Kong (RTHK) as a Summer Intern in Engineering Section, Production Services Division (Television). In year one, I worked at <a href="https://inspirelab.hk">InspireLab Limited</a>, where I developed embedded software for STEM education using an HKD$7 RISC-V microcontroller (CH32V003F4P6). My boss, <a href="https://www.hkucs.org/seminar/bio-vincent.htm">Dr. Vincent Lau</a>, and I attended the <a href="https://mp.weixin.qq.com/s/AU62LdSAO62kztfuiURXfg">Hong Kong RISC-V Day + AI Con 2024</a> at the <a href="https://www.cityu.edu.hk/">City University of Hong Kong</a> to showcase the product.
          </p>

          <p>
            I am an open-source enthusiast. As a former member of the <a href="https://pyinstaller.org">PyInstaller</a> development team, I actively contributed hook patch requests to the <code><a href="https://github.com/pyinstaller/pyinstaller-hooks-contrib">pyinstaller-hooks-contrib</a></code> repository, collaborating with developers such as bwoodsend and rokm.
          </p>

          <p>
            For more information, please refer to my <a href="/cv" title="curriculum vitae">curriculum vitae</a>.
          </p>
        </article>

        <div className="separation-bar"></div>
        <section id="cs-quote">
          <p>
            This website author once said:
          </p>
          <q>Yeah, that would be very cool. I think that is why I love CS. It was never simply AI, programming, development, whatever. It is the mindset that you know something is happening underneath. You are surprised and you want to know why. And after you understand that in this low level, something even more happens in a much lower level and you are surprised again. I feel like this kind of stuff is really interesting.</q>
        </section>
        <div className="separation-bar"></div>

        <div id="loading-spinner" className="loading-spinner"></div>

        <section id="user-stats" style={{ display: 'none' }}>
          <a href={githubTopLangsDark}>
            <picture>
              <source srcSet={githubTopLangsDark} media="(prefers-color-scheme: dark)" />
              <source srcSet={githubTopLangsLight} media="(prefers-color-scheme: light)" />
              <img 
                src={githubTopLangsLight} 
                alt="eric15342335 Most Used Languages" 
                loading="lazy" 
                onLoad={() => window.hideSpinner && window.hideSpinner()}
              />
            </picture>
          </a>
          <a href={githubUserStatsDark}>
            <picture>
              <source srcSet={githubUserStatsDark} media="(prefers-color-scheme: dark)" />
              <source srcSet={githubUserStatsLight} media="(prefers-color-scheme: light)" />
              <img 
                src={githubUserStatsLight} 
                alt="eric15342335 Github Statistics" 
                loading="lazy" 
                onLoad={() => window.hideSpinner && window.hideSpinner()}
              />
            </picture>
          </a>
          <a href={leetcodeStatsDark}>
            <picture>
              <source srcSet={leetcodeStatsDark} media="(prefers-color-scheme: dark)" />
              <source srcSet={leetcodeStatsLight} media="(prefers-color-scheme: light)" />
              <img 
                src={leetcodeStatsLight} 
                alt="eric15342335 LeetCode Statistics" 
                loading="lazy" 
                onLoad={() => window.hideSpinner && window.hideSpinner()}
              />
            </picture>
          </a>
        </section>
      </main>
    </>
  );
}
