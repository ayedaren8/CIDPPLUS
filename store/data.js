const db = wx.cloud.database()
async function getSchoolCalendar() {
  return await db.collection('schoolCalendar').get().then((res) => {
    return res.data
  })
}

export default getSchoolCalendar