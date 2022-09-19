---
sidebar_position: 1
---

# OpsChain case studies

---

## Case study: Large energy generator and retailer modernises DevOps workflows with OpsChain and ArgoCD

### Introduction

A large energy generator and retailer serving residential and commercial customers undertook an initiative to modernise their legacy applications and migrate them to Azure Cloud, deployed onto Azure Kubernetes Service (AKS). [LimePoint](https://www.limepoint.com) implemented a solution that provided a reusable blueprint for the organisation, one that would deliver streamlined CI/CD processes across applications and platforms, providing automated workflows that would build, package, and deploy their legacy applications onto Azure Kubernetes Service (AKS), as well as deliver platform pipelines that manage the underlying Azure Kubernetes Platform underpinning them. [OpsChain](https://opschain.io) integrated with [ArgoCD](https://argo-cd.readthedocs.io/en/stable) formed an integral part of the overall solution.

### Problem

EnergyCo's DevOps team faced challenges in managing their application deployments and infrastructure updates. Their legacy applications were deployed on aging infrastructure in need of a refresh and were also managed using legacy tools and processes that proved not only slow and cumbersome but prone to human error. The current workflow processes were time-consuming, error-prone, and lacked consistency and visibility. This impacted their ability to respond quickly to changing business needs and customer demands.

### Solution

To address these challenges, the organisation deployed Azure Kubernetes Services and implemented OpsChain, which helps orchestrate DevOps workflows across on-premise and cloud-based platforms. OpsChain is the central orchestrator in the solution. It is triggered by Git pipelines/workflows and is responsible for deploying the underlying Azure Kubernetes (AKS) Resources and bootstrapping and configuring the Kubernetes cluster with core services such as External-DNS, CertManager, and deploying ArgoCD onto the cluster. OpsChain orchestrates and coordinates any ArgoCD Sync activities that are required to be deployed as a part of the release/deploy workflow. ArgoCD, a Kubernetes CI/CD gitops tool, was integrated into the solution and ensured Kubernetes resources were updated and aligned with the deployment manifest.

![Energy OpsChain solution](/img/opschain-argocd-case-study.png)

### Results

By using OpsChain and ArgoCD, the organisation was able to achieve several key benefits, including:

1. Streamlined workflows: OpsChain and ArgoCD helped the organisation streamline their DevOps workflows by automating manual processes and reducing errors.

2. Platform management: OpsChain helped the organisation manage the underlying Azure Kubernetes Services (AKS) platform and ensure its configuration is maintained and audited through automated workflow processes.

3. Improved visibility: The platform provided real-time visibility into their application and infrastructure updates, enabling the DevOps team to quickly identify and resolve issues.

4. Consistency: OpsChain ensures all changes are logged and auditable in a single system, regardless of where they are originally triggered. This provides a single source of truth for all changes which is essential for compliance.

5. Time savings: The ability to reuse existing actions for automation in OpsChain allowed the organisation to save time and effort that would have otherwise gone into handcrafting new actions.

6. Increased agility: With the automation of their deployment processes, the organisation was able to quickly respond to changing business needs and customer demands.

7. Enhanced collaboration: OpsChain and ArgoCD facilitated collaboration between different teams and departments, improving overall efficiency and productivity.

### Conclusion

EnergyCo's implementation of Azure Kubernetes Services (AKS) underpinned by OpsChain and ArgoCD has been a success, enabling the company to improve their DevOps workflows and enhance their ability to respond to changing business needs and customer demands. The solution has provided real-time visibility, streamlined workflows, increased agility, and enhanced collaboration.
