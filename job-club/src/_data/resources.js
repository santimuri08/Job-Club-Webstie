// Dynamic resources data - can switch between static and Sanity data
const useSanity = process.env.USE_SANITY === 'true'

// Static fallback data (matches current frontend structure)
const staticResources = [
  {
    title: "AI Consulting Portfolio Guide",
    slug: "ai-consulting-portfolio",
    description: "Complete guide to building a professional AI consulting portfolio that attracts clients and recruiters.",
    category: "Portfolio",
    difficulty: "Intermediate",
    url: "#portfolio-guide",
    featured: true
  },
  {
    title: "LinkedIn Optimization for AI Professionals",
    slug: "linkedin-optimization",
    description: "Step-by-step guide to optimizing your LinkedIn profile for AI and tech opportunities.",
    category: "Personal Branding",
    difficulty: "Beginner",
    url: "#linkedin-guide",
    featured: false
  },
  {
    title: "GitHub Best Practices Guide",
    slug: "github-best-practices",
    description: "Learn how to use GitHub effectively for AI projects and collaboration.",
    category: "Technical Skills",
    difficulty: "Intermediate",
    url: "#github-guide",
    featured: false
  },
  {
    title: "AI Interview Preparation",
    slug: "ai-interview-prep",
    description: "Common interview questions and preparation strategies for AI/ML roles.",
    category: "Career Development",
    difficulty: "Advanced",
    url: "#interview-guide",
    featured: true
  }
]

const staticCategories = [
  { title: "Portfolio", slug: "portfolio" },
  { title: "Personal Branding", slug: "branding" },
  { title: "Technical Skills", slug: "technical" },
  { title: "Career Development", slug: "career" }
]

module.exports = async function() {
  if (useSanity) {
    try {
      // Import Sanity API only when needed
      const { getAllResources, getFeaturedResources } = require('../lib/api/resources')
      
      const { data: all, error: allError } = await getAllResources(20)
      
      if (allError) {
        console.error('Error fetching all resources from Sanity:', allError)
      }
      
      return all || staticResources
    } catch (error) {
      console.error('Sanity connection failed, using static data:', error)
      return staticResources
    }
  }
  
  // Return static data by default
  return staticResources
}
