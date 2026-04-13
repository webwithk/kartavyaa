import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')

    if (error) {
      console.error("Error fetching projects:", error)
      return
    }

    console.log("Projects Data:", data)

    setProjects(data || [])
  }

  return (
    <div>
      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            
            <h3>{item.title}</h3>
            
            <p>{item.description}</p>

            {/* Image */}
            {item.image_url && (
              <img 
                src={item.image_url} 
                alt={item.title} 
                width="200"
              />
            )}

            {/* Tags */}
            {item.tags && (
              <p><strong>Tags:</strong> {item.tags}</p>
            )}

            {/* Demo Link */}
            {item.demo_url && (
              <a href={item.demo_url} target="_blank">
                View Demo
              </a>
            )}

          </div>
        ))
      )}
    </div>
  )
}

export default Projects