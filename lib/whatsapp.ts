export function buildWhatsAppLink(
  phoneNumber: string,
  message: string = 'Hola, vi tu página y necesito una cotización.',
  zone: string = 'Puerto Vallarta'
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  const countryCode = '52'
  const formattedMessage = message
    .replace('{zona}', zone)
    .replace('{servicio}', 'proyecto personalizado')

  const encoded = encodeURIComponent(formattedMessage)
  return `https://wa.me/${countryCode}${cleanPhone}?text=${encoded}`
}

export function getDefaultWhatsAppMessage(zone: string = 'Puerto Vallarta'): string {
  return `Hola, vi tu página y necesito una cotización. Estoy en ${zone}. El trabajo es: reparación y acabados.`
}
