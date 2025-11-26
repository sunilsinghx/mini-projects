import React, { useState } from 'react'

const TagInput = () => {

  // Container style for the tag input component
  const containerStyle = {
    padding: "20px",
    display: "inline-block",
    width: "300px",
    border: "1px solid darkgrey",
    borderRadius: "10px",
    background: "#EAEAEA"
  }

  // Style for the input field where users type new tags
  const inputStyle = {
    display: "inline-block",
    fontSize: "0.9em",
    margin: "5px",
    width: "90%",
    padding: "10px",
    margin: "0",
    borderRadius: "10px",
    marginTop: "1rem"
  }

  // Style for each tag displayed in the component
  const tagStyle = {
    display: "inline-block",
    backgroundColor: "#3c4048",
    margin: "5px",
    padding: "4px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white"
  }

  // State variable to manage the list of tags
  const [tags, setTags] = useState([])

  // Function to handle adding a new tag when user presses 'Enter'
  const handleAddTag = (e) => {
    // Check if the 'Enter' key was pressed
    if (e.key !== "Enter") return

    const input = e.target.value;

    // Prevent adding empty tags or duplicate tags
    if (!input) return
    if (tags.includes(input)) return

    // Add the new tag to the list of tags
    setTags([...tags, input])

    e.target.value = ""
  }

  // Function to handle deleting a tag when it is clicked
  const onDeleteTag = (tag) => {
    // Remove the clicked tag from the tags list
    const filteredTags = tags.filter(t => t !== tag)
    setTags(filteredTags)
  }

  return (
    <div style={containerStyle}>
      <h2>ADD SKILLS</h2>

      {/* Render each tag with an 'X' icon to delete it */}
      {tags.map(tag => {
        return (
          <span key={tag} onClick={() => onDeleteTag(tag)} style={tagStyle}>
            &#x2716; {tag}
          </span>
        )
      })}

      {/* Input field for entering new tags */}
      <input
        type="text"
        onKeyUp={(e) => handleAddTag(e)}  // Trigger adding tag on Enter key press
        placeholder='Enter value......'
        style={inputStyle}
      />
    </div>
  )
}

export default TagInput
