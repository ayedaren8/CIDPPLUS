const db = wx.cloud.database()
async function getSchoolCalendar() {
  const data=await db.collection('schoolCalendar').get().then((res) => {
    return res.data
  })
  console.log(data)
  return data 
}

export default getSchoolCalendar