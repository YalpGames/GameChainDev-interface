

import type { NextPage } from 'next'
import styles from './layout.module.css';

const Layout: NextPage = function ({ children }:any) {
    return (
        <div className={styles.container}>{children}</div>
    )
  }

export default Layout;