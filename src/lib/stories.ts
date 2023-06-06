import * as fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { StoryMeta } from '../types';
import { renderMarkdownToHtml } from './markdown-to-html';

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

  const { summary, ...matterResultData } = matterResult.data;

  return {
    slug,
    contentHtml: await renderMarkdownToHtml(matterResult.content),
    ...matterResultData,
    ...(summary ? { storySummary: await renderMarkdownToHtml(summary) } : {}),
  };
}
