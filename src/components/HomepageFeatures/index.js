import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Unify your toolchain and stay on top of change',
    Svg: require('@site/static/img/tracking.svg').default,
    description: (
      <>
        Say goodbye to the headaches of juggling multiple toolchains and keeping track of changes across different
        platforms. Effortlessly connect, automate, and orchestrate your entire DevOps workflow with ease.
      </>
    ),
  },
  {
    title: 'Transform your DevOps workflow with GitOps and OpsChain',
    Svg: require('@site/static/img/gitops.svg').default,
    description: (
      <>
        Adopt a GitOps approach to your DevOps processes. OpsChain seamlessly integrates with your Git repositories and
        allows you to enjoy the benefits of GitOps, enhanced by the guardrails of OpsChain.
      </>
    ),
  },
  {
    title: 'Observability & control',
    Svg: require('@site/static/img/manage.svg').default,
    description: (
      <>
        Meet compliance, manage risk, and make informed decisions in your organisation. OpsChain includes role-based
        access controls, audit trails, version history, metadata capture, and human approval workflows.
      </>
    ),
  },
  {
    title: 'Collaboration & breaking down silos',
    Svg: require('@site/static/img/undraw-collaboration.svg').default,
    description: (
      <>
        Do you have multiple teams working in silos, using different tools and following different processes? OpsChain
        brings all changes together under a single umbrella.
      </>
    ),
  },
  {
    title: 'Operational efficiency & productivity',
    Svg: require('@site/static/img/undraw-scrum-board.svg').default,
    description: (
      <>
        Ensure prompt & accurate implementation of IT changes. No more switching between different tools, no more
        duplication of effort, no more delays due to miscommunication, and no more endless chains of CC'd emails.
      </>
    ),
  },
  {
    title: 'Security & traceability',
    Svg: require('@site/static/img/undraw-security.svg').default,
    description: (
      <>
        Maintain strict control over who can make IT changes making certain only authorised personnel can alter your IT
        environment. OpsChain keeps an extensive audit trail allowing for robust monitoring and ensuring that all
        changes are traceable for audit purposes.
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
