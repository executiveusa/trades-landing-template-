const KNOWN_PLACEHOLDER_NUMBERS = new Set(['525212345678'])

export function isWhatsAppConfigured(phoneNumber: string): boolean {
  const digits = phoneNumber.replace(/\D/g, '')
  return Boolean(digits) && !KNOWN_PLACEHOLDER_NUMBERS.has(digits)
}

export function buildWhatsAppLink(
  phoneNumber: string,
  message: string = 'Hola, vi tu página y necesito una cotización.',
  zone: string = 'Puerto Vallarta'
): string {
  const digits = phoneNumber.replace(/\D/g, '')
  if (!isWhatsAppConfigured(phoneNumber)) return '#contact'

  const normalizedPhone = digits.startsWith('52') ? digits : `52${digits}`
  const formattedMessage = message
    .replace('{zona}', zone)
    .replace('{servicio}', 'proyecto personalizado')

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(formattedMessage)}`
}

export function getDefaultWhatsAppMessage(zone: string = 'Puerto Vallarta'): string {
  return `Hola, vi tu página y necesito una cotización. Estoy en ${zone}. El trabajo es: reparación y acabados.`
}
