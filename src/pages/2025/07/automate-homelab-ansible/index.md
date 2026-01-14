---
title: 'Automate homelab chores with Ansible'
date: '2025-07-18'
url: automate-homelab-chores-ansible
draft: true
authors:
  - "Scott Yeager"
categories:
  - "Guides"
tags:
  - "Guides"
  - "Linux"
  - "Red Hat"
---
# Automate homelab chores with Ansible

Part of running a homelab is inevitably repeating certain tasks, such as when bringing new servers or VMs online. Often it boils down to connecting by SSH, running a set of commands, and maybe copying over some config files. If you're like me, you might catch on after doing the same thing many, many times and finally write down some notes. But what if we could go a step further and automate homelab tasks, in a way that's actually pretty easy to get started with? Well, that's where Ansible comes in. In this guide we'll learn how to use Ansible, starting with just a basic level of homelab skills.

Some of you might be thinking that scripts are the natural answer to this kind of automation. That's true, but scripts have a few caveats. The biggest one is that writing scripts is difficult, even in the age of AI. Imagine though that there could be libraries of well tested scripts that we could snap together like legos to take a new server or VM from a bare foundation to a more or less finished structure. At it's core, that's what Ansible does, and there's a rich open source ecosystem around it to explore as well.

## Roadmap and requirements

Here's where we'll be headed in this guide:

1. How to install Ansible
2. Introduction to Ansible concepts
3. Using Ansible to set up a fresh machine

The main prerequisite here is that you need to be able to set up SSH access to the server or VM that you want to manage using Ansible. You will also need to choose an Ansible control machine. This control machine must be running Linux, MacOS, or Windows Subsystem for Linux (WSL) in the case of Windows. Any machine in your lab can serve as the control machine, and that could be a server or a single board computer like a Raspberry Pi. Again, the main requirement for using Ansible is that you can make an SSH connection from the control machine to the managed machine.

Here's an example for how this might look in practice:

```
  ┌───────────┐      ┌──────────┐         ┌──────────┐
  │  Laptop   │ SSH  │   RPi    │ Ansible │  Server  │
  │           ├─────►│          ├────────►│          │
  │ (Windows) │      │ (Ubuntu) │  SSH    │ (Ubuntu) │
  └───────────┘      └──────────┘         └──────────┘
```

In this case, the Ansible commands are run on the Pi in an SSH session, and Ansible connects from the Pi to the server over a second SSH connection. For authentication using SSH public keys, the simplest way to achieve this would be to load the public SSH key of the Raspberry Pi into the authorized keys file of the server.

I won't say more about SSH setup here, but there are tons of great resources around the web if you need more help getting prepped.

As a final note about requirements, Ansible does require that Python is installed on the machines it manages. Most Linux distros, including Ubuntu server and Ubuntu VM images, are generally going to have Python installed already out of the box. I'll be demonstrating Ubuntu as the managed OS in this guide. Managing other distros with Ansible is definitely possible, but some adjustments may be required, including manually installing Python.

## Install Ansible

Being a Python application, there are a variety of ways to install Ansible, which can get a bit confusing. The steps below are what I recommend for installing on Ubuntu and MacOS. Just to refresh here, you will be installing ansible on your control machine, such as the Raspberry Pi in the example above.

