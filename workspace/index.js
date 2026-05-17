/**
 * Firstbrain CLI Wrapper
 * Provides a central entry point for agent skills.
 */
'use strict';

const { scan, scanWithEmbeddings } = require('./.agents/skills/scan/scanner.cjs');
const path = require('path');

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  const vaultRoot = process.cwd();

  switch (command) {
    case 'scan':
      console.log('--- Starting Vault Scan ---');
      const full = args.includes('--full');
      const verbose = args.includes('--verbose');
      const result = await scanWithEmbeddings(vaultRoot, { full, verbose });
      
      if (result.error) {
        console.error('Scan failed:', result.error);
        process.exit(1);
      }

      console.log(`Done! Scanned ${result.total} files in ${result.elapsed}ms.`);
      console.log(`Changes: +${result.added} | ~${result.modified} | -${result.deleted}`);
      if (result.embedding && !result.embedding.skipped) {
        console.log(`Embeddings: ${result.embedding.total} total (${result.embedding.embedded} updated).`);
      }
      break;

    case 'help':
    default:
      console.log('Firstbrain CLI');
      console.log('Usage: node index.js [command]');
      console.log('\nAvailable commands:');
      console.log('  scan [--full] [--verbose]   Update vault indexes and embeddings');
      break;
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
