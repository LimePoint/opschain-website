import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Head from '@docusaurus/Head'

import styles from './index.module.css'

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.container)}>
        <img src='/img/TextNoLine.svg' alt='OpsChain' className={styles.heroImage} />
        <h2 className={clsx('hero__subtitle', styles.heroSubtitle)}>
          Enterprise Operations. Intelligent. Autonomous. Governed.<span className={styles.noOrphans}></span>
        </h2>
      </div>
    </header>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <Layout
        title={`${siteConfig.title}`}
        description='OpsChain: Enterprise Operations. Automated. Governed. Intelligent. Operate Smarter. Continuously'
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </>
  )
}
