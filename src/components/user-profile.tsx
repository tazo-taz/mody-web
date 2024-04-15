import { getDownloadURL } from 'firebase/storage'
import { useEffect, useState } from 'react'
import UserWithBg from '../assets/images/svgs/icons/user-with-bg'
import { getFileStorageRef } from '../firebase'
import useAuth from '../stores/useAuth'

export default function UserProfile({ image }: { image?: string }) {
  const uid = useAuth().user?.uid
  const imageRef = `/client_avatars/${uid}/avatar_512x512.jpeg`

  const [fbImage, setFbImage] = useState<string>()

  useEffect(() => {
    const load = async () => {
      try {
        const url = await getDownloadURL(getFileStorageRef(imageRef))
        setFbImage(url);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    load()
  }, [imageRef])


  return (
    <div className='w-20 h-20 rounded-full'>
      {
        !image && !fbImage ?
          <UserWithBg /> :
          <img src={image || fbImage} alt='profile' className='w-full h-full object-cover rounded-full' />
      }
    </div>
  )
}
