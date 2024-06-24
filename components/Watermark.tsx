import styles from './Watermark.module.scss';

export default function Watermark() {
  return (
    <div className={styles.watermark}>
      <a href="https://createcv.app">
        <img src="/watermark.svg" width="100" height="100"></img>
      </a>
    </div>
  );
}
