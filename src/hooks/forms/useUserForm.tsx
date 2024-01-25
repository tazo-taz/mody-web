import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { unregisteredUserSchema, unregisteredUserSchemaType } from '../../schemas/user'

export default function useUserForm(user?: unregisteredUserSchemaType | null) {
    const {
        reset,
        register,
        handleSubmit,
        watch,
        formState,
    } = useForm<unregisteredUserSchemaType>({
        resolver: zodResolver(unregisteredUserSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            userId: user?.userId || "",
            phoneNumber: user?.phoneNumber.slice(4) || "",
            email: user?.email || ""
        }
    })

    return { reset, register, handleSubmit, watch, formState } as const
}
