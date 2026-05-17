/**
 * Firstbrain Prompt Surgeon
 * A surgical tool to organize, categorize and standardize prompts.
 * Eliminates duplicates and follows strict naming conventions.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const PROMPTS_ROOT = path.join(process.cwd(), '03 - Resources', 'Prompts');

const CATEGORY_MAP = {
  'alltag-leben': 'Alltag & Leben',
  'beruf-karriere': 'Beruf & Karriere',
  'bildbearbeitung-visualisierung': 'Bild & Visualisierung',
  'bild-visualisierung': 'Bild & Visualisierung',
  'bildbearbeitung-&-visualisierung': 'Bild & Visualisierung',
  'bildbearbeitung-&-ki-visualisierung': 'Bild & Visualisierung',
  'gesundheit-wohlbefinden': 'Gesundheit & Wohlbefinden',
  'kommunikation-beziehungen': 'Kommunikation & Beziehungen',
  'kreativitaet-freizeit': 'Kreativität & Freizeit',
  'kreativ-freizeit': 'Kreativität & Freizeit',
  'lernen-wachstum': 'Lernen & Wachstum',
  'spezielle-situationen': 'Spezielle Situationen',
  'technik-alltag': 'Technik im Alltag',
  'technik-&-alltag': 'Technik im Alltag',
  'professionell-&-business': 'Beruf & Karriere',
  'pro': 'Beruf & Karriere'
};

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.resolve(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

function standardizeTitle(title) {
  // Remove numeric prefixes like "1802-", "2049-"
  let clean = title.replace(/^\d+-/, '');
  // Replace dashes with spaces and capitalize
  clean = clean.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return clean.trim();
}

async function sortPrompts() {
  console.log('--- Prompt Surgery Starting (Deep Clean) ---');
  const files = getFiles(PROMPTS_ROOT);
  let movedCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  files.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);
      
      // 1. Identify current category and target category
      let internalCategory = null;
      const catMatch = content.match(/kategorie:\s*"(.*)"/);
      if (catMatch) internalCategory = catMatch[1];

      const parentDir = path.basename(path.dirname(filePath));
      const targetCategory = CATEGORY_MAP[parentDir.toLowerCase()] || 
                             CATEGORY_MAP[internalCategory?.toLowerCase().replace(/\s+/g, '-')] || 
                             internalCategory || 
                             parentDir;

      // 2. Standardize name
      const nameOnly = fileName.replace(/^Prompt -- /, '').replace(/\.md$/, '');
      const standardName = standardizeTitle(nameOnly);
      const newFileName = `Prompt -- ${standardName}.md`;
      
      const targetDir = path.join(PROMPTS_ROOT, targetCategory);
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

      // 3. Update internal category if needed
      if (internalCategory !== targetCategory && catMatch) {
        content = content.replace(/kategorie:\s*".*"/, `kategorie: "${targetCategory}"`);
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
      }

      const targetPath = path.join(targetDir, newFileName);

      // 4. Move file
      if (filePath !== targetPath) {
        if (fs.existsSync(targetPath)) {
          // Resolve collision with (Alt)
          const collisionName = `Prompt -- ${standardName} (${Math.random().toString(36).substring(7)}).md`;
          fs.renameSync(filePath, path.join(targetDir, collisionName));
        } else {
          fs.renameSync(filePath, targetPath);
        }
        movedCount++;
      }
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
      errorCount++;
    }
  });

  // Aggressive empty folder cleanup
  const cleanEmpty = (dir) => {
    const list = fs.readdirSync(dir);
    list.forEach(item => {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        cleanEmpty(fullPath);
        if (fs.readdirSync(fullPath).length === 0) {
          fs.rmdirSync(fullPath);
        }
      }
    });
  };
  cleanEmpty(PROMPTS_ROOT);

  console.log(`\nSurgery complete!`);
  console.log(`Moved: ${movedCount} | Updated internal: ${updatedCount} | Errors: ${errorCount}`);
}

sortPrompts();
