import { createClient } from 'contentful';
import RecipeCard from '../components/RecipeCard'

export async function getStaticProps(){
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const res = await client.getEntries({content_type: 'recipe'})

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1,
  }
}

export default function RecipeDetails({recipes}) {
  console.log(recipes);

  return (
    <div className="recipes-list">
     {recipes.map(recipe => (
       <RecipeCard key={recipe.sys.id} recipe={recipe} />
     ))}
     <style jsx>{`
        .recipes-list {
          display:grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
     `} 
     </style>
    </div>
  )
}