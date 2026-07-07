export type LegalSection = {
  id: string;
  title: string;
  body: string[];
};

export function parseSectionTitle(title: string) {
  const match = title.match(/^(\d+)\.\s*(.+)$/);
  if (match) {
    return { number: match[1].padStart(2, '0'), label: match[2] };
  }
  return { number: '00', label: title };
}
