import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllJobs, setLoading } from '../redux/jobSlice'
import { JOB_API_END_POINT } from '../utils/constant'

const useGetAllJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchAllJobs()
    }, [dispatch])
}

export default useGetAllJobs