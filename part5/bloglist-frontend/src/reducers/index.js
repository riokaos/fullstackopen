import React, {useEffect,useState} from 'react'
import BookDetail from '../../components/BookDetail/';
import axios from 'axios'

const BookDetailContainer = (props) => {
  const [book, setBook] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  // console.log("link:",`http://localhost:8080/books/${id}`);

  useEffect(() => {
    const id = props.match.params.id
    console.log("id::",id);
    axios.get(`http://localhost:8080/books/${id}`).then(res => {
        setBook(res.data)
        // setLoading(false)
      })
    }, [])

  return  (<div className="detail">
          <div className="description"><BookDetail book={book}/></div>
          </div>)

}

export default BookDetailContainer
