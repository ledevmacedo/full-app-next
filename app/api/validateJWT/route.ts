import { type NextRequest, NextResponse } from "next/server";

import { globalInstance, handleApiError, validateParameters } from "@/lib/api";

export const revalidate = 0

export async function GET(request: NextRequest) {
	try {
		const data = await request.json()
		const { jwt, role, address } = data

		const validationResponse = validateParameters({ jwt, role, address })
		if (validationResponse) return validationResponse

		const api = globalInstance(jwt)

		const response = await api.get("/users/refresh", {
			data: {
				jwt,
				minRole: role,
				address,
			},
		})

		return NextResponse.json(response.data)
	} catch (error: unknown) {
		return handleApiError(error)
	}
}
