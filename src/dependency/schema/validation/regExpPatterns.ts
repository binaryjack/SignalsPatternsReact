export const numericOnly = /^\d*$/
export const namesPattern = /^[a-zA-Z\-_\s]*$/
export const dateEuPattern =
    /^(0[1-9]|[12][0-9]|3[01])\/?\-?\.?(0[1-9]|1[0,1,2])\/?\-?\.?(19|20)\d{2}$/

export const dateIso8601Pattern =
    /^(19|20)\d{2}\/?\-?\.?(0[1-9]|1[0,1,2])\/?\-?\.?(0[1-9]|[12][0-9]|3[01])$/

export const eMailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
