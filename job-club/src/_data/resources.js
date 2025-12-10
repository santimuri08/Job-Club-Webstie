// Static data for now - will be replaced with Sanity data once configured
module.exports = function() {
  return {
    all: [
      {
        title: "How to Build a Professional Portfolio",
        description: "Step-by-step guide to creating an impressive tech portfolio",
        category: "Career Development",
        url: "#"
      },
      {
        title: "LinkedIn Optimization Guide",
        description: "Make your LinkedIn profile stand out to recruiters",
        category: "Personal Branding",
        url: "#"
      },
      {
        title: "GitHub Best Practices",
        description: "How to use GitHub effectively for projects",
        category: "Technical Skills",
        url: "#"
      }
    ],
    featured: [
      {
        title: "AI Consulting Portfolio Starter Guide",
        description: "Everything you need to start your AI consulting portfolio",
        category: "AI/ML",
        url: "#",
        featured: true
      }
    ],
    categories: [
      { title: "Career Development", slug: "career" },
      { title: "Technical Skills", slug: "technical" },
      { title: "AI/ML", slug: "ai-ml" },
      { title: "Personal Branding", slug: "branding" }
    ]
  }
}
