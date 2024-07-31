import styles from './counter.module.scss';

export default function Counter() {
  return (
    <>
      <div className={styles.counter}>
        <div className="flex flex-col items-center gap-12 w-full">
          <h2 className="text-4xl md:text-5xl font-bold">Resumes printed</h2>
          <p
            style={{
              backgroundColor: 'var(--cds-background-inverse-hover)',
              color: 'var(--cds-text-inverse)',
            }}
            className="text-4xl md:text-5xl font-bold -rotate-1 px-4 py-2"
          >
            1436+
          </p>

          <span className="text-center text-base">
            Create your professional resume today and get hired.
          </span>
        </div>
      </div>
    </>
  );
}
