/**
 * @overview Sample page 1 for the template app.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import type { ChangeEvent} from 'react';
import { useState } from 'react';

import { Text, Heading, Pane, majorScale, Button, Alert, TextInputField } from 'evergreen-ui';

import View from '@/components/View';

export function Feature1() {
	const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState<string | null>(null);

	async function callAdd() {
		try {
			const response = await fetch('/api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					num1: Number(num1),
                    num2: Number(num2),
				}),
			});
			const data = await response.json();
			if (response.ok) {
                const sum = data.sum ?? data.message ?? JSON.stringify(data);
                setResult(String(sum));
            } else {
				setResult("Invalid inputs");
            }
		} catch (err) {
			alert(`API call failed: ${err}`);
		}
	}

	// Render the radio group form for selecting a resource option.
	const SelectForm = (
		<Pane marginBottom={majorScale(4)}>
			<Heading size={900} marginTop={majorScale(2)} marginBottom={majorScale(1)}>
				Hi
			</Heading>
			<Text size={500}>
				Welcome to the template app! Here are some resources to get started:
			</Text>

			<TextInputField label='Num1' value={num1} onChange={(e: ChangeEvent<HTMLInputElement>) => setNum1(e.target.value)} />
			<TextInputField label='Num2' value={num2} onChange={(e: ChangeEvent<HTMLInputElement>) => setNum2(e.target.value)} />

			<Button onClick={callAdd}>
				Click to add two numbers
			</Button>

			<Pane marginTop={8}>
				<Text size={500}>Result: {result}</Text>
			</Pane>
		</Pane>
	);

	return (
		<View>
			{SelectForm}
			<Pane marginBottom={32}>
				<Alert intent='warning' title='NOTE!' marginTop={24}>
					This is a template app. You are encouraged to change things and play around with
					it!
				</Alert>
			</Pane>
		</View>
	);
}

export default Feature1;
