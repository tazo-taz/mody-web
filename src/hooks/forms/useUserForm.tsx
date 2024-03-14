import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { unregisteredUserSchema, unregisteredUserSchemaType } from '../../schemas/user'

export default function useUserForm(user?: unregisteredUserSchemaType | null) {
    const {
        watch,
        ...rest
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

    const { firstName, lastName, phoneNumber, userId, email } = watch();

    const phoneChanged = phoneNumber === user?.phoneNumber.slice(4)

    const valuesChanged = (
        firstName === user?.firstName &&
        lastName === user?.lastName &&
        userId === user?.userId &&
        email === user?.email
    );

    return { watch, valuesChanged, phoneChanged: !phoneChanged, ...rest } as const
}
