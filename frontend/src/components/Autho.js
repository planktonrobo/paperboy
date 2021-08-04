import {useEffect}from 'react'
import {useDispatch} from 'react-redux'
import {loadUser} from '../actions/auth'


const Autho = ({bottom}) => {
    console.log({bottom})
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(loadUser());
    }, []); return null
    
    
}

export default Autho
