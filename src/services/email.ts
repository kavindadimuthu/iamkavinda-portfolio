import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export const sendContactEmail = async (formData: ContactFormData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'kavindadewmith@gmail.com', // Your email
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    return { success: true, response }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}