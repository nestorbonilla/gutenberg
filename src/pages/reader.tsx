import type { NextPage } from 'next'
import { ReactReader } from 'react-reader'
import styles from '../styles/Home.module.css'

const Reader: NextPage = () => {
  return (
    <div className={styles.container}>
      <div style={{ height: "100vh" }}>
        <ReactReader
          url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
        />
      </div>
      )
    </div>
  )
}

export default Reader
