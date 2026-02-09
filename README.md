# 🧹 PortCleaner CLI

Instantly kill stuck development servers and free your ports.

`portcleaner` is a lightweight CLI tool that scans your system for running development servers (Node, Bun, Deno, Python, Docker, etc.) and automatically releases the ports they are occupying.

No more:

```
EADDRINUSE: address already in use :::3000
```

📦 npm package: [https://www.npmjs.com/package/portcleaner](https://www.npmjs.com/package/portcleaner)

---

## Table of Contents

* [Why this exists](#why-this-exists)
* [Features](#features)
* [Supported Platforms](#supported-platforms)
* [Quick Install (Recommended)](#quick-install-recommended)
* [Manual Installation (For Contributors)](#manual-installation-for-contributors)
* [Usage](#usage)
* [Use inside your project](#use-inside-your-project)
* [Uninstall / Disable](#uninstall--disable)
* [Reinstall later](#reinstall-later)
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

Even after closing the terminal, the process keeps running in the background and blocks ports.

Developers repeatedly run:

```
lsof -i :3000
kill -9 <PID>
```

`portcleaner` automates this entire process.

---

## Features

* Detects active listening ports
* Finds development servers automatically
* Safely terminates only dev processes
* Does NOT affect OS system services
* Works globally from any directory
* One-command cleanup

---

## Supported Platforms

| OS                                 | Support      |
| ---------------------------------- | ------------ |
| macOS                              | Full support |
| Linux (Ubuntu, Debian, Arch, etc.) | Full support |
| Windows (WSL)                      | Supported    |
| Windows PowerShell / CMD           | Limited      |

### Windows users

Windows does not include the `lsof` utility by default.

Please run the tool inside:

* WSL (recommended)
* Git Bash

---

## Quick Install (Recommended)

Install globally from npm:

```
npm install -g portcleaner
```

Then run:

```
portcleaner
```

No configuration needed.

---

## Manual Installation (For Contributors)

If you cloned the repository:

```
git clone https://github.com/<your-username>/port_cleaner.git
cd port_cleaner
npm install
npm link
```

Now you can run:

```
portcleaner
```

---

## Usage

```
portcleaner
```

Example:

```
Scanning for running dev servers...

Found running servers:
• node on port 3000
• docker-proxy on port 5432

Cleaning ports...

Killed node on port 3000
Killed docker-proxy on port 5432

All development ports cleaned!
```

---

## Use inside your project

Automatically clean ports before starting your app.

Add to `package.json`:

```
"scripts": {
  "dev": "portcleaner && next dev"
}
```

or:

```
"scripts": {
  "dev": "portcleaner && nodemon src/index.js"
}
```

Now every time the project starts → ports are freed first.

---

## Uninstall / Disable

To remove the command from your system:

```
npm uninstall -g portcleaner
```

If installed via `npm link`:

```
npm unlink -g portcleaner
```

After uninstalling:

```
portcleaner
```

will no longer work.

---

## Reinstall later

You can enable it again anytime:

```
npm install -g portcleaner
```

The command will immediately start working again.

---

## Requirements

* Node.js 16 or newer
* macOS or Linux (native)
* Windows requires WSL or Git Bash

Check:

```
node -v
```

---

## How it works

Internally the CLI runs:

```
lsof -i -P -n | grep LISTEN
```

It filters development processes such as:

* node
* bun
* deno
* python
* docker
* docker-proxy

Then safely terminates them.

---

## Troubleshooting

### `portcleaner: command not found`

Restart terminal or reopen shell.

### Nothing was cleaned

Check if a port is actually in use:

```
lsof -i :3000
```

### Windows not working

Use WSL:

```
wsl
npm install -g portcleaner
portcleaner
```

---

## Contributing

Pull requests are welcome.

Ideas:

* port specific cleaning (`portcleaner 3000`)
* interactive mode
* skip database ports (5432, 27017)
* native Windows support

---

## License

[MIT](LICENSE)

---

## Author

Created and maintained by [Shubhashish Chakraborty](https://imshubh.site) <br/>
For any queries, reach out via email at shubhashish147@gmail.com. <br/>

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?logo=Twitter&logoColor=white)](https://twitter.com/__Shubhashish__)
[![GitHub](https://img.shields.io/badge/GitHub-%2312100E.svg?logo=github&logoColor=white)](https://github.com/Shubhashish-Chakraborty)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/shubhashish-chakraborty)