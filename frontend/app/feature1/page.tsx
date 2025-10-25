'use client';

import type { ChangeEvent} from 'react';
import { useState } from 'react';

import { Text, Heading, Pane, majorScale, Button, TextInputField } from 'evergreen-ui';

import View from '@/components/View';

export function Feature1() {
	const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState<string | null>(null);

	async function callAdd() {
		try {
			// Call API route to add two numbers
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

			// Wait for response and parse JSON
			const data = await response.json();

			// Check for errors and update result state
			if (response.ok) {
                setResult(String(data.sum));
            } else {
				setResult("Invalid inputs");
            }
		} catch (err) {
			alert(`API call failed: ${err}`);
		}
	}

	const SelectForm = (
		<Pane marginBottom={majorScale(4)}>
			<Heading size={900} marginTop={majorScale(2)} marginBottom={majorScale(1)}>
				Welcome!
			</Heading>

			<TextInputField id="num1" label='Num1' value={num1} onChange={(e: ChangeEvent<HTMLInputElement>) => setNum1(e.target.value)} />
			<TextInputField id="num2" label='Num2' value={num2} onChange={(e: ChangeEvent<HTMLInputElement>) => setNum2(e.target.value)} />

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
		</View>
	);
}

export default Feature1;
