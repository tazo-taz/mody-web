import { references, referencesType } from ".";

export const startLoading = () => references.loading?.startLoading()

export const stopLoading = () => references.loading?.stopLoading()

export const saveLoadingReference = (ref: referencesType["loading"]) => references.loading = ref