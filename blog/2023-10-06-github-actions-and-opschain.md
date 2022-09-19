---
slug: github-actions-and-opschain
title: 'Enhancing GitHub Actions capabilities using OpsChain'
authors: pgonzalez
tags: [devops, github actions, workflow optimisation, enhanced automation]
date: 2023-10-06T10:00
---

In the rapidly evolving world of DevOps, automation and orchestration tools have proven instrumental in streamlining workflows and boosting productivity. GitHub Actions (GHA), over the past few years, has gained a dedicated following of users who have embraced it for its ease of adoption and tight integration with the GitHub ecosystem.

Despite its capabilities, there are several use cases that can pose challenges for organisations. In this situation, as with any tool, it's not about replacing what you've built but enhancing it. OpsChain excels on this principle, promising not a <b><i>rip out and replace</i></b> solution but a harmonious coexistence that amplifies the value of your existing GHA setup.

<!--truncate-->

## GitHub Actions challenges

![](/img/complex-code-discussion.png)

### Flexibility & complexity

While GHA is fantastic for straightforward workflows, things can get tricky as complexity scales up. Managing interdependent jobs, handling sophisticated queuing, and ensuring a seamless workflow across multiple repositories can become a daunting task.

### User experience for the uninitiated

GitHub, being a platform primarily designed for developers, can alienate non-technical stakeholders. The inherent expectation that this type of user understands the nuances of a 'GitHub-centric' worldview can lead to inefficiencies and difficulties in adoption, especially when human approvals or oversight from diverse teams are required.

### Observability bottlenecks

As organisations scale, they often deal with multiple repositories, making it increasingly challenging to track and manage changes and action pipelines. The decentralised nature of GHA often means that users find themselves chasing down repositories, trying to stitch together a comprehensive picture of the state of their workflows, not to mention when attempting to troubleshoot when something has gone wrong.

### Execution constraints

Some of GHA's built-in limitations, like execution time caps, can be a stumbling block for enterprises with hefty processing demands. The lack of flexibility here often necessitates workarounds or compromises that can impede optimal workflow.

### Progressive automation limitations

GHA mandate that the entirety of the workflow be automated in your action. For organisations attempting to adopt automation progressively, this can be difficult as it effectively becomes a question of automating all or nothing. Finding the sweet spot can be challenging.

## GHA with OpsChain

![](/img/winning-with-opschain2.png)

Embracing OpsChain doesn’t mean abandoning the workflows and automations you've established with GitHub Actions. It's about bolstering them. OpsChain is designed to co-exist seamlessly with GHA, ensuring that organisations get the most out of their existing configurations. By introducing OpsChain into the mix, teams can fill the gaps left by GHA, creating a robust, holistic, and efficient automation environment that gets the best of both worlds.

### Advanced queuing mechanisms

While GHA provides a basic <b>concurrency group</b> primitive, it's limited in terms of queuing multiple jobs. OpsChain, on the other hand, brings complex workflow management to the table. Not only does it support intricate parallel/serial steps, but its step tree also ensures visibility of what has been queued, addressing the limitations found in GHA.

### Human approvals user experience

GHA, while powerful, leans towards a GitHub-centric worldview. This can be a challenge for non-technical stakeholders or those unfamiliar with the intricacies of GitHub. OpsChain's GUI aims to offer a more intuitive default user experience, especially for those responsible for approving steps or changes.

### Centralised observability

A common pain point with GHA is its distributed nature when multiple repositories are in use. OpsChain eliminates the hassle by offering a central view of all changes across multiple projects and environments. Think of it as an overarching view giving you a single source of truth to determine what has occurred.

### Extended execution time

Enterprise environments often demand long-running processes. GHA's limitations, like a 6-hour cap on job execution, can be problematic. OpsChain, understands the complexities of business requirements and does not impose known limitations on job or workflow run times.

### Rich metadata handling

In GHA, capturing business metadata such as JIRA ticket IDs, Change Approval Board identifiers, etc. in your workflows often involves workarounds that mix this crucial information in your Git commits. OpsChain recognises the significance of metadata, treating it as a first-class citizen. It enables you to overlay governance over the code and capture any data, streamlining search and reporting processes.

### Comprehensive auditing

With GHA, tasks like tracking who cancelled a workflow or listing approvals executed by a person can be tedious. OpsChain simplifies auditing by providing these features as standard, both through its GUI and API. Moreover, it offers an easy overview across repositories, eliminating the need to inspect each one individually.

## Conclusion

For organisations using GHA, the adoption of OpsChain can significantly enhance your orchestration capabilities. By addressing GHA limitations and offering a plethora of advanced features, OpsChain stands as a valuable companion for those looking to optimise their workflow automation. Whether it's queuing, observability, or metadata management, OpsChain promises a solution that takes you a step closer to seamless automation. To learn more about how you could benefit, explore [opschain.io](https://opschain.io) today.
