import styles from './footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <footer className="flex justify-center items-center w-full p-4 print:hidden"></footer>
    </div>
  );
}
