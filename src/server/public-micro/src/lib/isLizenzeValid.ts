const { Deta } = require("deta")

const deta = Deta()
const db = deta.Base("lizenzes")

export async function isLizenzeValid(
    lizenze: string
): Promise<{ valid: boolean; permissions?: string[] }> {
    const lizenzeItem = await db.get(lizenze)
    if (!lizenzeItem) {
        return { valid: false }
    }

    // Check age
    if (lizenzeItem.validUntil !== -1 && Date.now() > lizenzeItem.validUntil) {
        // Delete lizenze
        await db.delete(lizenzeItem.key)
        return { valid: false }
    }
    return { valid: true, permissions: lizenzeItem.permissions }
}
