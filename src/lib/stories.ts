import * as fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import images from 'remark-images';
import { StoryMeta } from '../types';

const storiesDirectory = path.join(process.cwd(), 'src/data/stories');

function getFileMatter(slug: string): matter.GrayMatterFile<string> {
  const fullPath = path.join(storiesDirectory, `${slug}.md`);
  const contents = fs.readFileSync(fullPath, 'utf-8');

  return matter(contents);
}

export function getStoriesData(homepage?: boolean): StoryMeta[] {
  const fileNames = fs.readdirSync(storiesDirectory);

  const stories = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const matterResult = getFileMatter(slug);

    return {
      slug,
      ...matterResult.data,
    };
  }) as StoryMeta[];
  return (homepage ? stories.filter((story) => story.onHomepage) : stories).sort((a, b) => {
    if (a.order && b.order && a.order > b.order) return 1;
    return -1;
  });
}

export function getStorySlugs(): { params: { slug: string } }[] {
  const fileNames = fs.readdirSync(storiesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getStoryData(slug: string): Promise<{ slug: string; contentHtml: string; [x: string]: unknown }> {
  const matterResult = getFileMatter(slug);

  const processedContent = await remark().use(html).use(images).process(matterResult.content);
  const contentHtml = processedContent.toString();

  const { summary, ...matterResultData } = matterResult.data;

  return {
    slug,
    contentHtml,
    ...matterResultData,
    ...(summary ? { storySummary: renderMarkdownLinksAsHtml(summary) } : {}),
  };
}

function renderMarkdownLinksAsHtml(markdown: string): string {
  return markdown.split(' ').map(renderMarkdownLinkAsHtml).join(' ');
}

const MARKDOWN_LINK_LIKE_REGEX = /\[(.*)]\((.*)\)/;

function renderMarkdownLinkAsHtml(word: string): string {
  const markdownLinkLike = word.match(MARKDOWN_LINK_LIKE_REGEX);
  if (!markdownLinkLike) {
    return word;
  }

  const [_rawMarkdown, linkText, href] = markdownLinkLike;

  const isExternal = href.startsWith('http');

  return `<a href="${href}" ${isExternal ? 'target="_blank"' : ''}>${linkText.replaceAll('$', ' ')}</a>`;
}
