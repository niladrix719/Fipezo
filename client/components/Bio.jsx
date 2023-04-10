import Image from 'next/image'
import styles from '../styles/Bio.module.css'

export default function Bio() {
  return (
    <div className={styles.bio}>
      <h1 className={styles.heading}>Your One-Stop Shop for Freelance Talent</h1>
      <p className={styles.subHeading}>Find the Right Freelancer for Your Project with Our Easy-to-Use Platform</p>
      <div className={styles.picturesNText}>
        <div className={styles.pictures}>
          <Image src='/PhotographerReal.jpg' width='300' height='300'/>
          <Image id={styles.cinematographer} src='/CinematographerReal.jpg' width='300' height='300'/>
        </div>
        <div className={styles.Text}>
          <h1 className={styles.heading}>All Verified Freelancers</h1>
          <p className={styles.details}> we believe in quality over quantity. That's why we carefully verify each freelancer on our platform,
            so you can trust that you're working with skilled professionals who are committed to delivering top-notch results.</p>
        </div>
      </div>
    </div>
  )
}