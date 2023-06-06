import { remark } from 'remark';
import html from 'remark-html';
import images from 'remark-images';
import type { Parent } from 'unist'; // This is an extraneous import, but it's needed for the type in addBlankTargets

export const renderMarkdownToHtml = async (markdown: string): Promise<string> => {
  const result = await remark().use(html).use(addBlankTargets).use(images).process(markdown);
  return result.toString();
};

/**
 * Set target="_blank" on external links
 */
function addBlankTargets(): (tree: Parent) => void {
  return function _addBlankTargets(tree: Parent): void {
    tree.children.forEach((node) => {
      if (node.type === 'link') {
        node.data = {
          ...(node.data ?? {}),
          hProperties: {
            ...(node.data?.hProperties ?? {}),
            target: '_blank',
          },
        };
      }

      if ('children' in node) {
        _addBlankTargets(node as Parent);
      }
    });
  };
}
