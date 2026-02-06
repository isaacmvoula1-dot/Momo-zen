// ==================== commands/prefix.js ====================
import config from '../config.js';

export default {
  name: 'prefix',
  alias: ['setprefix', 'pref'],
  description: 'Change ou affiche le préfixe du système MOMO-ZEN',
  category: 'OWNER',

  run: async (sock, m, args) => {
    try {
      const chatId = m.chat;
      const currentPrefix = global.PREFIX || config.PREFIX;

      // 1. Si aucun argument, on affiche le préfixe actuel
      if (!args[0]) {
        return sock.sendMessage(chatId, {
          text: `🔧 *CONFIGURATION SYSTÈME*\n━━━━━━━━━━━━━━━━━━\n➡️ Préfixe actuel : [ ${currentPrefix} ]\n\n💡 Pour changer : .prefix <nouveau>`,
        });
      }

      // 2. Sécurité : Seul MOMO (owner) peut changer la racine du système
      // Tu peux ajouter ici une vérification stricte par numéro si besoin
      if (!m.fromMe && m.sender !== config.ownerNumber) { 
         // Optionnel : décommente si tu veux limiter à ton numéro
      }

      const newPrefix = args[0]; // On prend le premier argument

      // 3. Mise à jour immédiate pour le handler.js
      global.PREFIX = newPrefix;

      // 4. Message de confirmation avec ton style
      const confirmMsg = `
+---------------------------------------+
|       MUTATION DU PRÉFIXE             |
+---------------------------------------+
|                                       |
| ANCIEN : ${currentPrefix}                      |
| NOUVEAU : ${newPrefix}                      |
|                                       |
| "MOMO A REPROGRAMMÉ L'ACCÈS           |
| À LA MATRICE DU BOT."                 |
|                                       |
+---------------------------------------+
STATUT : RÉINITIALISATION DU FLUX`;

      await sock.sendMessage(chatId, { 
        image: { url: "https://files.catbox.moe/smaa9g.jpg" }, 
        caption: confirmMsg 
      });

    } catch (err) {
      console.error('❌ Erreur changement préfixe:', err);
      await sock.sendMessage(m.chat, { text: '❌ Erreur lors de la mutation du préfixe.' });
    }
  }
};
