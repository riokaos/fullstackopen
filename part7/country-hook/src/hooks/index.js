import { useState, useCallback } from 'react'

export const useCountry = ({type = "text"} = {}) => {
  const [value, setValue] = useState('')

  const onChange = useCallback((event) => {
    // console.log("event:",event);
    setValue(event.target.value);
  },[]);

  const reset = useCallback(() => {
    setValue('')
  },[])



  return [{
    type,
    value,
    onChange,
    },
    reset
  ];
}
