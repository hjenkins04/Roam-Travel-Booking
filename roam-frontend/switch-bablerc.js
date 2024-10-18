const fs = require('fs');
const path = require('path');

// Function to rename files
function renameFileIfExists(originalName, newName) {
  if (fs.existsSync(originalName)) {
    fs.renameSync(originalName, newName);
    console.log(`Renamed ${originalName} to ${newName}`);
  }
}

// Check if running a Next.js command or a Jest test command
const isNextCommand = process.argv.includes('next');
const isTestCommand = process.argv.includes('jest');

// Before running a Next.js command, rename `.bablerc` to `._bablerc`
if (isNextCommand) {
  renameFileIfExists('.bablerc', '._bablerc');
}

// Before running a Jest test command, rename `._bablerc` to `.bablerc`
if (isTestCommand) {
  renameFileIfExists('._bablerc', '.bablerc');
}

// Determine the command to run
const { spawn } = require('child_process');
const command = isTestCommand ? 'npx' : process.argv[2];
const args = isTestCommand ? ['jest', ...process.argv.slice(3)] : process.argv.slice(3);

// Execute the original command
const child = spawn(command, args, { stdio: 'inherit', shell: true });

child.on('close', (code) => {
  process.exit(code);
});
