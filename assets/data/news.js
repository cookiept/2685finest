/* ==========================================================
   Novidades da casa: the banners in the news carousel
   Edit this list to update the news on the homepage.

   - theme: how the banner is drawn
       "green" : shop-green background, white text, illustration on the right
       "light" : pale green background, dark text, illustration on the right
       "photo" : the image fills the banner, text on top of it
       "hiring": a paper job ad with a stamp and tear-off tabs (set tabs to the phone number)
       "gym"   : a gym chalkboard; list holds the "treino do dia" rows as [name, value]
   - image: the frog for this banner (assets/images/brand/frog-*.webp or sticker-sacavem.webp),
            or a photo when theme is "photo".
   - banner: OPTIONAL. A finished banner image (e.g. made in Canva, about 2400x1000).
             If set, it replaces the drawn banner; title + text are still used as its description.
   - cta is optional: { label, href }.
   - tabs is optional (hiring theme): the text printed on each tear-off tab.
   - list is optional: rows of [name, value], drawn in chalk on the gym board.
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
    title: "Site novo. Fala connosco pelo WhatsApp.",
    text: "Serviços, preços e barbeiros num só sítio, e uma mensagem direta para a barbearia.",
    theme: "green",
    image: "assets/images/brand/frog-lounging.webp",
    cta: { label: "Falar connosco", href: "#contacto" }
  },
  {
    tag: "Marcações",
    date: "24 horas por dia",
    title: "Marca no Booksy, a qualquer hora.",
    text: "Escolhe o barbeiro, o serviço e a hora em menos de um minuto.",
    theme: "light",
    image: "assets/images/brand/frog-standing.webp",
    cta: { label: "Marcar agora", href: "https://booksy.com/pt-pt/1257_2685-finest-barbearia_barbearia_166404_sacavem" }
  },
  {
    tag: "Ritual",
    date: "Na carta",
    title: "Barba Hot Towel com massagem.",
    text: "Toalha quente, navalha e massagem incluída. 11€ sozinha, ou 23€ com skinfade.",
    theme: "green",
    image: "assets/images/brand/frog-cigar.webp",
    cta: { label: "Ver preços", href: "#servicos" }
  },
  {
    tag: "Clientes da casa",
    date: "",
    title: "Quem volta, ganha.",
    text: "Temos programa de fidelização. Pergunta na tua próxima visita como funciona.",
    theme: "light",
    image: "assets/images/brand/sticker-sacavem.webp",
    cta: { label: "Ver horário", href: "#contacto" }
  }
];
