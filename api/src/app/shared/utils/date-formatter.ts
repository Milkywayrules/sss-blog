export const formatDate = (sec: number, debug = false): string => {
  if (debug) {
    sec = 0 // init
    sec += 59 // detik
    sec += 60 * 59 // menit
    sec += 60 * 60 * 23 // jam
    sec += 3600 * 24 * 6 // hari
    sec += 3600 * 24 * 7 * 3 // minggu
    sec += 3600 * 24 * 7 * 4 * 11 // bulan
    sec += 3600 * 24 * 7 * 4 * 12 * 4 // tahun
  }

  const map = {
    year: 3600 * 24 * 7 * 4 * 12,
    month: 3600 * 24 * 7 * 4,
    week: 3600 * 24 * 7,
    day: 3600 * 24,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  let year = Math.floor(sec / map.year)
  let month = Math.floor(sec / map.month)
  let week = Math.floor(sec / map.week)
  let day = Math.floor(sec / map.day)
  let hour = Math.floor(sec / map.hour)
  let min = Math.floor(sec / map.minute)
  const secRemaining = sec % 60

  const resetPredecessor = (
    pred: 'hour' | 'day' | 'week' | 'month' | 'year',
    num: number,
  ) => {
    const map = {
      year: 12,
      month: 4,
      week: 7,
      day: 24,
      hour: 60,
    }

    return map[pred] * num
  }

  // uglyyy
  if (hour > 0) min -= resetPredecessor('hour', hour)
  if (day > 0) hour -= resetPredecessor('day', day)
  if (week > 0) day -= resetPredecessor('week', week)
  if (month > 0) week -= resetPredecessor('month', month)
  if (year > 0) month -= resetPredecessor('year', year)

  const str = `Total: ${year} tahun ${month} bulan ${week} minggu ${day} hari ${hour} jam ${min} menit ${secRemaining} detik`

  return str
}
