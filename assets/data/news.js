/* ==========================================================
   Novidades da casa: the banners in the news card stack
   Edit this list to update the news on the homepage.

   - theme: how the banner is drawn. Each one is a real object:
       "hiring"  : a paper job ad with a rubber stamp and tear-off phone tabs
       "gym"     : a gym chalkboard with the "treino do dia" in chalk
       "chat"    : a phone with a WhatsApp-style conversation
       "ticket"  : a paper ticket with a perforated stub
       "neon"    : a neon sign glowing on a dark brick wall
       "loyalty" : a kraft loyalty card with frog stamps
       "green" / "light" / "photo" : plain banners (photo fills the banner)
   - image: the frog for this banner (assets/images/brand/frog-*.webp), or a photo for "photo".
   - banner: OPTIONAL. A finished banner image (about 2400x1000) that replaces the drawn one.
   - cta is optional: { label, href }.
   Extras, only for the theme that uses them:
   - stamp: text on the rubber stamp (hiring)
   - tabs: text on each tear-off tab, usually the phone number (hiring)
   - list: rows of [name, value] written in chalk (gym)
   - chat: lines of ["in" | "out", text] shown on the phone (chat)
   - stub: { big, small } printed on the ticket stub (ticket)
   - stamps: { total, filled } boxes on the loyalty card (loyalty)
   ========================================================== */
window.SITE_NEWS = [
  {
    tag: "Recrutamento",
    date: "Sacavém",
    title: "Estamos a recrutar!",
    text: "Procuramos barbeiro com mão firme, fades em dia e bom feitio. Traz o teu CV, ou melhor ainda, o teu melhor corte.",
    theme: "hiring",
    image: "assets/images/brand/frog-cv.webp",
    alt: "O sapo da 2685 Finest, de coroa, com o currículo na mão a apontar para ti",
    stamp: "Vaga aberta",
    tabs: "927 266 234",
    cta: { label: "Quero a vaga", href: "#contacto" }
  },
  {
    tag: "Parceria",
    date: "Tonik Sacavém",
    title: "Treina na Tonik. Corta na 2685.",
    text: "Somos parceiros do ginásio Tonik Sacavém. Pergunta pelas vantagens na tua próxima visita.",
    theme: "gym",
    image: "assets/images/brand/frog-gym.webp",
    alt: "O sapo da 2685 Finest com a t-shirt da Tonik, a levantar uma barra de pesos",
    list: [["Agachamento", "4×8"], ["Supino", "3×10"], ["Skinfade", "1× ✓"]],
    cta: { label: "Saber mais", href: "#contacto" }
  },
  {
    tag: "Novo",
    date: "Outubro 2026",
    title: "Site novo. Fala connosco.",
    text: "Serviços, preços e barbeiros num só sítio, e uma mensagem direta para a barbearia pelo WhatsApp.",
    theme: "chat",
    image: "assets/images/brand/frog-lounging.webp",
    chat: [["in", "Olá! Vi o site novo 👀"], ["out", "Bem-vindo à 2685! 🐸"], ["in", "Têm vaga sábado de manhã?"], ["out", "Temos às 10h. Marcamos?"]],
    cta: { label: "Falar connosco", href: "#contacto" }
  },
  {
    tag: "Marcações",
    date: "Booksy",
    title: "Marca a qualquer hora.",
    text: "Escolhe o barbeiro, o serviço e a hora em menos de um minuto. Até às 3 da manhã.",
    theme: "ticket",
    image: "assets/images/brand/frog-standing.webp",
    stub: { big: "24/7", small: "Admite 1 sapo" },
    cta: { label: "Marcar agora", href: "https://booksy.com/pt-pt/1257_2685-finest-barbearia_barbearia_166404_sacavem" }
  },
  {
    tag: "Ritual",
    date: "Na carta",
    title: "Hot Towel",
    text: "Toalha quente, navalha e massagem incluída. 11€ sozinha, ou 23€ com skinfade.",
    theme: "neon",
    image: "assets/images/brand/frog-cigar.webp",
    cta: { label: "Ver preços", href: "#servicos" }
  },
  {
    tag: "Clientes da casa",
    date: "",
    title: "Quem volta, ganha.",
    text: "Temos programa de fidelização. Pergunta na tua próxima visita como funciona.",
    theme: "loyalty",
    stamps: { total: 8, filled: 5 },
    cta: { label: "Ver horário", href: "#contacto" }
  }
];
