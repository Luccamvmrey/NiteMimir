export enum Group {
    GROUP_A = 0,
    GROUP_B = 1,
    GROUP_C = 2,
}

export const getGroup = (group: Group): string => {
    switch (group) {
        case Group.GROUP_A:
            return "A"
        case Group.GROUP_B:
            return "B"
        case Group.GROUP_C:
            return "C"
    }
}