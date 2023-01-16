declare module '@kotlin-site/typography';

declare module '@kotlin-site/header';
declare module '@kotlin-site/footer';

declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}
