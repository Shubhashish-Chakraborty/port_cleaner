#!/usr/bin/env node

const { execSync } = require("child_process");

console.log("🔍 Scanning for running dev servers...\n");

try {
  const output = execSync("lsof -i -P -n | grep LISTEN", {
    encoding: "utf8",
  });

  const lines = output.split("\n");

  const targets = [];

  lines.forEach((line) => {
    if (!line.trim()) return;

    const parts = line.trim().split(/\s+/);
    const command = parts[0];
    const pid = parts[1];
    const portMatch = line.match(/:(\d+)\s/);

    if (!portMatch) return;
    const port = portMatch[1];

    // Only kill development servers
    const allowedProcesses = [
      "node",
      "bun",
      "deno",
      "docker",
      "docker-proxy",
      "python",
      "python3",
    ];

    if (allowedProcesses.includes(command)) {
      targets.push({ pid, port, command });
    }
  });

  if (targets.length === 0) {
    console.log("✅ No dev servers found. All ports clean.\n");
    process.exit(0);
  }

  console.log("⚠️ Found running servers:\n");

  targets.forEach((t) => {
    console.log(`• ${t.command} running on port ${t.port} (PID ${t.pid})`);
  });

  console.log("\n🧹 Cleaning ports...\n");

  targets.forEach((t) => {
    try {
      process.kill(t.pid, "SIGKILL");
      console.log(`✅ Killed ${t.command} on port ${t.port}`);
    } catch (err) {
      console.log(`⚠️ Could not kill PID ${t.pid}`);
    }
  });

  console.log("\n🎉 All development ports cleaned!\n");

} catch (err) {
  console.log("✅ No listening processes found.");
}
