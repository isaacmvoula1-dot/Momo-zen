// ==================== commands/repo.js ====================
export default {
  name: 'repo',
  alias: ['github', 'source', 'momo'],
  description: 'Affiche le dépôt source du système MOMO-ZEN',
  category: 'GÉNÉRAL',

  run: async (sock, m) => {
    try {
      const chatId = m.chat;

      const repoMsg = `
+---------------------------------------+
|       ARCHIVES DU SYSTÈME             |
+---------------------------------------+
|                                       |
| 📂 PROJET : MOMO-ZEN AI               |
| 🔗 SOURCE : github.com/Momozen1/Momo-zen
|                                       |
| "LE CODE EST LA SEULE VÉRITÉ DANS     |
| CETTE MATRICE. EXPLORE-LE."           |
|                                       |
+---------------------------------------+
| 👑 PROPRIÉTAIRE : MOMO                |
+---------------------------------------+
STATUT : ACCÈS AUTORISÉ`;

      await sock.sendMessage(chatId, { 
        image: { url: "https://files.catbox.moe/v7zea2.jpg" }, // Ta nouvelle photo
        caption: repoMsg 
      }, { quoted: m });

    } catch (err) {
      console.error('❌ Erreur Repo:', err);
    }
  }
};
