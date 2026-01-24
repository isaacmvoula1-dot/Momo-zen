// ================= system/botAssets.js =================
import fs from 'fs';
import path from 'path';

// ===================== BOT CORE =====================

// Bot version
export const BOT_VERSION = '2';

// Bot slogan
export const BOT_SLOGAN = '> MADE BY MOMO';

// Default bot image (URL)
let botImagePath = 'https://files.catbox.moe/ucj8pa.jpg';

// File to persist bot name
const botNameFile = path.join(process.cwd(), 'system', 'botName.json');

// Default bot name (exported)
export let BOT_NAME = '𓊈 MOMO ZEN 𓊉';

// Load saved bot name if exists (optional dynamic)
if (fs.existsSync(botNameFile)) {
  try {
    const data = JSON.parse(fs.readFileSync(botNameFile, 'utf-8'));
    if (data?.name) BOT_NAME = data.name;
  } catch (e) {
    console.error('❌ Failed to load bot name:', e);
  }
}

// ===================== BOT NAME HELPERS =====================

// Getter (recommended)
export function getBotName() {
  return BOT_NAME;
}

// Setter (optional)
export function setBotName(name) {
  BOT_NAME = name;
  fs.writeFileSync(botNameFile, JSON.stringify({ name }, null, 2));
}

// ===================== BOT IMAGE =====================

export function getBotImage() {
  const customPath = path.join(process.cwd(), 'system', 'customBotImage.jpg');
  if (fs.existsSync(customPath)) return customPath;
  return botImagePath;
}

export function setBotImage(buffer) {
  const customPath = path.join(process.cwd(), 'system', 'customBotImage.jpg');
  fs.writeFileSync(customPath, buffer);
}

// ===================== CONNECTION MESSAGE =====================

export function connectionMessage() {
  return `
╭─❖ ${BOT_NAME} ❖─╮
│ ${BOT_NAME} CONNECTED
│
│ ⏱️ Date & Time : ${new Date().toLocaleString()}
│
│ 🛠️ Verion : ${BOT_VERSION}
╰────────────────╯
`;
}