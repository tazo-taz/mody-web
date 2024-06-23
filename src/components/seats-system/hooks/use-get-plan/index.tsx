import { useEffect, useState } from 'react'
import { functions } from '../../../../firebase'
import { VagonFloor } from './types'

export default function useGetPlan(bustypeId: string) {
  const [floors, setFloors] = useState<VagonFloor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bustypeId) {
      (async () => {
        setLoading(true)
        const res = await functions("getPlanBusSystem", { bustypeId })
        setFloors(res.data.data)
        setLoading(false)
      })()
    }
  }, [bustypeId])

  return {
    floors,
    loading,
  }
}
