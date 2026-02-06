// ==================== commands/domination.js ====================
export default {
  name: 'domination',
  description: 'Ferme le groupe (Admins uniquement)',
  category: 'Administration',

  async execute(sock, m, args) {
    if (!m.isGroup) return;

    // Vérification si l'utilisateur est admin ou owner
    // Note: Basé sur ta logique de checkAdminOrOwner
    try {
      await sock.groupSettingUpdate(m.chat, 'announcement');

      const text = `
« 🌑 ━━━━━━━ SYSTEM ━━━━━━━ 🌑 »
         *D O M I N A T I O N*
« ━━━━━━━━━━━━━━━━━━━━━━━ »

> *“Taisez-vous. Le Monarque a pris sa décision.”*

Le groupe est désormais sous contrôle total. 
Seuls les administrateurs peuvent communiquer.

© MOMO-ZEN AI - 2026
`;

      await sock.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/jlnqs3.jpg" },
        caption: text
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      m.reply("Erreur : Je n'ai pas les permissions nécessaires pour dominer ce groupe.");
    }
  },
};
