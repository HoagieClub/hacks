'use client';

import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';

import { Pane, Heading, TextInput, Alert, Spinner } from 'evergreen-ui';

import { PokemonCard } from './card';

import type { Pokemon } from './types';

export function React() {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(function () {
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

				setPokemonList(pokemonDataList);
				setFilteredPokemonList(pokemonDataList);
			} catch (error) {
				setError(`Failed to fetch Pokemon data: ${error}`);
			}
		}
		setLoading(true);
		void fetchData().finally(() => setLoading(false));
	}, []);

	function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
		const searchTerm = event.target.value.toLowerCase();
		const filtered = pokemonList.filter(function (pokemon) {
			return pokemon.name.toLowerCase().startsWith(searchTerm);
		});
		setFilteredPokemonList(filtered);
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
			{loading && (
				<Pane display='flex' justifyContent='center' marginBottom={16}>
					<Spinner />
				</Pane>
			)}
			{error && (
				<Alert intent='danger' title='Error' marginBottom={24}>
					{error}
				</Alert>
			)}
			<Pane
				display='grid'
				gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))'
				gap={16}
			>
				{filteredPokemonList.map(function (pokemon, index) {
					return <PokemonCard key={index} pokemon={pokemon} />;
				})}
			</Pane>
		</Pane>
	);
}

export default React;