For Ubuntu, there's a PPA you can add to facilitate installing Ansible as a regular apt package. Here's the steps, as shown in the relevant Ansible [docs page](https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html#installing-ansible-on-ubuntu):

```sh
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
```

On MacOS, Ansible can be installed with Homebrew:

```sh
brew install ansible
```

If you use another Linux distro, there may be an official Ansible package provided by your distro's package manager. You can check [this page](https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html) of the Ansible docs for info on some such packages. Finally, the fallback method that should work in basically every environment is to use `pipx`, which you can find documented [here](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-and-upgrading-ansible-with-pipx).

Whatever route you take, after a successful install this command should print Ansible's version information:

```sh
ansible --version
```

## Ansible concepts

Before jumping into actually getting stuff done with Ansible, let's briefly cover a few more core Ansible concepts. I've been using the term "control machine" to describe the machine that Ansible commands run on, but in the Ansible docs this is referred to as a *control node*. Likewise, machines managed by Ansible are *managed nodes*. Here a "node" could be a physical server or virtual machine (technically a container could also serve as a node in an Ansible setup, but that's a rarer use case that we won't discuss in this guide).

As I mentioned before, the core functionality of Ansible is essentially using the control node to execute scripts on managed nodes. What sets Ansible apart from basic scripting is its focus on creating simple, safe, and reusable workflows. These workflows are known as *playbooks*, and they represent a set of instructions to be executed on the managed machine. Playbooks can contain *tasks* and also *roles* which are themselves collections of tasks. Don't worry if that's starting to feel a bit confusing, as this will become clear in practice.

While we'll just be using a single managed machine for our example in this guide, one of the powerful things about Ansible is that it can work with groups of managed nodes in parallel. The node or nodes to be managed are specified in an Ansible *inventory*. Inventories can also be split into groups for more complex use cases, but we won't cover that here.

Both playbooks and inventories are just regular text files that comply with certain formatting conventions. In the case of playbooks, that will be YAML, which is a very popular syntax for formatting config and data files. Don't worry if you're not familiar with YAML, because basic use of Ansible doesn't require writing YAML or understanding it deeply. Inventory files, on the other hand, can be written either in YAML or Ansible's own INI format. For this guide we'll use INI, since it's a bit simpler, especially for the basic inventory we will use.

With all of that in mind, the most common Ansible workflow boils down to running a playbook on a given inventory. Ansible will work through the playbook and attempt to apply each step to each target machine in the inventory, printing its progress as it goes. If all goes well, the managed nodes become transformed according to the goal or goals of the playbook.

## Playbooks and roles

While it's possible to go rather deep with Ansible for those who are motivated to create custom components specialized for their exact needs, the good news for the rest of us is that many common system admin tasks are well covered in open source resources. Ansible has its own package manager of sorts called Ansible Galaxy, which can be used to download premade roles and collections of roles. These typically include example playbooks that can be copied directly to get started.

So as casual users of Ansible, our first job will be to find suitable a suitable role that does the job we're interested in. Let's start with a word of caution here:

> Using Ansible roles, collections, and playbooks from Ansible Galaxy or elsewhere on the internet can be a security risk. Either stick to authors that you trust, or better yet, always review the contents before using them.

For this guide, we'll start first with a role for a fairly straightforward task: installing Docker. We're big fans of Docker here, so installing Docker is going to be one of those first steps we do on many fresh machines. You might be thinking that installing Docker can be rather easy, using the convenience script provided by Docker. That's true, but with Ansible we can also get more control, as I'll show when we get there.

To find a solution for installing Docker with Ansible, I first navigate to [Ansible Galaxy](https://galaxy.ansible.com/). Then I'll select *Roles* from the left nav bar, and do a keyword search for "docker". There's almost 1500 results and by default they are being sorted by the most recent update. One strategy for finding trustworthy content on Galaxy is to switch the sort to download count instead:

[[screenshot showing galaxy roles for docker sorted by download count]]

In this view we can see that the top result has more than 21 million downloads. The author is Jeff Geerling, a well known contributor to the Ansible ecosystem. If we follow the link to Github, we can also see that the repository has more than 2000 stars. Needless to say, this role is probably safe to use.

Back on Galaxy, we can click the documentation tab and read about how to use the role. All the way at the bottom is an example playbook. Looks simple enough, right?

## Creating an inventory

Before we can try the playbook, we need an inventory. Before I said that we'd use the INI format for an inventory file. Let's create that now. On your control node, make a folder to hold our Ansible files and then start editing the inventory file:

```sh
mkdir ansible
cd ansible
nano inventory.ini
```

Inside the inventory file, write a line like this, replacing the host name, IP address, and user (either root or a user with sudo abilities) with the appropriate values for your managed node:

```
hostname ansible_host=192.168.0.42 ansible_user=root
```

If you have your network setup so that your control node can already resolve the hostname of the managed node, you can omit the `ansible_host` section and IP address.

Save the file (ctrl-o, enter, ctrl-x), and then you're done creating the inventory.

## First playbook

Now let's make our first playbook. This will just be a copy of the example playbook from the Ansible Galaxy [documentation](https://galaxy.ansible.com/ui/standalone/roles/geerlingguy/docker/documentation/) (scroll to the bottom) for the Docker role we're using.

Edit another file:

```sh
nano docker-playbook.yml
```

Enter these contents:

```yaml
- hosts: all
  roles:
    - geerlingguy.docker
```

Again, save the file and exit. There's not much to see in this file. As you might have guessed, the idea is that we are applying the Docker role to all hosts, which is to say all hosts in the inventory.

Before we can use a role from Galaxy, we need to install it:

```sh
ansible-galaxy role install geerlingguy.docker
```

With all of that done, we can now execute the playbook on our inventory:

```sh
ansible-playbook -i inventory.ini docker-playbook.yml
```

You can now sit back and watch the log messages fly by. When it's all done, you could try connecting to the managed node and running some Docker commands to check that the install worked.

## Okay, what now?

I hope this has already sparked your interest in the power of Ansible. With just a few commands and a couple of short config files, we now have a repeatable automation recipe. Installing Docker on one machine isn't a big job, but this could already be very useful if you needed to do this on 5 machines or 100 machines at the same time.

That said, I also promised to show why this method is more powerful that just using the Docker convenience script. The documentation for the Docker role we used covers a number of config values that can be set, along with their default values. There's also a note to check `defaults/main.yml` for the full list of defaults. Let's check that now, by popping over to [Github](https://github.com/geerlingguy/ansible-role-docker/blob/master/defaults/main.yml) (Github repo link is in the upper right of the Ansible Galaxy page).

Right at the top, we can see a list of packages that this role will install. This is something we might want to tweak. For example, maybe we know we won't be building any images on a given machine, so the `docker-buildx-plugin` isn't needed. We can change the playbook to specify which packages to install like this:

```yaml
- hosts: all
  vars:
    docker_packages:
      - "docker-{{ docker_edition }}"
      - "docker-{{ docker_edition }}-cli"
      - "docker-{{ docker_edition }}-rootless-extras"
      - "containerd.io"

  roles:
    - geerlingguy.docker
```

Any variables for this role can be set in the same way, by creating entries under the `vars` section. Now if we were to run this playbook on another fresh machine, only the listed Docker packages would be installed.

## Conclusion

In this guide, we covered how to install Ansible, the core concepts of Ansible, and how to use an Ansible role to deploy Docker onto one machine. We also saw how Ansible roles can be configured via variables to adjust their behavior.

There's a lot more you can do with Ansible, and we've really just scratched the surface here. Pretty much any repetitive task you perform via SSH can be automated with Ansible. Playbooks can be built up from individual tasks, without needing to use a prepackaged role written by someone else. Ansible provides a variety of built in modules that cover many basic tasks like installing packages, managing users, and copying files.

If you're feeling hungry to explore more, I'd encourage you to explore the Ansible docs or maybe ask your favorite LLM for help writing a playbook for some task you have in mind. Practicing with virtual machines is a great way to test your experiments with low stakes. Have fun!
