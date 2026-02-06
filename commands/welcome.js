// ==================== commands/welcome.js ====================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WELCOME_FILE = path.join(__dirname, '../data/welcome.json');

// --- Gestion des données ---
const loadWelcomeData = () => {
  try {
    if (!fs.existsSync(path.dirname(WELCOME_FILE))) fs.mkdirSync(path.dirname(WELCOME_FILE), { recursive: true });
    if (!fs.existsSync(WELCOME_FILE)) fs.writeFileSync(WELCOME_FILE, JSON.stringify({}));
    return JSON.parse(fs.readFileSync(WELCOME_FILE, 'utf8'));
  } catch { return {}; }
};

const saveWelcomeData = (data) => fs.writeFileSync(WELCOME_FILE, JSON.stringify(data, null, 2));

export default {
  name: 'welcome',
  alias: ['bienvenue', 'wel'],
  description: 'Gère les arrivées dans le donjon',
  category: 'Groupe',

  run: async (sock, m, args) => {
    try {
      const chatId = m.chat;
      const welcomeData = loadWelcomeData();

      // Vérification Admin/Owner simplifiée pour ton handler
      const groupMetadata = await sock.groupMetadata(chatId);
      const user = groupMetadata.participants.find(p => p.id === m.sender);
      if (!(user?.admin || m.fromMe)) {
        return sock.sendMessage(chatId, { text: "🚫 Seul le Monarque ou un Admin peut configurer le Welcome." });
      }

      if (!args.length) {
        return sock.sendMessage(chatId, {
          text: `
+---------------------------------------+
|        SYSTÈME : BIENVENUE            |
+---------------------------------------+
|                                       |
| • .welcome on  -> Activer ici         |
| • .welcome off -> Désactiver ici      |
| • .welcome status -> Voir l'état      |
|                                       |
+---------------------------------------+
COMMANDE SIGNÉE MOMO 2026`.trim()
        });
      }

      const subCmd = args[0].toLowerCase();

      if (subCmd === 'on') {
        welcomeData[chatId] = true;
        saveWelcomeData(welcomeData);
        return sock.sendMessage(chatId, { text: '✅ [SYSTÈME] : Protocole de bienvenue activé dans ce donjon.' });
      }

      if (subCmd === 'off') {
        delete welcomeData[chatId];
        saveWelcomeData(welcomeData);
        return sock.sendMessage(chatId, { text: '❌ [SYSTÈME] : Protocole de bienvenue désactivé.' });
      }

      if (subCmd === 'status') {
        const status = welcomeData[chatId] ? 'ACTIF 🟢' : 'INACTIF 🔴';
        return sock.sendMessage(chatId, { text: `📊 STATUT WELCOME : ${status}` });
      }

    } catch (err) {
      console.error('❌ Erreur Welcome:', err);
    }
  },

  // Appelé par handleParticipantUpdate dans ton handler.js (Ligne 161)
  participantUpdate: async (sock, update) => {
    try {
      if (update.action !== 'add') return;

      const welcomeData = loadWelcomeData();
      const chatId = update.id;

      if (!welcomeData[chatId]) return;

      const metadata = await sock.groupMetadata(chatId);
      
      for (const participant of update.participants) {
        const userJid = participant;
        const username = '@' + userJid.split('@')[0];

        // Récupération Photo de profil ou image MOMO par défaut
        let ppUrl;
        try {
          ppUrl = await sock.profilePictureUrl(userJid, 'image');
        } catch {
          ppUrl = 'https://files.catbox.moe/iw4tzb.jpg'; 
        }

        const welcomeText = `
+---------------------------------------+
|       NOUVELLE OMBRE DÉTECTÉE         |
+---------------------------------------+

👤 Chasseur : ${username}
🏰 Donjon   : *${metadata.subject}*
👥 Rang     : #${metadata.participants.length}

"MOMO T'OBSERVE. RESPECTE LES RÈGLES
OU TU SERAS PURGÉ SANS PRÉAVIS."

⚔️ SURVIS. PROGRESSE. DOMINE.
+---------------------------------------+`;

        await sock.sendMessage(chatId, {
          image: { url: ppUrl },
          caption: welcomeText,
          mentions: [userJid]
        });
      }
    } catch (err) {
      console.error('❌ Welcome Update Error:', err);
    }
  }
};
