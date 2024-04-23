const Course = ({course}) => {

    return (
      <div>
        <Header name={course.name} />
        <Content course={course} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        <p>
         {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({course}) => {
    const {parts} = course
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <Total parts={parts} />
  
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <p><b> Number of exercises {total}</b> </p>
          
      </div>
    )
  }
  
export default Course