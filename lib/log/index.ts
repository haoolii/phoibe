import db from "../db"

export const logger = async (type: string, content: string) => {
    try {
        await db.log.create({
          data: {
            type,
            content
          }
        })
    } catch (e) {
        console.log('error', e)
    }
}