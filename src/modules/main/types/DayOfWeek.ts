export enum DayOfWeek {
    SEGUNDA = 0,
    TERCA = 1,
    QUARTA = 2,
    QUINTA = 3,
    SEXTA = 4,
    SABADO = 5,
}

export const getDayOfWeek = (dayOfWeek: DayOfWeek): string => {
    switch (dayOfWeek) {
        case DayOfWeek.SEGUNDA:
            return "Segunda"
        case DayOfWeek.TERCA:
            return "Terça"
        case DayOfWeek.QUARTA:
            return "Quarta"
        case DayOfWeek.QUINTA:
            return "Quinta"
        case DayOfWeek.SEXTA:
            return "Sexta"
        case DayOfWeek.SABADO:
            return "Sábado"
    }
}