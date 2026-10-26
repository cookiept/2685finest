/* ==========================================================
   Site configuration: edit these values, no other code needed.
   ========================================================== */
window.SITE_CONFIG = {
  // WhatsApp number in international format, digits only (e.g. "351912345678").
  // Leave empty to disable: the contact form then falls back to Booksy.
  whatsapp: "351927266234",

  // Opening hours, used for the "Aberto agora" line at the top. 0 = Sunday ... 6 = Saturday.
  // Each day is [open, close] in 24h "HH:MM", or null when closed.
  hours: {
    0: null,
    1: ["09:00", "20:00"], 2: ["09:00", "20:00"], 3: ["09:00", "20:00"],
    4: ["09:00", "20:00"], 5: ["09:00", "20:00"],
    6: ["08:00", "18:00"]
  },

  booksy: "https://booksy.com/pt-pt/1257_2685-finest-barbearia_barbearia_166404_sacavem",
  instagram: "https://www.instagram.com/2685finest_simoes.barberhouse/"
};
