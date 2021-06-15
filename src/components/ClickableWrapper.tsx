import { ReactNode, RefObject, useEffect } from 'react';

interface Props {
  children: ReactNode;
  parent: RefObject<HTMLElement>;
  target: RefObject<HTMLAnchorElement>;
}

/**
 * Allows the wrapped element to become "clickable" in its entire area.
 *
 * For example, an article containing an img, p and anchor tag will navigate to the href of the anchor when
 * clicking anywhere inside the article.
 * @example
 * <ClickableWrapper parent={parentRef} target={targetRef}>
 *   <article ref={parentRef}>
 *     <img src='article.png' />
 *     <p>Article description</p>
 *     <a href="/article" ref={targetRef}>Read more about this article</a>
 *   </article>
 * </ClickableWrapper>
 * @param {Props} props
 * @param {RefObject<HTMLElement>} props.parent - A ref to the parent element that will become be clickable
 * @param {RefObject<HTMLAnchorElement>} props.target - A ref to the element within the parent element that points to the target
 * @param {ReactNode} props.children [children]
 */
export default function ClickableWrapper({ parent, target, children }: Props): JSX.Element {
  useEffect(() => {
    function handleClick(event: KeyboardEvent | MouseEvent): void {
      if (event instanceof KeyboardEvent && event.code !== 'Space' && event.code !== 'Enter') return;

      const isTextSelected = window.getSelection()?.toString();
      if (!isTextSelected) {
        target.current?.click();
      }
    }

    if (parent.current && target.current) {
      parent.current.addEventListener('click', handleClick);
      parent.current.addEventListener('keydown', handleClick);

      return (): void => {
        parent.current?.removeEventListener('click', handleClick);
        parent.current?.removeEventListener('keydown', handleClick);
      };
    }
  }, []);
  return <>{children}</>;
}
