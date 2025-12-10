const { getAllResources, getFeaturedResources } = require('../lib/api/resources')
const { getAllCategories } = require('../lib/api/categories')

module.exports = async function() {
  const { data: all, error: allError } = await getAllResources(20)
  const { data: featured, error: featuredError } = await getFeaturedResources(6)
  const { data: categories, error: categoriesError } = await getAllCategories()
  
  if (allError) {
    console.error('Error fetching all resources:', allError)
  }
  
  if (featuredError) {
    console.error('Error fetching featured resources:', featuredError)
  }
  
  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
  }
  
  return {
    all: all || [],
    featured: featured || [],
    categories: categories || []
  }
}
