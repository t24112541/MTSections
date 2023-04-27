const format = process.env.DATE_FORMAT
const timezone = process.env.DATE_TIMEZONE

const thDate = new Date().toLocaleString(format, {
    timeZone: timezone
})

export default thDate
