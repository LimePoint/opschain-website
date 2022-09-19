---
slug: opschain-and-azure
title: 'How to deploy Azure services with OpsChain'
authors: gstankovski
tags: [OpsChain, Azure, automation]
date: 2023-10-31T09:10
---

Deploying cloud services in Azure is not a straightforward task. It calls for a nuanced balance between security, cost-effectiveness, and performance optimisation. But what if there were a tool designed to cut through this complexity, enabling rapid deployment without compromising on quality? This is where OpsChain enters the spotlight. In this article, we explore the key considerations for deploying services in Azure and reveal how OpsChain can turbocharge these operations.

<!--truncate-->
## Critical aspects for Azure service deployment

While these are core considerations, the specifics of each deployment may vary depending on the type of service, the industry, regional considerations, and organisational requirements. Always tailor your approach to your specific needs and circumstances.

### 1. Design for security and compliance

- **Identity & access management:** Utilise Azure Active Directory to manage user identities, roles, and permissions. Implement least privilege principles, ensuring only authorised personnel have access to resources.
- **Network security:** Set up a virtual network and configure network security groups to control inbound and outbound traffic. Consider deploying Azure Firewall or other network virtual appliances for advanced protection.
- **Data protection:** Use encryption for data at rest (Azure Storage Service Encryption) and in transit (SSL/TLS). Ensure databases use transparent data encryption and always keep backups in geographically diverse locations.
- **Monitoring & audit:** Leverage Azure Security Center and Azure Monitor to gain insights into security health, detect threats, and keep a record of activities for audit purposes.

### 2. Optimise for cost and performance

- **Right-size resources:** Start with conservative estimates and adjust based on demand. Monitor usage patterns to avoid overprovisioning or underutilizing resources.
- **Use reserved instances:** If you can predict the usage of certain services for a longer period (like 1-3 years), opting for reserved instances can save significantly compared to pay-as-you-go pricing.
- **Implement autoscaling:** Azure's autoscale capability allows resources like VMs and databases to scale up or down based on demand, ensuring you pay only for what you use and maintain optimal performance.
- **Monitor & analyse costs:** Utilise Azure Cost Management and Azure Advisor to get insights into your spending and receive recommendations to reduce costs.

### 3. Implement robust deployment and management practices

- **Infrastructure as code:** Use Azure Resource Manager templates or tools like Terraform to define, deploy, and manage infrastructure consistently and repeatably.
- **Continuous integration/continuous deployment (CI/CD):** Use Azure DevOps, GitHub Actions, or other CI/CD tools such as OpsChain to automate deployment processes, ensuring consistent and error-free releases.
- **Backup and disaster recovery:** Regularly back up critical data using services like Azure Backup. Implement a disaster recovery strategy with Azure Site Recovery or a similar solution to ensure business continuity.
- **Stay updated:** Azure, like all cloud platforms, constantly evolves. Stay informed about the latest features, best practices, and potential vulnerabilities by following Azure updates and participating in relevant communities.

## Deploying Azure Kubernetes Service (AKS) with OpsChain

Now let's explore how OpsChain can not only accelerate the delivery of your Azure cloud services, but also provide you the insight and governance across the changes you deploy. Let's go ahead and deploy a new AKS using OpsChain.

