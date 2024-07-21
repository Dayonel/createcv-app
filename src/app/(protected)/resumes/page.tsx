import styles from './page.module.scss'

export default function Resumes() {
  return (
    <div className={styles.resumes}>
      <div className='p-4 md:px-0 py-8'>
        <h1 className="text-3xl md:text-4xl font-bold">
          Resumes
        </h1>
      </div>
    </div>
  );
}
