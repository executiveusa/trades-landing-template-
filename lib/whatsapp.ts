export function buildWhatsAppLink(
  phoneNumber: string,
  message: string = 'Hola, vi tu página y necesito una cotización.',
  zone: string = 'Puerto Vallarta'
): string {
  const digits = phoneNumber.replace(/\D/g, '')
  if (!digits) return '#contact'

  const normalizedPhone = digits.startsWith('52') ? digits : `52${digits}`
  const formattedMessage = message
    .replace('{zona}', zone)
    .replace('{servicio}', 'proyecto personalizado')

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(formattedMessage)}`
}

export function getDefaultWhatsAppMessage(zone: string = 'Puerto Vallarta'): string {
  return `Hola, vi tu página y necesito una cotización. Estoy en ${zone}. El trabajo es: reparación y acabados.`
}
