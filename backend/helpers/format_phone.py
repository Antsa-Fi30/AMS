# def normalize_phone_number(phone: str) -> str:
#     """
#     Convertit un numéro en format BEFIANA :
#     - enlève +261
#     - enlève 261
#     - enlève les espaces
#     - enlève un éventuel 0 au début
#     """
#     if not phone:
#         return ""

#     # Enlever les espaces
#     phone = phone.replace(" ", "")

#     # Enlever +261 (format international)
#     if phone.startswith("+261"):
#         phone = phone[4:]

#     # Enlever 261 simple
#     if phone.startswith("261"):
#         phone = phone[3:]

#     # Enlever le 0 s'il reste
#     if phone.startswith("0"):
#         phone = phone[1:]

#     return phone


def normalize_phone_number(raw: str) -> str:
    # Retirer les espaces et "+" éventuels
    cleaned = raw.replace(" ", "").replace("+", "")

    # Retirer indicatif Madagascar 261
    if cleaned.startswith("261"):
        cleaned = cleaned[3:]

    # Si ça commence par 0, on retire le 0
    if cleaned.startswith("0"):
        cleaned = cleaned[1:]

    return cleaned
