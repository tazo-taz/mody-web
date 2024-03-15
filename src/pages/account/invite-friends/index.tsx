import { FaPlus } from "react-icons/fa6"
import AccountCard from '../../../components/account/card'
import AccountTitle from '../../../components/account/title'
import ImageIcon from '../../../components/image-icon'
import InviteFriend from '../../../components/invite-friend'
import TriplePeople from '../../../components/triple-people'
import useLanguage from '../../../stores/useLanguage'

export default function InviteFriendsPage() {
    const { getItem } = useLanguage()

    return (
        <>
            <AccountTitle>
                {getItem("Invite_friends")}
            </AccountTitle>


            <AccountCard>
                <div className='flex flex-col justify-center mt-20 max-w-[350px] mx-auto w-full text-center'>
                    <ImageIcon IconContainerClassName='bottom-1' Icon={FaPlus}>
                        <TriplePeople />
                    </ImageIcon>
                    <h2 className='font-semibold mt-6'>{getItem("Know_someone_who_needs_a_ride_Invite_them_to_mody_to_get_give_free_credits")}</h2>
                    <p className='text-xs text-[#6B7280] mt-3 px-4'>{getItem("Invite_your_friends_to_ride_with_Mody_so_they_can_get_going_now")}</p>

                    <InviteFriend />
                </div>
            </AccountCard>
        </>
    )
}
