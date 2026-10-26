/* ==========================================================
   Galeria: the photos in the 3D gallery
   Only photos of people (cuts and barbers). Portrait photos look best.
   - title / subtitle: shown on the photo in front
   - tag: small label in the top corner (e.g. "#Fade")
   - text: one short line
   - cta is optional: { label, href }. Defaults to booking on Booksy.
   Repeating photos is fine; the gallery loops.
   ========================================================== */
window.SITE_GALLERY = [
  {
    image: "assets/images/gallery/corte-01.webp",
    alt: "Cabelo encaracolado com fade baixo, feito na 2685 Finest",
    tag: "#Fade",
    title: "Low fade",
    subtitle: "Encaracolado",
    text: "Fade baixo, volume em cima e acabamento à tesoura."
  },
  {
    image: "assets/images/team/simoes.webp",
    alt: "Simões, barbeiro da 2685 Finest",
    tag: "#Equipa",
    title: "Simões",
    subtitle: "Barbeiro",
    text: "Na cadeira da 2685 há 3 anos.",
    cta: { label: "Marcar com o Simões", href: "https://booksy.com/pt-pt/1257_2685-finest-barbearia_barbearia_166404_sacavem/staffer/9337" }
  },
  {
    image: "assets/images/gallery/corte-02.webp",
    alt: "Buzz cut com fade e linhas marcadas, feito na 2685 Finest",
    tag: "#Design",
    title: "Buzz cut",
    subtitle: "Com linhas",
    text: "Máquina rente, degradê e linhas marcadas à navalha."
  },
  {
    image: "assets/images/team/ricardo.webp",
    alt: "Ricardo, barbeiro da 2685 Finest",
    tag: "#Equipa",
    title: "Ricardo",
    subtitle: "Barbeiro",
    text: "Na cadeira da 2685 há 3 anos.",
    cta: { label: "Marcar com o Ricardo", href: "https://booksy.com/pt-pt/1257_2685-finest-barbearia_barbearia_166404_sacavem/staffer/13220" }
  },
  {
    image: "assets/images/gallery/corte-01.webp",
    alt: "",
    tag: "#Fade",
    title: "Low fade",
    subtitle: "Encaracolado",
    text: "Fade baixo, volume em cima e acabamento à tesoura."
  },
  {
    image: "assets/images/gallery/corte-02.webp",
    alt: "",
    tag: "#Design",
    title: "Buzz cut",
    subtitle: "Com linhas",
    text: "Máquina rente, degradê e linhas marcadas à navalha."
  }
];
