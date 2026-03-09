import fs from 'fs'
import { nanoid } from 'nanoid'

export function saveReport(data, userId, sourceType) {
  const reports = JSON.parse(fs.readFileSync("./db/reports.json"))
  const newReport = {
    id: nanoid(5),
    userId,
    category: data.category,
    urgency: data.urgency,
    message: data.message,
    imagePath: data.imagePath ? data.imagePath : null,
    sourceType: sourceType === '/' ? "agent" : "CSV",
    createdAt: new Date().toISOString()
  }
  reports.push(newReport)
  fs.writeFileSync("./db/reports.json", JSON.stringify(reports, null, 2))
  return newReport
}

export function getReports(user) {
  const reports = JSON.parse(fs.readFileSync("./db/reports.json"))
  if (user.role === "admin") {
    return reports
  }
  const myRrports = reports.filter(report => {
    return report.userId === user.id
  })
  return myRrports
}