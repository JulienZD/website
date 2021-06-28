import { ReactNode, RefObject, useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  useEffect(() => {
    function handleClick(event: KeyboardEvent | MouseEvent): void {
      if (event instanceof KeyboardEvent && event.code !== 'Space' && event.code !== 'Enter') return;
      event.preventDefault();

      const noTextSelected = !window.getSelection()?.toString();
      if (noTextSelected && target.current) {
        router.push(target.current.href);
      }
    }

    const preventPropagation = (event: MouseEvent | KeyboardEvent): void => {
      if (event instanceof KeyboardEvent && event.code !== 'Space' && event.code !== 'Enter') return;
      event.stopPropagation();
    };

    const anchors =
      parent.current && Array.from(parent.current.querySelectorAll('a')).filter((a) => a.href !== target.current?.href);

    anchors?.forEach((el) => {
      el.addEventListener('click', preventPropagation);
      el.addEventListener('keydown', preventPropagation);
    });

    parent.current?.addEventListener('click', handleClick);
    parent.current?.addEventListener('keydown', handleClick);

    return (): void => {
      anchors?.forEach((el) => {
        el.removeEventListener('click', preventPropagation);
        el.removeEventListener('keydown', preventPropagation);
      });

      parent.current?.removeEventListener('click', handleClick);
      parent.current?.removeEventListener('keydown', handleClick);
    };
  }, [router]);
  return <>{children}</>;
}
