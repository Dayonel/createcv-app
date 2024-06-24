import styles from './Watermark.module.scss';

export default function Watermark() {
  return (
    <div className={styles.watermark}>
      <a href="https://createcv.app">
        <img src="/watermark.svg" width="300" height="300"></img>
      </a>
    </div>
  );
}
