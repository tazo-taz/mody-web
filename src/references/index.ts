export type referencesType = {
    loading: null | {
        startLoading: () => void | null
        stopLoading: () => void | null
    }
}

export const references: referencesType = {
    loading: null
}