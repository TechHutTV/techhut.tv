/**
 * Author data consolidated from techhut.tv/data/authors/
 * Images are located at /docs-static/img/authors/
 */

export const authors = {
  "Brandon Hopkins": {
    name: "Brandon Hopkins",
    image: "/docs-static/img/authors/brandon.jpeg",
    bio: "Founder - homelabs, self-hosting, and Linux distros.",
    role: "team",
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/hopki" },
      { platform: "twitter", url: "https://x.com/TechHutTV" },
      { platform: "instagram", url: "https://instagram.com/brandonhopkins" },
      { platform: "medium", url: "https://medium.com/@techhuttv" },
      { platform: "github", url: "https://github.com/TechHutTV" },
      { platform: "reddit", url: "https://reddit.com/user/techhuttv" }
    ]
  },
  "Cameron Knauff": {
    name: "Cameron Knauff",
    image: "/docs-static/img/authors/cameron.jpeg",
    bio: "Writer - Linux systems and video production.",
    role: "contributor",
    social: [
      { platform: "twitter", url: "https://x.com/PizzaLovingNerd" },
      { platform: "github", url: "https://github.com/PizzaLovingNerd" }
    ]
  },
  "Niccolo Venerandi": {
    name: "Niccolo Venerandi",
    image: "/docs-static/img/authors/niccolo.jpeg",
    bio: "Writer - KDE, Plasma, and the Linux desktop experience.",
    role: "contributor",
    social: [
      { platform: "twitter", url: "https://twitter.com/veggero" },
      { platform: "github", url: "https://github.com/veggero" }
    ]
  },
  "Allison Hopkins": {
    name: "Allison Hopkins",
    image: "/docs-static/img/authors/allison.jpg",
    bio: "Editor - I go by Twigshi! Animator and artist.",
    role: "team",
    social: [
      { platform: "instagram", url: "https://www.instagram.com/twigshi/" }
    ]
  },
  "Scott Yeager": {
    name: "Scott Yeager",
    image: "/docs-static/img/authors/scott.jpeg",
    bio: "Writer - Linux enthusiast and nature lover.",
    role: "contributor",
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/scottmyeager/" },
      { platform: "twitter", url: "https://x.com/scott__yeager/" }
    ]
  }
}

/**
 * Get author data by name
 * @param {string} name - Author name
 * @returns {object|null} Author data or null if not found
 */
export function getAuthor(name) {
  return authors[name] || null
}

/**
 * Get multiple authors by names
 * @param {string[]} names - Array of author names
 * @returns {object[]} Array of author data
 */
export function getAuthors(names) {
  if (!names || !Array.isArray(names)) {
    return []
  }
  return names
    .map(name => getAuthor(name))
    .filter(author => author !== null)
}
