import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcApp = path.join(root, 'src', 'app');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.name.endsWith('.component.ts')) {
      files.push(full);
    }
  }
  return files;
}

function extractBacktickBlock(source, propName) {
  const marker = `${propName}: \``;
  const start = source.indexOf(marker);
  if (start === -1) {
    return null;
  }

  let i = start + marker.length;
  let content = '';

  while (i < source.length) {
    const char = source[i];
    if (char === '`') {
      const next = source[i + 1];
      if (next === ',' || next === '\n' || next === '\r') {
        return { content, start, end: i + 1 };
      }
    }
    content += char;
    i += 1;
  }

  return null;
}

function trimTemplate(content) {
  if (content.startsWith('\n')) {
    content = content.slice(1);
  }
  if (content.endsWith('\n')) {
    content = content.slice(0, -1);
  }
  return content;
}

function trimStyles(content) {
  return trimTemplate(content);
}

function refactorComponent(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const templateBlock = extractBacktickBlock(source, 'template');
  if (!templateBlock) {
    return false;
  }

  const stylesBlock = extractBacktickBlock(source, 'styles');
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, '.component.ts');
  const htmlPath = path.join(dir, `${base}.component.html`);
  const scssPath = path.join(dir, `${base}.component.scss`);

  const template = trimTemplate(templateBlock.content);
  fs.writeFileSync(htmlPath, `${template}\n`);

  let newSource = source;

  const templateReplacement = `templateUrl: './${base}.component.html'`;
  newSource =
    newSource.slice(0, templateBlock.start) +
    templateReplacement +
    newSource.slice(templateBlock.end);

  if (stylesBlock) {
    const styles = trimStyles(stylesBlock.content);
    fs.writeFileSync(scssPath, `${styles}\n`);

    const adjustedStylesBlock = extractBacktickBlock(newSource, 'styles');
    if (adjustedStylesBlock) {
      const stylesReplacement = `styleUrl: './${base}.component.scss'`;
      newSource =
        newSource.slice(0, adjustedStylesBlock.start) +
        stylesReplacement +
        newSource.slice(adjustedStylesBlock.end);
    }
  }

  fs.writeFileSync(filePath, newSource);
  console.log(`Refactored ${path.relative(root, filePath)}`);
  return true;
}

const files = walk(srcApp);
let count = 0;

for (const file of files) {
  if (refactorComponent(file)) {
    count += 1;
  }
}

console.log(`Done. Refactored ${count} component(s).`);
