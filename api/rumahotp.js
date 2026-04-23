export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  try {
    const data = req.body
    console.log('📥 Webhook RumahOTP:', data)

    // ⚠️ sesuaikan field sesuai data asli RumahOTP
    const status = data.status
    const number = data.number || data.phone || data.sender
    const otp = data.otp || data.code || data.message

    if (status === 'success') {

      console.log(`✅ OTP diterima dari ${number}: ${otp}`)

      // 🔥 kirim ke bot kamu
      await fetch('https://ENDPOINT-BOT-KAMU/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: number,
          otp: otp
        })
      })

    }

    return res.status(200).send('ok')

  } catch (err) {
    console.error('❌ Error:', err)
    return res.status(500).send('error')
  }
}
