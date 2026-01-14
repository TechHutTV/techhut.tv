---
title: 'Self-Host with Immich!'
date: '2025-02-06'
url: self-host-immich-photo-backup
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Self-Host"
  - "Homelab"
  - "Docker"
---
Our personal image libraries are one of the most important things we manage. There are many services like Google Photos, Amazon Photos, Dropbox, iCloud, etc., designed to help us do this efficiently. However, these services come with some challenges. One is difficulty accessing data without an internet connection. Another concern is trusting these organizations to stay available and protect our data's
security. Additionally, some terms and conditions allow them to use or profit from the data we upload. For these reasons, I prefer hosting some of my most important data myself in my own home. After trying many different solution, I have landed on Immich as my go-to self hosted solution.

Immich offers a refreshing alternative to services like Google Photos by prioritizing privacy and control. As a self-hosted solution, it keeps your photos and videos entirely on your own hardware, avoiding third-party data mining or subscription fees. You get full ownership of your media, support for RAW files, and customizable organization tools—like auto-sorting photos into folders based on dates, cameras, or custom rules. While setup requires some technical work and , it’s a trade-off for avoiding vendor lock-in and ads. Its local AI features (face/object recognition) may not match Google’s polish, but for users valuing transparency and flexibility, Immich is a compelling, ethical choice. Granted, there are some cons to using Immich. First, it requires more work and effort to manage the service, not having additional backups can be a huge risk to your data. Second, it isn’t as integrated with your smartphone as services like Google Photos or iCloud would be. Despite these drawbacks, I chose Immich because of its excellent mobile application for both Android and iPhone, which includes built-in photo backup support.

