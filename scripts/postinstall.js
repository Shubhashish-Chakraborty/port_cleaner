const { execSync } = require("child_process");
const os = require("os");

console.log("\n🔧 Setting up cleanports...\n");

try {
    const platform = os.platform();

    if (platform === "win32") {
        console.log("⚠️ Windows detected.");
        console.log("cleanports works best inside WSL or Git Bash.\n");
    }

    if (platform === "darwin" || platform === "linux") {
        execSync("chmod +x ./bin/cleanports.js");
    }

    console.log("✅ cleanports installed successfully!\n");
    console.log("You can now run:");
    console.log("   cleanports\n");

} catch (err) {
    console.log("⚠️ Setup finished with minor warnings.");
}
