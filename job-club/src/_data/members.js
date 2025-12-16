// Dynamic members data - can switch between static and Sanity data
const useSanity = process.env.USE_SANITY === 'true'

// Static fallback data (matches current frontend structure)
const staticMembers = {
  active: [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      bio: "Full-stack developer with a passion for AI and machine learning.",
      image: "/images/members/alex.jpg",
      skills: ["JavaScript", "Python", "React", "TensorFlow"]
    },
    {
      name: "Sarah Chen",
      role: "Product Manager",
      bio: "Building AI products that make a difference in people's lives.",
      image: "/images/members/sarah.jpg",
      skills: ["Product Strategy", "AI Ethics", "User Research"]
    },
    {
      name: "Mike Davis",
      role: "Data Scientist",
      bio: "Specializing in natural language processing and computer vision.",
      image: "/images/members/mike.jpg",
      skills: ["Python", "NLP", "Computer Vision", "Statistics"]
    }
  ],
  new: [
    {
      name: "Emily Rodriguez",
      role: "AI Researcher",
      bio: "Just joined the club! Excited to learn and collaborate.",
      image: "/images/members/emily.jpg",
      skills: ["Python", "Machine Learning", "Research"]
    }
  ]
}

module.exports = async function() {
  if (useSanity) {
    try {
      // Import Sanity API only when needed
      const { getMembersByStatus } = require('../lib/api/members')
      
      const { data: active, error: activeError } = await getMembersByStatus('active', 10)
      const { data: newMembers, error: newMembersError } = await getMembersByStatus('new', 5)
      
      if (activeError) {
        console.error('Error fetching active members from Sanity:', activeError)
      }
      
      if (newMembersError) {
        console.error('Error fetching new members from Sanity:', newMembersError)
      }
      
      return {
        active: active || staticMembers.active,
        new: newMembers || staticMembers.new
      }
    } catch (error) {
      console.error('Sanity connection failed, using static data:', error)
      return staticMembers
    }
  }
  
  // Return static data by default
  return staticMembers
}
