import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.errorCode}>404</div>
      <h1 className={styles.title}>Lost in the Audit.</h1>
      <p className={styles.description}>
        The page you are looking for has been moved, deleted, or never existed in our database. 
      </p>
      <div className={styles.buttonContainer}>
        <Link href="/" className="btn-primary">
          Back to Terminal
        </Link>
      </div>
    </div>
  );
}
