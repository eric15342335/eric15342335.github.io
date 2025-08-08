import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface BlogPostParams {
  params: Promise<{ slug: string }>;
}

interface BlogPostData {
  title: string;
  date: string;
  categories: string;
  content: string;
  lang: string;
}

function getPostData(slug: string): BlogPostData | null {
  try {
    const postsDirectory = path.join(process.cwd(), '_posts');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      title: data.title || 'Untitled',
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
      categories: data.categories || '',
      content,
      lang: data.lang || 'en',
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

function getAllPostSlugs() {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter(name => name.endsWith('.md'))
    .map(name => ({ slug: name.replace(/\.md$/, '') }));
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return (
      <>
        <header>
          <h1>Post Not Found</h1>
        </header>
        <main>
          <p>The requested blog post could not be found.</p>
          <Link href="/blog">← Back to Blog</Link>
        </main>
      </>
    );
  }

  // Check if Chinese version exists
  const zhPostExists = fs.existsSync(path.join(process.cwd(), '_posts_zh-CN', `${slug}.md`));

  return (
    <>
      <header>
        <h1>{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          {post.categories && ` • ${post.categories}`}
        </p>
      </header>

      <main>
        <article>
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
        </article>
        
        <nav className="post-navigation">
          <Link href="/blog">← Back to Blog</Link>
        </nav>
      </main>

      <div className="language-switch">
        {zhPostExists ? (
          <Link href={`/zh-CN/blog/${slug}`} hrefLang="zh-CN">简体中文</Link>
        ) : (
          <Link href={`https://translate.google.com/translate?sl=en&tl=zh-CN&u=${encodeURIComponent(`https://eric15342335.github.io/blog/${slug}`)}`} target="_blank">
            简体中文 (机翻)
          </Link>
        )}
      </div>
    </>
  );
}