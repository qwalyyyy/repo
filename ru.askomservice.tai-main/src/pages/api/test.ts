import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

/**
 * Пример API-роута в Next.js.
 * Принимает запросы по адресу http://localhost:3000/api/test
 */
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ message: 'Hello from Next.js!' })
}