### **Prerequisites**
1. A server running Docker. Checkout our [docker guide](https://techhut.tv/7-docker-basics-for-beginners/) to get this going.
2. Portainer installed and accessible via web UI (If you're using Unraid, Kubernetes, or anything else checkout [the docs](https://immich.app/docs/overview/quick-start/).)
3. Recommended 6GB of ram and 4 core CPU. ([lean more](https://immich.app/docs/install/requirements))
4. Enough storage for your media. I have 4TB of space setup for this. Your needed ammount will depending on your photography habits and current media collection.

__NOTE: Most of the steps below are from their [official docs](https://immich.app/docs/overview/quick-start). Please check those out as well.__

### **Step 1: Prepare Your Environment**
1. Create directories for Immich data.
  - The commands below are just an example of creating in my home directory.
  - You may want to change the `library` location to a network dive or another location if your root file system has less storage than you may need.
  - Checkout this example of [mounting a drives](https://techhut.tv/auto-mount-drives-in-linux-fstab/) in Linux.
   ```bash
   mkdir -p ~/docker/immich/{library,postgres}
   ```
   (Adjust paths according to your preferences)

2. Note your server's IP address or domain name. You can use `ip a` to find this.


### **Step 2: Create Immich Stack in Portainer**
1. Log into Portainer UI
2. Go to **Stacks** > **Add Stack**
3. Name: `immich`
4. Build Method: **Web Editor**
5. Paste in the lastest release of [their compose.yaml](https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml) from Github.
6. A step required for Protainer is to replace any instance of `.env` with `stack.env`

__Be sure to checkout the [Portainer Steps](https://immich.app/docs/install/portainer) in their docs.__

### **Step 3: Configuration Adjustments**
1. Click on "Advanced Mode" in the Environment Variables section.
2. Copy and paste the content of [their example.env](https://github.com/immich-app/immich/releases/latest/download/example.env) into the editor.
3. Switch back to "Simple Mode".

2. **Mandatory Changes**:
   - Change `DB_PASSWORD` with a random string/strong password.
   - Verify all volume paths match the directories we created earlier.

3. **Optional**:
   - Learn more about using [External Libraries](https://immich.app/docs/features/libraries/).
   - Add [hardware transcoding](https://immich.app/docs/features/hardware-transcoding/#single-compose-file) to improve video transcoding preformace.
```yaml
   immich-server:
     container_name: immich_server
     image: ghcr.io/immich-app/immich-server:${IMMICH_VERSION:-release}
     devices:
       - /dev/dri:/dev/dri
     volumes:
     ...
```
   - To disable the machine learning container: Remove the entire `immich-machine-learning` section from the compose stack.
   - Setup [Hardware-Accelerated Machine Learning](https://immich.app/docs/features/ml-hardware-acceleration/#single-compose-file).
     - Intel Example:
```yaml
   immich-machine-learning:
     container_name: immich_machine_learning
     # Note the `-openvino` at the end
     image: ghcr.io/immich-app/immich-machine-learning:${IMMICH_VERSION:-release}-openvino
     device_cgroup_rules:
       - 'c 189:* rmw'
     devices:
       - /dev/dri:/dev/dri
     volumes:
       - /dev/bus/usb:/dev/bus/usb
```

### **Step 4: Deploy the Stack**
1. Click **Deploy the stack**
2. Wait 2-5 minutes for all containers to initialize
3. Check logs in Portainer if any containers fail to start

### **Step 5: Access Immich**
1. Open `http://your-server-ip:2283` in browser
2. Create admin account (first user becomes admin)
3. Configure settings:
   - **Library** > Add library path `/usr/src/app/photos`
   - **Machine Learning** > Enable facial recognition (if using ML container)
   - **Storage Template** > Configure backup location and make it [human readable](https://immich.app/docs/install/post-install#step-3---update-the-storage-template). [See more below..](/#why-storage-templates-are-awesome)

### **Step 6: Mobile App Setup**
1. Install Immich from [App Store](https://apps.apple.com/app/immich/id1613945652) or [Play Store](https://play.google.com/store/apps/details?id=app.immich)
2. Connect to your server:
   - Server URL: `http://your-server-ip:2283`
   - Use admin credentials
3. Enable auto-backup in app settings


### **Post-Installation Tasks**
1. **Reverse Proxy Setup (Recommended)**:
   - Setup NGINX Reverse Proxy Manager to give yourself a better ineral domain or external access. ([video guide](https://www.youtube.com/watch?v=79e6KBYcVmQ))
     - Domain: `photos.yourdomain.com`
     - Forward to `http://immich-server:2283`

2. **Backup Strategy**:
   - Regularly back up `~/docker/immich/data` (PostgreSQL database)
   - Use another backup tool or serivce to keep a copy of your data externally. I have a Proxmox Backup Server at my parents house for this.

### **Troubleshooting**
1. **Common Issues**:
   - **Port Conflicts**: Ensure ports 2283 (web) and 5432 (PostgreSQL) are available
   - **Permission Errors**: Verify volume permissions with `ls -l ~/docker/immich`
   - **ML Container Failing**: Try disabling GPU support or allocate more RAM

2. **Useful Commands**:
   ```bash
   # Check container logs
   docker logs immich_server

   # Reset admin password
   docker exec immich_server npm run reset-admin-password
   ```


### **Maintenance**
1. **Updates**:
   - Re-deploy stack in Portainer with updated image tags
   - Follow [Immich releases](https://github.com/immich-app/immich/releases)

2. **Storage Management**:
   - Monitor `~/docker/immich/library` growth
   - Set retention policies in Immich web UI

### **Why Storage Templates Are Awesome**
1. **Automated Sorting**:
   - Automatically sort photos/videos into folders based on metadata like **date, time, camera model, or custom tags**.
   - Example: Group all iPhone photos by year/month or separate DSLR shots by camera model.

2. **Flexibility**:
   - Use variables like `{{DATE}}`, `{{TIME}}`, `{{CAMERA}}`, or `{{FILENAME}}` to create dynamic paths.
   - Example template:
     ```plaintext
     /Photos/{{DATE:YYYY}}/{{DATE:MMMM}}-{{DATE:DD}}/{{CAMERA}}_{{DATE:HHmmss}}
     ```
     Generates: `/Photos/2024/July-15/Nikon-Z6_143045.jpg`

3. **Consistency**:
   - Eliminate manual folder creation—Immich handles it every time you upload.

4. **Future-Proof Backups**:
   - Structured folders make it easier to sync with cloud storage (e.g., Backblaze, S3) or external drives.

5. **Multi-User Support**:
   - Assign unique templates for different users (e.g., `/Family/Jane/{{DATE}}` vs. `/Family/John/{{DATE}}`).


#### **How to Set Up Storage Templates**
**Step 1: Access Storage Templates**
1. Log into your Immich web UI.
2. Go to **Settings** (gear icon) > **Storage Template**.

**Step 2: Build Your Template**
1. Use variables in the **Template** field. Supported variables include:
   ```plaintext
   {{DATE}}           # 2024-07-15
   {{DATE:YYYY}}      # 2024
   {{DATE:MMMM}}      # July
   {{TIME}}           # 14:30:45
   {{CAMERA}}         # Nikon Z6
   {{FILENAME}}       # IMG_1234.jpg
   {{USERNAME}}       # jane_doe
   ```

2. **Example Templates**:
   - **By Year/Month**:
     ```plaintext
     /Photos/{{DATE:YYYY}}/{{DATE:MMMM}}
     ```
   - **By Camera + Date**:
     ```plaintext
     /Photos/{{CAMERA}}/{{DATE:YYYY}}-{{DATE:MM}}-{{DATE:DD}}
     ```
   - **For Events**:
     ```plaintext
     /Events/{{ALBUM_NAME}}/{{DATE:YYYY}}
     ```

**Step 3: Apply the Template**
1. **For New Uploads**:
   - Enable **Apply template to new uploads** to auto-organize future media.

2. **For Existing Libraries**:
   - Go to **Library** > Select your library > **Re-run Storage Template**.
   - Immich will reorganize files according to the new rules.

**Step 4: Test and Refine**
1. Upload a test photo to verify the folder structure.
2. Tweak the template if needed (e.g., add `{{TIME}}` to avoid filename conflicts).
