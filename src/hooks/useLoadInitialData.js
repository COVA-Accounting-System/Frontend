import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useLoadInitialData = (loadFunction, loadInitialDataFunction) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const data = loadFunction()
        data.then(res => dispatch(loadInitialDataFunction(res)))
    }, [])
}

export default useLoadInitialData