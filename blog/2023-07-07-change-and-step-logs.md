---
slug: change-and-step-logs
title: 'The power of OpsChain: Change logs & step logs in your DevOps workflows'
authors: pgonzalez
tags: [devops, troubleshooting, efficiency, oversight, toolchains]
date: 2023-07-11T11:00
---

In today's fast-paced DevOps environment, effective and efficient task management is the key to success. This blog post dives into two powerful tools within OpsChain, **change logs** and **step logs**, and explores how these features can streamline your operations, enhance transparency, and facilitate efficient troubleshooting.

<!--truncate-->

---

A quick primer for those who may not be familiar with OpsChain concepts. If you are familiar with these, feel free to skip to the next section.

:::note What’s an _action_, _change_ and a _step_

An action defines a task that can be performed, for example, provisioning or restarting a server. Essentially, you could define an action for any type of task in your DevOps workflow. Actions in OpsChain are defined using the flexibility and power of Ruby.

Actions can include one or more Steps. Steps perform a unit of work within that task. Steps can be chained together for sequential or parallel execution.

Now, let's discuss how changes fit into this framework.

A change is the execution of a specified action against a project and environment. Importantly, each step is executed inside its own container to ensure that:

- steps running in parallel do not impact each other
- modifications made to the container running a step do not affect future steps
- the step execution environment is pristine and contains only the current project's configuration and files

Want to learn more? Check out our [concepts guide](https://docs.opschain.io/docs/reference/concepts/).

:::

## Change logs

Change logs in OpsChain are designed to keep a real-time comprehensive record of all activities and outputs associated with the execution of a change. This includes combining the output from all the steps as they occur, i.e. output from parallel steps is blended as it occurs.

![image](/img/manage.svg)

Change logs provide several benefits, including:

### Comprehensive overview

Change logs offer a bird's-eye view of each change, providing a high-level perspective on the process as a whole.

### Simplified troubleshooting

With change logs, you can quickly identify where a change process may have faced issues, offering a starting point for troubleshooting.

### Transparency

Change logs provide an easily accessible record of what changes were made and when, ensuring transparency across your team.

### Audit trail

The change logs also serve as an audit trail for all changes, providing a historical record that can be crucial for audits or understanding past changes.

### Ease of use

Change logs are easily accessible and provide a consolidated view of the logs for all the steps in a change.

Accessing a change log is straightforward and is available via:

- Web browser: Navigate to the desired change details page and click on the change logs tab
- CLI: Execute the command `opschain change show-logs -c {change id}`
- API: Leverage the [change log lines](https://docs.opschain.io/api-docs/#tag/Log-lines/paths/~1api~1changes~1%7Bchange_id%7D~1log_lines/get) endpoint

## Step logs

In addition to change logs, OpsChain also offers step logs, which provide granular insights into each individual step within a change. This allows you to view the output of the step in isolation allowing you to delve deeper into your change workflow.

![view stop log](/img/view-step-log.png)

Step logs offering the following benefits:

### In-depth insights

Individual step logs offer a detailed view into your operations. With comprehensive information about each step, including timestamps, execution status, and log messages, you can see exactly what transpires at every step of a change.

### Efficient troubleshooting

With the ability to identify precisely where issues arise in your processes, the individual step logs enable faster and more efficient troubleshooting, reducing downtime and improving operational continuity.

### Continuous improvement

The feature allows for a deep analysis of each step, enabling you to identify areas that may need refinement or improvement.

### Enhanced accountability

The individual step logs create an immutable record of every action taken during a change process, improving transparency and accountability within your team.

### Better planning

Detailed records can serve as a valuable reference for future changes, helping your team to estimate time and resources more accurately.

### Optimise your DevOps

The insights and granularity provided by step logs allow your team to identify bottlenecks in your deployments and reduce time to deploy.

### Ease of use

Step logs are easily accessible and provide a view of the logs for a single step.

Accessing a step's logs is straightforward and is available via:

- Web browser: Navigate to the desired change details page and select the step from the step tree to view its logs
- API: Use the [log lines API](https://docs.opschain.io/api-docs#tag/Log-lines/paths/~1api~1steps~1%7Bstep_id%7D~1log_lines/get) to view the logs for a single step

With the combined power of change logs and step logs, OpsChain provides a detailed and comprehensive suite of tools for managing your operational changes effectively.

---

We appreciate your time and interest in learning about the power of change logs and step logs in OpsChain. Unleash the full potential of your DevOps workflows with the combined power of change logs and step logs in OpsChain. Eager to learn more about how you could benefit? Explore [opschain.io](https://opschain.io) today for more information.
