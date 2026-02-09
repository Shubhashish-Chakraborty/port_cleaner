# 🧹 Clean Ports (cleanports CLI)

Instantly kill stuck development servers and free your ports.

`cleanports` is a lightweight CLI tool that scans your system for running development servers (Node, Bun, Deno, Python, Docker proxies, etc.) and automatically releases the ports they are occupying.

No more:

```
EADDRINUSE: address already in use :::3000
```

---

## 📚 Table of Contents

* [Why this exists](#why-this-exists)
* [Features](#features)
* [Supported Platforms](#supported-platforms)
* [Quick Install (Automatic - Recommended)](#quick-install-automatic-recommended)
* [Manual Installation (Local Development)](#manual-installation-local-development)
* [Usage](#usage)
* [Add to your project workflow](#add-to-your-project-workflow)
* [Uninstall / Disable cleanports](#uninstall--disable-cleanports)
* [Re-enable later](#re-enable-later)
* [Requirements](#requirements)
* [How it works](#how-it-works)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)

---

## Why this exists

During development, servers often **do not shut down properly**:

* Next.js / React dev servers
* Express / Fastify APIs
* Prisma / WebSocket servers
* Docker containers
* AI coding agents

Even after closing the terminal, the process continues running in the background and blocks ports.

Developers repeatedly run:

```
lsof -i :3000
kill -9 <PID>
```

This tool automates that entire process.

---

## ✨ Features

* Detects active listening ports
* Finds development servers automatically
* Safely terminates only dev processes
* Does NOT affect OS system services
* Works globally from any directory
* One-command cleanup

---

## 💻 Supported Platforms

| OS                                 | Support        |
| ---------------------------------- | -------------- |
| macOS                              | ✅ Full support |
| Linux (Ubuntu, Debian, Arch, etc.) | ✅ Full support |
| Windows (WSL)                      | ✅ Supported    |
| Windows (PowerShell / CMD native)  | ⚠️ Limited     |

### Important for Windows users

Windows does not include the `lsof` utility.
Please run this tool inside:

* WSL (recommended)
* Git Bash

---

## 🚀 Quick Install (Automatic — Recommended)

This is the **normal user method**.

```
npm install -g clean-ports
```

After installation, simply run:

```
cleanports
```

That’s it. No linking. No configuration.

The installer automatically:

* registers the CLI command
* grants permissions
* verifies environment

---

## 🛠 Manual Installation (Local Development)

Use this if you cloned the repository.

```
git clone https://github.com/<your-username>/clean-ports.git
cd clean-ports
npm install
npm link
```

Now the command works globally:

```
cleanports
```

---

## ▶️ Usage

Run:

```
cleanports
```

Example output:

```
🔍 Scanning for running dev servers...

⚠️ Found running servers:

• node running on port 3000 (PID 5542)
• docker-proxy running on port 5432 (PID 8821)

🧹 Cleaning ports...

❌ Killed node on port 3000
❌ Killed docker-proxy on port 5432

🎉 All development ports cleaned!
```

---

## 🔁 Add to your project workflow

You can automatically clean ports before starting your app.

Add inside any project's `package.json`:

```
"scripts": {
  "dev": "cleanports && npm run start"
}
```

or for Next.js:

```
"dev": "cleanports && next dev"
```

Now every time your project starts → ports are cleaned first.

---

## ❌ Uninstall / Disable cleanports

If you no longer want the `cleanports` command on your system:

### If installed globally (recommended install)

```
npm uninstall -g clean-ports
```

### If installed via `npm link`

Inside the project folder:

```
npm unlink -g clean-ports
```

After uninstalling, running:

```
cleanports
```

will no longer work.

---

## 🔄 Re-enable later

You can always reinstall:

```
npm install -g clean-ports
```

The command will immediately start working again.

---

## 📦 Requirements

* Node.js v16 or newer
* macOS or Linux (native support)
* Windows requires WSL or Git Bash

Check Node version:

```
node -v
```

---

## ⚙️ How it works

The CLI internally runs:

```
lsof -i -P -n | grep LISTEN
```

It filters only known development processes:

* node
* bun
* deno
* python
* docker
* docker-proxy

Then safely terminates them using system signals.

---

## 🧯 Troubleshooting

### `cleanports: command not found`

Restart terminal or run:

```
source ~/.zshrc
```

---

### Permission denied

```
chmod +x bin/cleanports.js
```

---

### Nothing was killed

Verify something is actually using a port:

```
lsof -i :3000
```

---

## 🤝 Contributing

Pull requests are welcome.

Possible improvements:

* interactive confirmation mode
* port range filtering
* Windows native support
* database port exclusions (5432, 27017)

---

## 📄 License

MIT

---

## 👨‍💻 Author

Shubhashish Chakraborty
