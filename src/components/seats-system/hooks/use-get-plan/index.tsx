import { useEffect, useState } from 'react'
import { functions } from '../../../../firebase'
import { VagonFloor } from './types'
import toast from 'react-hot-toast'
import useLanguage from '../../../../stores/useLanguage'

function useGetPlan(bustypeId: string) {
  const [floors, setFloors] = useState<VagonFloor[]>([])
  const [loading, setLoading] = useState(true)
  const { getItem } = useLanguage()

  useEffect(() => {
    console.log(bustypeId);

    if (bustypeId) {
      (async () => {
        try {

          setLoading(true)
          const res = await functions("getPlanBusSystem", { bustypeId })
          if (!res.data.result) {
            throw new Error()
          }
          setFloors(res.data.data)
          setLoading(false)
        } catch (error) {
          console.log(123);

          toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
        }
      })()
    }
  }, [bustypeId, getItem])

  return {
    floors,
    loading,
  }
}

export default useGetPlan