export default function Watermark() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
      }}
    >
      <a href="https://createcv.app">
        <img src="/watermark.svg" width="100" height="100"></img>
      </a>
    </div>
  );
}
