type TextElement = HTMLInputElement | HTMLTextAreaElement;

function applyMirrorStyles(element: TextElement, mirror: HTMLDivElement) {
  const style = window.getComputedStyle(element);
  mirror.style.font = style.font;
  mirror.style.letterSpacing = style.letterSpacing;
  mirror.style.textTransform = style.textTransform;
  mirror.style.wordSpacing = style.wordSpacing;
  mirror.style.padding = style.padding;
  mirror.style.border = style.border;
  mirror.style.boxSizing = style.boxSizing;
  mirror.style.width = `${element.offsetWidth}px`;
  mirror.style.minHeight = `${element.offsetHeight}px`;
  mirror.style.whiteSpace = element instanceof HTMLTextAreaElement ? 'pre-wrap' : 'nowrap';
  mirror.style.wordWrap = 'break-word';
  mirror.style.overflow = 'hidden';
}

/** Measure caret in viewport coordinates */
export function getCaretViewportPosition(
  element: TextElement,
  caretPos?: number,
): { x: number; y: number } {
  const position = caretPos ?? element.selectionStart ?? 0;
  const rect = element.getBoundingClientRect();

  const mirror = document.createElement('div');
  applyMirrorStyles(element, mirror);
  mirror.style.position = 'fixed';
  mirror.style.top = `${rect.top}px`;
  mirror.style.left = `${rect.left}px`;
  mirror.style.visibility = 'hidden';
  mirror.style.pointerEvents = 'none';
  mirror.style.zIndex = '-1';

  const before = document.createTextNode(element.value.substring(0, position));
  const marker = document.createElement('span');
  marker.textContent = element.value.substring(position, position + 1) || '.';
  marker.style.display = 'inline-block';
  marker.style.width = '0';
  marker.style.overflow = 'visible';

  mirror.appendChild(before);
  mirror.appendChild(marker);
  document.body.appendChild(mirror);

  const markerRect = marker.getBoundingClientRect();

  document.body.removeChild(mirror);

  return {
    x: markerRect.left,
    y: markerRect.top + markerRect.height / 2,
  };
}

/** Caret position relative to container */
export function getCaretPositionInContainer(
  element: TextElement,
  container: HTMLElement,
  caretPos?: number,
): { x: number; y: number } {
  const viewport = getCaretViewportPosition(element, caretPos);
  const containerRect = container.getBoundingClientRect();

  return {
    x: viewport.x - containerRect.left,
    y: viewport.y - containerRect.top,
  };
}

/** Offset within the element (for clipped inner glow) */
export function getCaretOffsetInElement(
  element: TextElement,
  caretPos?: number,
): { x: number; y: number } {
  const viewport = getCaretViewportPosition(element, caretPos);
  const rect = element.getBoundingClientRect();
  return {
    x: viewport.x - rect.left,
    y: viewport.y - rect.top,
  };
}

/** Keep spotlight target inside a field boundary */
export function clampPointToElement(
  point: { x: number; y: number },
  element: HTMLElement,
  container: HTMLElement,
  padding = 16,
): { x: number; y: number } {
  const fRect = element.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  const minX = fRect.left - cRect.left + padding;
  const maxX = fRect.right - cRect.left - padding;
  const minY = fRect.top - cRect.top + padding;
  const maxY = fRect.bottom - cRect.top - padding;
  return {
    x: Math.max(minX, Math.min(maxX, point.x)),
    y: Math.max(minY, Math.min(maxY, point.y)),
  };
}

/** Bounds of an element relative to container */
export function getElementBoundsInContainer(
  element: HTMLElement,
  container: HTMLElement,
): { left: number; right: number; top: number; bottom: number } {
  const eRect = element.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  return {
    left: eRect.left - cRect.left,
    right: eRect.right - cRect.left,
    top: eRect.top - cRect.top,
    bottom: eRect.bottom - cRect.top,
  };
}

/** Pivot of the spotlight mount relative to container */
export function getPivotPositionInContainer(
  fixtureEl: HTMLElement,
  container: HTMLElement,
): { x: number; y: number } {
  const pivot =
    (fixtureEl.querySelector('.spotlight-pivot') as HTMLElement | null) ?? fixtureEl;
  const pRect = pivot.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  return {
    x: pRect.left + pRect.width / 2 - cRect.left,
    y: pRect.top + pRect.height / 2 - cRect.top,
  };
}

/** Lens position from pivot + aim angle (degrees, 0 = straight down) */
const LENS_OFFSET_PX = 76;

export function getLensPositionFromPivot(
  pivot: { x: number; y: number },
  aimAngleDeg: number,
): { x: number; y: number } {
  const rad = (aimAngleDeg * Math.PI) / 180;
  return {
    x: pivot.x + Math.sin(rad) * LENS_OFFSET_PX,
    y: pivot.y + Math.cos(rad) * LENS_OFFSET_PX,
  };
}

export function getAimAngleDeg(
  pivot: { x: number; y: number },
  target: { x: number; y: number },
): number {
  return (Math.atan2(target.x - pivot.x, target.y - pivot.y) * 180) / Math.PI;
}

/** Center of an element relative to container */
export function getElementCenterInContainer(
  element: HTMLElement,
  container: HTMLElement,
): { x: number; y: number } {
  const eRect = element.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  return {
    x: eRect.left + eRect.width / 2 - cRect.left,
    y: eRect.top + eRect.height / 2 - cRect.top,
  };
}

/** Emitter position — from the spotlight lens opening */
export function getEmitterPositionInContainer(
  emitterEl: HTMLElement,
  container: HTMLElement,
): { x: number; y: number } {
  const lens =
    (emitterEl.querySelector('.spotlight-lens') as HTMLElement | null) ?? emitterEl;
  const eRect = lens.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  return {
    x: eRect.left + eRect.width / 2 - cRect.left,
    y: eRect.bottom - cRect.top + 2,
  };
}
