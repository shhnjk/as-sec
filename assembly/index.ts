export declare function createElement(tag: string): externref;
export declare function setText(elem: externref, text: string): void;
export declare function appendChild(elem: externref): void;

export function show(): void {
  const b: externref = createElement('b');
  setText(b, 'test');
  appendChild(b);

  const script: externref = createElement('script');
  setText(script, 'alert(origin)');
  appendChild(script);
}