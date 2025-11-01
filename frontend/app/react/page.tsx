'use client';

import type { ChangeEvent } from 'react';

import { Pane, Heading, TextInput } from 'evergreen-ui';

export function React() {
	// TODO: Define variables for pokemon list, filtered list, loading, and error states

	// TODO: Use this to fetch pokemon data and update loading state
	async function fetchData() {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
			const data = await response.json();

			const pokemonDataList = [];
			for (const pokemon of data.results) {
				const pokemonResponse = await fetch(pokemon.url);
				const pokemonData = await pokemonResponse.json();
				pokemonDataList.push(pokemonData);
			}
			// TODO: Update state with fetched pokemon data

		} catch (error) {
			// TODO: Update error state

		}
	}

	function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
		const searchTerm = event.target.value.toLowerCase();
		// TODO: Implement filtering logic based on search term
	}

	return (
		<Pane padding={32} background='tint1' minHeight='100vh'>
			<Heading size={800} marginBottom={24} textAlign='center'>
				Pokemon List
			</Heading>
			<Pane marginBottom={24} display='flex' justifyContent='center'>
				<TextInput
					placeholder='Search Pokemon...'
					onChange={handleFilterChange}
					width='100%'
					maxWidth={400}
					height={40}
				/>
			</Pane>
			{/* TODO: Add loading indicator */}
			{/* TODO: Add error alert */}
			<Pane
				display='grid'
				gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))'
				gap={16}
			>
				{/* TODO: Add pokemon cards */}
			</Pane>
		</Pane>
	);
}

export default React;
