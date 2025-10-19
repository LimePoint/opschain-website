import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Autonomous Agents',
    Svg: require('@site/static/img/tracking.svg').default,
    description: (
      <>
        <b>
          <i>Operate Smarter. Continuously.</i>
        </b>
        <br />
        24x7 AI-powered teammates that execute BAU operations autonomously — improving efficiency, cutting costs, and
        ensuring compliance under governed control.
        <br />
        <a href='/docs/product/features/autonomous-agents'>Meet Your Autonomous Agents</a>
      </>
    ),
  },
  {
    title: 'Governed Intelligence',
    Svg: require('@site/static/img/undraw-collaboration.svg').default,
    description: (
      <>
        <b>
          <i>AI That Works — and Stays Governed.</i>
        </b>
        <br />
        The governance and control engine ensuring every human, system, and AI action is compliant, logged, and
        auditable.
        <br />
        <a href='/docs/product/features/governed-intelligence'>Explore Governed Intelligence</a>
      </>
    ),
  },
  {
    title: 'Enterprise-Grade Security, Auditability, and Compliance',
    Svg: require('@site/static/img/undraw-security.svg').default,
    description: (
      <>
        <b>
          <i>Automation You Can Trust.</i>
        </b>
        <br />
        Built for regulated enterprises — every action governed, secured, and compliant by design.
        <br />
        <a href='/docs/product/features/security-auditability-compliance'>Learn More About Security</a>
      </>
    ),
  },
  {
    title: 'Unified Workflow Orchestration',
    Svg: require('@site/static/img/workflow.svg').default,
    description: (
      <>
        <b>
          <i>Unify and Automate Everything.</i>
        </b>
        <br />
        Automate complex, multi-system workflows through a unified control plane — no more siloed tools or manual
        handoffs.
        <br />
        <a href='/docs/product/features/unified-workflow-orchestration'>See How Orchestration Works</a>
      </>
    ),
  },
  {
    title: 'Real-Time Observability & Self-Healing Operations',
    Svg: require('@site/static/img/manage.svg').default,
    description: (
      <>
        <b>
          <i>Always-On Visibility. Self-Healing by Design.</i>
        </b>
        <br />
        Gain full visibility into every process and empower the platform to detect and fix issues before they impact
        your business.
      </>
    ),
  },
  {
    title: 'Analytics, Insights & Continuous Improvement',
    Svg: require('@site/static/img/undraw-scrum-board.svg').default,
    description: (
      <>
        <b>
          <i>Measure. Learn. Optimise.</i>
        </b>
        <br />
        Ensure prompt & accurate implementation of IT changes. No more switching between different tools, no more
        duplication of effort, no more delays due to miscommunication, and no more endless chains of CC'd emails.
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
