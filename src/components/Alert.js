import React from 'react'

export const Alert = (props)=>{

    const capitalize=(word)=>{
      if(word==="danger"){
        word = "Error"
      }
        const str = word.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

  return (
        props.alert && <div class={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong>:{props.alert.msg}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    
  )
}
