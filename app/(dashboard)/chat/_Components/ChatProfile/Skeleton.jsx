import styles from './Skeleton.module.css';

export default function ProfileSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileSection}>
        <div className={styles.avatar}></div>
        <h2 className={styles.name}>Name Placeholder</h2>
        <p className={styles.description}>Description goes here...</p>
      </div>

      <div className={styles.boxGrid}>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
      </div>
    </div>
  );
}