OpsChain has an Azure plugin out of the box that provides a set of [Azure resources (private repository - request access)](https://github.com/LimePoint/opschain-azure-cloud) that can be used to accelerate the delivery of your Azure cloud services. Use these OpsChain native resources, or plug-in your favourite tools, such as Terraform and start seeing the benefits!

Deploying and configuring a new AKS is as simple as defining a new OpsChain resource as follows:

```ruby
  namespace :azure do
    namespace :kubernetes do
      azure_kubernetes :aks_cluster do
        cluster_name "opschain-aks"
        resource_group "opschain-rg"
        location "australiaeast"
        kubernetes_version "1.26.3"
        subnet ref('network:aks_subnet')
        enable_cluster_autoscaler true
        min_count 1
        max_count 5
        max_pods 110
        node_vm_size "Standard_D4ds_v5"
        node_osdisk_size 100
        node_resource_group "opschain-managed-rg"
        nodepool_name "system"
        no_ssh_key true
        vm_set_type "VirtualMachineScaleSets"
        os_sku "Ubuntu"
        os_type "Linux"
        load_balancer_sku "standard"
        network_plugin "kubenet"
        network_policy "calico"
        docker_bridge_address "192.168.86.1/24"
        dns_service_ip "10.10.2.86"
        service_cidr "10.10.2.0/24"
        pod_cidr "10.20.0.0/16"
        tags repository_properties.tags
        service_principal ENV['AZ_SERVICE_PRINCIPAL_CLIENT_ID']
        client_secret ENV['AZ_SERVICE_PRINCIPAL_CLIENT_SECRET']
        # Set Uptime SLA
        uptime_sla true
      end
    end
  end
```

The above OpsChain resource `azure:kubernetes:aks_cluster` (note, the resource is uniquely addressed using the namespaces `azure` and sub-namespace `kubernetes`) exposes a set of actions out of the box (`:create`, `:delete`, `:upgrade`, `:update`, `:scale`, `:stop`, `:start`, `:rotate_certs`, and `:update_credentials`). These `actions` are available to the user when creating a new `change` in OpsChain.

In OpsChain, a `change` is defined as performing an `action` on an `environment`, using a specific `Git revision` (as all good GitOps engineers do - we store all our code in Git).  This way we can track exactly which Git revision (or SHA) was applied to an environment, and which action was performed to apply it.

So, let's go ahead and create a new `change` to deploy a new AKS Cluster. Note, here we are creating a new change using the action `azure:blueprint:kubernetes:create` exposed by the underlying resource. Furthermore, this resource will essentially translate the resource and its associate configuration to underlying Azure API calls to perform the work using the standard Azure command line interface.

```bash
opschain change create --project-code blueprint --environment-code sandbox --git-remote-name origin --git-rev development --action azure:blueprint:kubernetes:create --confirm --background
```

![OpsChain change dashboard create AKS](/img/opschain-aks-create.png)

![OpsChain change dashboard create AKS step logs](/img/opschain-aks-create-step-logs.png)

The above dashboards provide an over-arching view of the change, including each step in the workflow, and their associated step logs. View the logs for any specific step in the workflow is as simple as drilling down into the step logs.

OpsChain provides observability of changes across your environments. Identifying which changes were applied to which environment, and by whom, is critical to providing efficient environment operational management.

![OpsChain change history](/img/opschain-change-history.png)

`Changes` may also be annotated with [`metadata`](https://docs.opschain.io/docs/reference/concepts/changes#change-metadata), providing increased visibility, categorisation, and searchability of `changes`.

In addition to change observability, OpsChain supports [human approvals for changes](https://docs.opschain.io/docs/getting-started/#human-approvals-for-changes), which provides additional governance capabilities by introducing human interaction into fully automated workflows. Incorporating a human element to otherwise automated workflows provides the BAU operator with additional controls over automated change delivery. For example, in uncontrolled environments, such as is typical in `Development` or similar, allowing changes to be deployed in a fully automated fashion is desirable. However, in controlled environments, such as in `Production` and `UAT`, requiring human intervention to approve changes provides the organisation with additional elevated privilege controls over environment management.

The [OpsChain events API](https://docs.opschain.io/docs/reference/concepts/events) provides a strong audit trail of any changes that have modified underlying data stored in OpsChain, enabling your security team to demonstrate compliance with any regulatory requirements. This provides a level of comfort to organisational security, ensuring that your operations teams themselves are auditable in addition to the environments and systems they manage.

### Technical information

#### OpsChain documentation

To familiarise yourself with OpsChain, visit the [OpsChain Documentation Library](https://docs.opschain.io/docs) and look at the [OpsChain Reference Guide](https://docs.opschain.io/docs/category/reference) and the [OpsChain Getting Started Guide](https://docs.opschain.io/docs/getting-started/).

Note, the samples in this article are located in the [OpsChain Examples Repository (Azure): opschain-examples-azure-cloud](https://github.com/LimePoint/opschain-examples-azure-cloud), and are available to OpsChain customers.

#### OpsChain actions

`Actions` in OpsChain are reusable units of work that can be both composable or simple atomic tasks, represented as one or more `steps`. `Steps` themselves can consist of one or more `steps`, executed in either serial or parallel. This provides a flexible framework for composing and assembling workflows, ranging from simple to complex. In OpsChain, we compose a chain of `steps` to perform an `action`, which is itself assembled from one or more `actions`.

Let's take a closer look at this.

Here we have `network` and `kubernetes` namespace definitions. This allows us to group actions and resources in a namespace, making them easily identifiable.

```ruby
  # This is a namespace
  namespace :azure do
    # This is a namespace nested in another namespace.
    namespace :network do

      # This is a resource.
      # Resource are provided by Resource Controllers.
      # OpsChain provides resources out of the box for common tools, such as Terraform, Bash, Azure CLI, etc.
      # OpsChain is pluggable so you can develop your own Resource Providers and plug them into OpsChain easily.
      azure_network_nsg :aks_nsg do
        nsg "opschain-nsg"
        resource_group "opschain-rg"
        location "australiaeast"
        # A resource exposes a set of actions via its underlying resource controller.
        # These resources expose actions such as :create, :delete, and :update.
      end

      azure_network_vnet :aks_vnet do
        vnet "opschain-vnet"
        resource_group "opschain-rg"
        location "australiaeast"
        address_prefixes "10.247.0.0/22"
      end

      azure_network_vnet_subnet :aks_subnet do
        subnet "opschain-subnet"
        vnet aks_vnet
        network_security_group aks_nsg
        resource_group "opschain-rg"
        address_prefixes "10.247.0.0/23"
        service_endpoints "Microsoft.AzureActiveDirectory Microsoft.ContainerRegistry Microsoft.KeyVault Microsoft.Sql Microsoft.Storage"
      end
    end

    namespace :kubernetes do
      azure_kubernetes :aks_cluster do
        cluster_name "opschain-aks"
        resource_group "opschain-rg"
        location "australiaeast"
        kubernetes_version "1.26.3"
        subnet ref('network:aks_subnet')
        enable_cluster_autoscaler true
        min_count 1
        max_count 5
        max_pods 110
        node_vm_size "Standard_D4ds_v5"
        node_osdisk_size 100
        node_resource_group "opschain-managed-rg"
        nodepool_name "system"
        no_ssh_key true
        vm_set_type "VirtualMachineScaleSets"
        os_sku "Ubuntu"
        os_type "Linux"
        load_balancer_sku "standard"
        network_plugin "kubenet"
        network_policy "calico"
        docker_bridge_address "192.168.86.1/24"
        dns_service_ip "10.10.2.86"
        service_cidr "10.10.2.0/24"
        pod_cidr "10.20.0.0/16"
        tags repository_properties.tags
        service_principal ENV['AZ_SERVICE_PRINCIPAL_CLIENT_ID']
        client_secret ENV['AZ_SERVICE_PRINCIPAL_CLIENT_SECRET']
        # Set Uptime SLA
        uptime_sla true
      end

      azure_kubernetes_nodepool :aks_nodepool_workloads do
        nodepool_name "workloads"
        cluster aks_cluster
        resource_group "opschain-rg"
        subnet ref('network:aks_subnet')
        kubernetes_version "1.26.3"
        enable_cluster_autoscaler true
        min_count 1
        max_count 5
        max_pods 110
        mode "User"
        os_sku "Ubuntu"
        os_type "Linux"
        node_vm_size "Standard_D4ds_v5"
        node_osdisk_size 100
        labels "UserWorkloads=true"
      end
    end
  end
```

Okay, so now we have our resources defined in OpsChain. Note that these resources provide a set of inherit actions such as `:create` and `:delete`. The underlying controllers expose these actions. Note, for further details, please refer to the corresponding controller documentation.

Let's create some over-arching actions we can provide to our users. The actions below allow us to compose a set of resource actions into larger workflows to `:create`, `:delete`, `:rebuild`, `:start`, `:stop`, `:restart`, and `:upgrade` our Kubernetes cluster.

```ruby
    action :create, steps: [ 'kubernetes:aks_cluster:create', 'kubernetes:aks_nodepool_workloads:add' ]
    action :delete, steps: [ 'kubernetes:aks_nodepool_workloads:delete', 'kubernetes:aks_cluster:delete' ]
    action :rebuild, steps: [ 'delete', 'create' ]
    action :start, steps: [ 'kubernetes:aks_cluster:start', 'kubernetes:aks_nodepool_workloads:start' ]
    action :stop, steps: [ 'kubernetes:aks_nodepool_workloads:stop', 'kubernetes:aks_cluster:stop' ]
    action :restart, steps: [ 'stop', 'start' ]
    action :upgrade, steps: [ 'kubernetes:aks_cluster:upgrade', 'kubernetes:aks_nodepool_workloads:upgrade' ]
```

Once we have defined our actions in OpsChain, we can create a `Change` to perform them when required.

## Conclusion

There are many ways to solve the above problem, but using the right tools for the job is critical to ensure ongoing operational efficiency and oversight.

OpsChain is designed from the ground up with multi-team environments in mind. With its robust orchestration capabilities, governance insights, and pluggable architecture, OpsChain unifies change across people, technology, and processes. It not only automates workflows but also facilitates collaboration, helps with troubleshooting your pipeline, and promotes engagement with your stakeholders. To learn more about how you could benefit, explore [opschain.io](https://opschain.io) today.

## References and links

- [OpsChain Azure resources Git repository (private repository - request access)](https://github.com/LimePoint/opschain-azure-cloud)
- [OpsChain example project - Azure cloud (private repository - request access)](https://github.com/LimePoint/opschain-examples-azure-cloud)
