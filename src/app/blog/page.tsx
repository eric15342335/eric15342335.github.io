import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  categories: string;
}

function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: name.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        categories: data.categories || '',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <header>
        <h1>Welcome to Eric&apos;s personal blog page!</h1>
      </header>

      <main>
        <div className="language-switch">
          <Link href="/zh-CN/blog/" hrefLang="zh-CN">简体中文</Link>
        </div>
        
        <ul className="table-of-contents">
          {posts.map((post) => (
            <li key={post.slug}>
              <small className="fixed-width-font">{post.date}</small>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}