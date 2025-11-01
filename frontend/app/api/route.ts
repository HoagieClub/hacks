import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

function isNumber(value: unknown): boolean {
	return typeof value === 'number' && isFinite(value);
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		if (isNumber(body?.num1) === false || isNumber(body?.num2) === false) {
			return NextResponse.json({ error: 'Invalid numbers' }, { status: 400 });
		}

		const num1 = body?.num1;
		const num2 = body?.num2;

		return NextResponse.json({ sum: num1 + num2 });
	} catch {
		return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
	}
}
