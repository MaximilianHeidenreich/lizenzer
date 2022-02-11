const jwt = require("jsonwebtoken")
const { Deta } = require("deta")

const deta = Deta()
const sessionsDB = deta.Base("sessions")

export async function isSessionValid(
    token: string
): Promise<{ valid: boolean; payload?: any; err?: string }> {
    // Get session record
    const sessionItem = await sessionsDB.fetch({ token })
    if (sessionItem.count <= 0) {
        return { valid: false }
    }

    // Verify
    let payload
    try {
        payload = jwt.verify(token, "secret")
    } catch (e: any) {
        if (e.name === "TokenExpiredError") {
            // Delete session
            await sessionsDB.delete(sessionItem.key)
            return { valid: false, err: `Token expired at ${e.expiredAt}` }
        } else if (e.name === "JsonWebTokenError") {
            return { valid: false, err: e.message }
        } else if (e.name === "NotBeforeError") {
            return { valid: false, err: `Token not active until ${e.date}` }
        }
    }

    return { valid: true, payload }
}
