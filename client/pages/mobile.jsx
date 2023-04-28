import Navbar from '@/components/Navbar';
import styles from '../styles/Mobile.module.css'
import Image from 'next/image';
import Footer from '@/components/Footer';

function mobile() {
  return (
    <div className={styles.mobile}>
      <Navbar />
      <div className={styles.body}>
        <Image className={styles.img} src='/mobile.png' alt='mobile' width={400} height={400}></Image>
        <h1 className={styles.heading}>comming soon on Mobile Devices</h1>
      </div>
      <Footer />
    </div>
  )
}

export default mobile