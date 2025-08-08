'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Navbar() {
  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && systemDark);
    
    if (isDark) {
      document.body.classList.add('dark');
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle') as HTMLInputElement;
    if (themeToggle) {
      themeToggle.checked = isDark;
      themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
          document.body.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      });
    }

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler-icon') as HTMLElement;
    const navList = document.querySelector('nav ul') as HTMLElement;
    
    if (navbarToggler && navList) {
      navbarToggler.addEventListener('click', () => {
        navList.classList.toggle('show');
      });
    }

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator') as HTMLElement;
    if (scrollIndicator) {
      const updateScrollIndicator = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
      };

      window.addEventListener('scroll', updateScrollIndicator);
      return () => window.removeEventListener('scroll', updateScrollIndicator);
    }
  }, []);

  return (
    <nav aria-label="Top navigation menu bar">
      <div className="scroll-indicator" aria-hidden="true"></div>
      <div className="image-link">
        <a href="https://github.com/eric15342335" aria-label="Eric's GitHub profile">
          <Image src="/favicon.ico" alt="Eric's profile picture" width={40} height={40} priority />
        </a>
        <button className="navbar-toggler-icon" aria-label="Toggle navigation menu bar on mobile devices"></button>
      </div>
      <ul>
        <li><Link href="/" title="Go to the main index page of my personal website.">Cheng Ho Ming</Link></li>
        <li><Link href="/cv" title="View Eric's Curriculum Vitae and download it as a PDF file.">CV</Link></li>
        <li><Link href="/courses" title="Find out which courses have Eric taken.">Courses</Link></li>
        <li><Link href="/blog" title="Read Eric's blog posts, explore his personal interest and latest updates.">Blog</Link></li>
        <li><Link href="/links" title="Check out the links to my friends blog!">Links</Link></li>
      </ul>
      {/* Theme Toggle Input (Hidden) */}
      <input type="checkbox" id="theme-toggle" />
      <label htmlFor="theme-toggle" id="theme-toggle-label">🌓</label>
    </nav>
  );
}