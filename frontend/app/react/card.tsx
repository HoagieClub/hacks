import { Card, Text } from 'evergreen-ui';
import Image from 'next/image';

import type { Pokemon } from './types';

type PokemonCardProps = {
	pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
	return (
		<Card
			elevation={1}
			padding={16}
			display='flex'
			flexDirection='column'
			alignItems='center'
			background='white'
			hoverElevation={2}
		>
			<Text size={500} fontWeight={600} marginBottom={8}>
				{pokemon.id}. {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
			</Text>
			<Image
				src={pokemon.sprites.front_default || ''}
				alt={pokemon.name}
				width={96}
				height={96}
			/>
		</Card>
	);
}
