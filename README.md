# 🧹 Clean Ports (cleanports CLI)

Kill stuck development servers instantly.

`cleanports` is a lightweight CLI tool that scans your system for running development servers (Node, Bun, Deno, Python, Docker proxies, etc.) and automatically frees the ports they are occupying.

No more:

```
EADDRINUSE: address already in use :::3000
```

---

## Why this exists

While developing, servers often **do not shut down properly**:

* Next.js / React dev servers
* Express / Fastify APIs
* Prisma / WebSocket servers
* Docker containers
* AI coding agents

Even after closing the terminal, the process keeps running in the background and blocks ports.

Developers then manually run:

```
lsof -i :3000
kill -9 <PID>
```

every single time.

This tool automates that.

---

## What it does

`cleanports` will:

• Scan all listening ports
• Detect development processes
• Kill only safe dev servers (NOT system services)
• Print what it cleaned

It intentionally **does not touch OS services** like WiFi, Bluetooth, AirDrop, SSH, etc.

---

## Supported Platforms

| OS                                 | Supported              |
| ---------------------------------- | ---------------------- |
| macOS                              | ✅ Full support         |
| Linux (Ubuntu, Debian, Arch, etc.) | ✅ Full support         |
| Windows (WSL)                      | ✅ Supported            |
| Native Windows CMD / PowerShell    | ⚠️ Limited (see below) |

### Important (Windows Users)

Windows does not provide the `lsof` command by default.

You must either:

**Recommended**
Use WSL (Windows Subsystem for Linux)

OR

Install Git Bash / MSYS2 and run the tool inside it.

This is a limitation of Windows itself, not Node.js.

---

## Installation

### Method 1 — Run directly from GitHub (local usage)

Clone the repository:

```
git clone https://github.com/<your-username>/clean-ports.git
cd clean-ports
```

Install dependencies (none, but required to register CLI):

```
npm install
```

Link the CLI globally:

```
npm link
```

Now the command becomes available everywhere:

```
cleanports
```

---

### Method 2 — After npm publish (future)

```
npx clean-ports
```

or

```
npm install -g clean-ports
```

---

## Usage

Simply run:

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

## How it works

The CLI internally executes:

```
lsof -i -P -n | grep LISTEN
```

Then filters only development processes:

* node
* bun
* deno
* python
* docker
* docker-proxy

and safely terminates them using `SIGKILL`.

---

## Recommended Workflow (Very Useful)

Add this to any project's `package.json`:

```
"scripts": {
  "dev": "cleanports && npm run start"
}
```

Now every time you start your project, ports will automatically be freed first.

---

## Requirements

* Node.js 16 or higher
* macOS or Linux (native support)
* Windows requires WSL or Git Bash

Check Node version:

```
node -v
```

---

## Safety

The tool **does NOT**:

* kill system daemons
* touch networking services
* close SSH sessions
* affect your OS

It only targets known development servers.

---

## Troubleshooting

### Command not found

After running `npm link`, restart terminal:

```
source ~/.zshrc
```

or reopen terminal.

---

### Permission denied (Linux/macOS)

Make the file executable:

```
chmod +x bin/cleanports.js
```

---

### Nothing happens

Ensure something is actually running:

```
lsof -i :3000
```

---

## Uninstall

```
npm unlink -g clean-ports
```

---

## Contributing

PRs are welcome.

Ideas:

* interactive mode
* port range filtering
* Windows native support
* skip database ports (5432, 27017)

---

## License

MIT

---

## Author

Shubhashish Chakraborty
